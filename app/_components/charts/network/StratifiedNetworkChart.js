"use client";
import * as d3 from "d3";
import BaseChart from "../BaseChart";

class StratifiedNetworkChart extends BaseChart {

    nodeColorScheme = {
       "fungus": "pink",
       "tree": "green",
       "group": "brown",
       "genus": "blue"
    };

    nodeDepthRadius = {
        1: 12,
        2: 8,
        3: 5,
    };
    
    constructor(options, data) {
        super(options);
        this.options = options;
        this.color = d3.scaleOrdinal(d3[`scheme${options.colorScheme.scheme}`]);
        
        // Bind methods to this instance
        this.ticked = this.ticked.bind(this);
        
        // First create the chart
        this.createChart();
        
        // Then process data and initialize simulation
        this.stratifyData(data);
        this.strengthArcScale();
        this.setupSimulation();
        this.drawNodesAndLinks();
    }

    strengthArcScale(){
        const min_max = d3.extent(this.links, (d) => d.interactionStrength || 0);
        this.arcScale = d3.scaleLinear()
            .domain(min_max)
            .range([1, 2]);
    }

    stratifyData(data) {
        this.nodes = d3.stratify()
            .id((d) => d.id)
            .parentId((d) => d.parent)(data.nodes)
            .descendants()
            .filter((d) => d.data.type != "root");

        this.nodes.forEach((d) => {
            d["open"] = (d.depth < 2) ? true : false;
        });
        
        this.links = [];

        this.createLinks(data);
    }

    createLinks(data) {
        this.generatePhyloLinks(this.nodes);
        this.generateMycoLinks(data.links);
    }

    generatePhyloLinks(nodes) {
        nodes.forEach((d) => {
            if (d.depth == 1) {
                let links = d.links();
                links.forEach((l) => {
                    this.links.push({source: l.source.data.id, target: l.target.data.id, type: "phylo"})
                })
            }
        });
    }

    generateMycoLinks(links) {
        links.forEach((l) => this.links.push(Object.assign({}, l, {type: "myco"})));
    }

    setUpChargeScales() {
        this.chargeScale = d3.scaleLinear()
            .domain([0, 3])
            .range([-300, -50]);

        this.linkStrengthScale= d3.scaleLinear()
            .domain([0, 3])
            .range([0.2, 0.8]);

        this.gravityScale = d3.scaleLinear()
            .domain([0, 3])
            .range([0.2, 0.1]);
    }

    setUpForces(){
        this.setUpChargeScales();
        
        this.chargeForce = d3.forceManyBody()
            .strength(d => {
                // Base strength on node type and depth
                const baseCharge = this.chargeScale(d.depth);
                return d.data.type === "tree" ? baseCharge * 1.5 : baseCharge;
            });

        this.linkForce = d3.forceLink(this.links)
            .id(d => d.id)
            .distance(link => {
              // Adjust distance based on link type and node depths
              if (link.type === "phylo") {
                // Phylogenetic links - adjust by depth
                const depth = Math.max(link.source.depth, link.target.depth);
                return 40 + (3 - depth) * 20; // longer distances for higher nodes
              } else {
                // Mycorrhizal links - keep consistent
                return 60;
              }
            })
            .strength(link => {
              // Adjust strength based on node depths and link type
              const sourceDepth = link.source.depth || 0;
              const targetDepth = link.target.depth || 0;
              const avgDepth = (sourceDepth + targetDepth) / 2;
              
              return this.linkStrengthScale(avgDepth);
            });5

         this.xForce = d3.forceX(this.options.width / 2)
            .strength(d => {
              // If user positioned this node, reduce gravity significantly
              if (d.userPositioned) return 0.01;
              
              // Otherwise use normal calculation
              const baseStrength = this.gravityScale(d.depth);
              return d.data.type === "tree" ? baseStrength * 1.2 : baseStrength;
            });
          
        this.yForce = d3.forceY(this.options.height / 2)
            .strength(d => {
              // If user positioned this node, reduce gravity significantly
              if (d.userPositioned) return 0.01;
              
              // Otherwise use normal calculation
              const baseStrength = this.gravityScale(d.depth);
              return d.data.type === "tree" ? baseStrength * 1.2 : baseStrength;
            });

        this.collideForce = d3.forceCollide()
            .radius(d => {
              // Base radius on node depth
              const radius = this.nodeDepthRadius[d.depth] || 5;
              // Add padding based on type
              return d.data.type === "tree" ? radius * 1.5 : radius * 1.2;
            });
    }


    setupSimulation() {
        this.setUpForces();
        
        this.simulation = d3.forceSimulation(this.nodes)
            .force("link", this.linkForce)
            .force("charge", this.chargeForce)
            .force("center", d3.forceCenter(this.options.width / 2, this.options.height / 2).strength(0.05))
            .force("x", this.xForce)
            .force("y", this.yForce)
            .on("tick", this.ticked);
    }

    calculateBoundaries() {
        // First try to get the SVG dimensions directly
        const svg = d3.select(`#${this.options.containerId}`).select("svg");
        
        // Account for margins in the calculation
        const margin = 20; // Extra margin to ensure nodes don't touch edges
        
        // Get dimensions, with fallbacks
        let width = parseInt(svg.attr("width") || this.options.width);
        let height = parseInt(svg.attr("height") || this.options.height);
        
        // If dimensions aren't explicitly set, try to get the actual rendered size
        if (!width || !height) {
            const svgNode = svg.node();
            if (svgNode) {
                const bbox = svgNode.getBoundingClientRect();
                width = bbox.width || this.options.width;
                height = bbox.height || this.options.height;
            } else {
                width = this.options.width;
                height = this.options.height;
            }
        }
        
        // Store boundaries, accounting for margins
        this.boundaries = {
            minX: 0,
            maxX: width - margin,
            minY: 0, 
            maxY: height - margin,
            width: width,
            height: height
        };
        
        console.log("SVG Boundaries:", this.boundaries);
    }

    checkPosition(position, radius, limit) {
        // Ensure radius is defined
        const nodeRadius = radius || 5;
        return Math.max(this.boundaries.minX + nodeRadius, 
                       Math.min(position, limit - nodeRadius));
    }

    ticked() {
        if (this.nodeElements) {
            // Calculate boundaries once if not already done
            if (!this.boundaries) {
                this.calculateBoundaries();
            }
            
            // Store constrained positions for use with links
            this.nodes.forEach(d => {
                const radius = this.nodeDepthRadius[d.depth] || 5;
                // Store the constrained positions
                d.constrainedX = this.checkPosition(d.x, radius, this.boundaries.maxX);
                d.constrainedY = this.checkPosition(d.y, radius, this.boundaries.maxY);
            });
            
            // Update node positions with boundary constraints
            this.nodeElements
                .attr("cx", d => d.constrainedX)
                .attr("cy", d => d.constrainedY);
        }

        if (this.linkElements) {
            this.linkElements
                .attr("x1", d => d.source.constrainedX || d.source.x)
                .attr("y1", d => d.source.constrainedY || d.source.y)
                .attr("x2", d => d.target.constrainedX || d.target.x)
                .attr("y2", d => d.target.constrainedY || d.target.y);
        }
    }

    determinLinkColor(d){
        if (d.type == "myco") {
            return this.color(d.source.data.type);
        } else {
            return "#bbb";
        }
    }

    drawNodesAndLinks() {
        // Create link elements
        this.linkElements = this.mainGroup.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(this.links)
            .enter()
            .append("line")
            .attr("stroke", d => this.determinLinkColor(d))
            .attr("stroke-width", d => this.arcScale(d.interactionStrength || 0));

        // Create node elements
        this.nodeElements = this.mainGroup.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(this.nodes)
            .enter()
            .append("circle")
            .attr("r", d => this.nodeDepthRadius[d.depth] || 5)
            .attr("fill", d => this.nodeColorScheme[d.data.type])
            .attr("stroke", "000")
            .attr("stroke-width", 1)
            .call(d3.drag()
                .on("start", this.dragstarted.bind(this))
                .on("drag", this.dragged.bind(this))
                .on("end", this.dragended.bind(this)));
                
        // Add hover title
        this.nodeElements.append("title")
            .text(d => d.data.id);

        this.setupTooltips();

        this.nodeElements
            .on("dblclick", (event, d) => {
                // Reset fixed position
                d.fx = null;
                d.fy = null;
                d.userPositioned = false;
                d3.select(event.target).classed("fixed-position", false);
                this.simulation.alpha(0.3).restart();
            });
    }
    
    dragstarted(event, d) {
        if (!event.active) this.simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        
        // Mark this node as user-positioned
        d.userPositioned = true;
    }
    
    dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    
    dragended(event, d) {
        if (!event.active) this.simulation.alphaTarget(0);
        
        // For high-level nodes, keep them fixed where the user dragged them
        if (d.depth <= 1 || d.data.type === "tree") {
            // Keep position fixed - don't reset fx/fy
            // Optionally add a visual indicator that this node is manually positioned
            d3.select(event.sourceEvent.target);
        }
    }

    setupTooltips(){
        this.createTooltip();

        this.nodeElements
            .on("mouseover", (e, d) => this.displayNodeTooltip(e, d))
            .on("mouseout", (_) => this.hideNodeTooltip());

        this.linkElements
            .on("mouseover", (e, d) => this.displayLinkTooltip(e, d))
            .on("mouseout", (_, d) => this.hideLinkTooltip(_, d));
    }

    displayNodeTooltip(e, d){
        this.targetNode = d3.select(e.currentTarget);
        this.targetNode.style("stroke", "darkred");

        this.tooltip.transition().duration(200).style("opacity", 0.9);

        this.displayTooltip(e, d, this.nodeTooltipHtml);
        
    }

    nodeTooltipHtml(d){
        return `
            <strong>Name:</strong> ${d.data.id} <br />
            <strong>Type:</strong> ${d.data.type} <br />
            <strong>Parent:</strong> ${d.data.parent}
        `;
    }

    hideNodeTooltip(){
        this.targetNode.style("stroke", "none");
        this.targetNode = null;

        this.tooltip.transition().duration(200).style("opacity", 0);
    }

    displayLinkTooltip(e, d){
        this.targetLink = d3.select(e.currentTarget);
        this.targetLink.style("stroke", "steelblue");

        this.tooltip.transition().duration(200).style("opacity", 1);

        this.displayTooltip(e, d, this.linkTooltipHtml)
    }

    displayTooltip(e, d, cb){
        this.tooltip
        .html(cb(d))
        .style("left", e.pageX + 20 +  "px")
        .style("top", e.pageY - 30 + "px");
    }

    hideLinkTooltip(e, d){
        this.targetLink.style("stroke", d => this.determinLinkColor(d));
        this.targetLink = null;

        this.tooltip.transition().duration(200).style("opacity", 0);
    }

    linkTooltipHtml(d){
        return `
            <strong>Source:</strong> ${d.source.data.id} <br />
            <strong>Target:</strong> ${d.target.data.id} <br />
            <strong>Type:</strong> ${d.type} <br />
            ${d.interactionStrength ? `<strong>Strength:</strong> ${d.interactionStrength} <br />` : ""}
            ${d.benefits ? `<strong>Benefits:</strong><div> ${d.benefits?.join("<br />")}</div>` : ""}
        `;
    }
}

export default StratifiedNetworkChart;