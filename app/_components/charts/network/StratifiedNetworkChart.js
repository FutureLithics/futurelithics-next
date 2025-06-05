"use client";
import * as d3 from "d3";
import BaseChart from "../BaseChart";

class StratifiedNetworkChart extends BaseChart {
    
    constructor(options, data) {
        super(options);
        this.options = options;
        this.nodeColorScheme = options.nodeColorScheme;
        this.nodeDepthRadius = options.nodeDepthRadius;
        
        // Bind methods to this instance
        this.ticked = this.ticked.bind(this);
        this.linksRollup = this.linksRollup.bind(this);
        
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
            d["open"] = (d.depth < 1) ? true : false;
            d["selected"] = false;
        });
        
        this.links = [];

        this.createLinks(data);
    }

    getVisibleNodes() {
        return this.nodes.filter(node => {
            // Root level nodes (depth 0, 1) are always visible
            if (node.depth === 0 || node.depth === 1) {
                return true;
            }
            
            // For deeper nodes, check if parent is open
            return node.parent && node.parent.open;
        });
    }

    nodeFilter(d) {
        if (d.parent.open) {
            return d;
        }
    }

    recursiveLinkLookup(node) {   
        // Safety check
        if (!node) {
            return null;
        }
        
        // Root nodes (depth 1) are always visible
        if (node.depth === 1 || (node.parent && node.parent.open)) {
            return node;
        }
        
        // Otherwise, this node is hidden, so recurse up to find visible ancestor
        if (node.parent) {
            return this.recursiveLinkLookup(node.parent);
        }

        return node;
    }

    findNodeById(id) {
        if (typeof id === 'object' && id.id) {
            // Already a node object
            return id;
        }
        // Find the actual node object from all nodes
        return this.nodes.find(node => node.id === id);
    };

    linksRollup(link) {
        let {source, target, hierarchal} = link;

        // Get actual node objects
        const sourceNode = this.findNodeById(source);
        const targetNode = this.findNodeById(target);
        
        if (!sourceNode || !targetNode) {
            return null;
        }

        // For phylo links, only show if the source node is visible
        if (hierarchal) {
            // Check if source node is visible (its parent is open)
            if (sourceNode.depth === 1 || (sourceNode.parent && sourceNode.parent.open)) {
                // Return a copy to avoid mutating the original
                return {
                    ...link,
                    source: sourceNode.id,
                    target: targetNode.id
                };
            }
        } else {
            // For myco links, roll up both source and target to visible nodes
            const visibleSource = this.recursiveLinkLookup(sourceNode);
            const visibleTarget = this.recursiveLinkLookup(targetNode);
            
            if (!visibleSource || !visibleTarget) {
                return null;
            }
            
            // If both resolve to the same node, don't create a self-link
            if (visibleSource.id === visibleTarget.id) {
                return null;
            }
            
            // Return a new link object with the visible nodes
            const rolledUpLink = {
                ...link,
                source: visibleSource.id, // Keep as ID for D3 to resolve
                target: visibleTarget.id
            };

            return rolledUpLink;
        }
    }

    createLinks(data) {
        this.links = data.links;
        if (this.options.generateHierarchalLinks) {
            this.generateHierarchalLinks(this.nodes);
        }
    }

    generateHierarchalLinks(nodes) {
        nodes.forEach((d) => {
            if (d.depth == 1) {
                let links = d.links();
                links.forEach((l) => {
                    this.links.push({
                        source: String(l.source.data.id), 
                        target: String(l.target.data.id), 
                        type: this.options.hierarchalLinkType, 
                        hierarchal: true
                    });
                })
            }
        });
    }

    setUpChargeScales() {
        this.chargeScale = d3.scaleLinear()
            .domain([0, 3])
            .range([-200, -10]);

        this.linkStrengthScale= d3.scaleLinear()
            .domain([0, 3])
            .range([0.6, 1]);

        this.gravityScale = d3.scaleLinear()
            .domain([0, 3])
            .range([0.05, 0.01]);
    }

    setUpForces(links = this.links){
        this.setUpChargeScales();
        
        this.chargeForce = d3.forceManyBody()
            .strength(d => {
                // Base strength on node type and depth
                const baseCharge = this.chargeScale(d.depth);
                return d.data.type === "tree" ? baseCharge * 1.5 : baseCharge;
            });

        this.linkForce = d3.forceLink(links)
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
            });

         this.xForce = d3.forceX(this.options.width / 2)
            .strength(d => {
              // If user positioned this node, no gravity
              if (d.userPositioned || (d.fx != null && d.fy != null)) return 0;
              
              // Otherwise use normal calculation
              const baseStrength = this.gravityScale(d.depth);
              return d.data.type === "tree" ? baseStrength * 1.2 : baseStrength;
            });
          
        this.yForce = d3.forceY(this.options.height / 2)
            .strength(d => {
              // If user positioned this node, no gravity
              if (d.userPositioned || (d.fx != null && d.fy != null)) return 0;
              
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
        // Get the visible nodes for simulation first
        const visibleNodes = this.getVisibleNodes();
        
        // Create a Set of visible node IDs for fast lookup
        const visibleNodeIds = new Set(visibleNodes.map(d => d.id));
        
        // Filter links based on type:
        // - Phylo links: only keep if both nodes are visible (they don't roll up)
        // - Myco links: keep all of them (they will roll up to visible ancestors)
        const linksForProcessing = this.links.filter(link => {
            if (link.type === "phylo") {
                // For phylo links, check if source node exists and is visible
                const sourceNode = this.nodes.find(n => n.id === link.source);
                if (!sourceNode) return false;
                
                // Keep phylo link if source is visible (depth 1 or parent is open)
                return sourceNode.depth === 1 || (sourceNode.parent && sourceNode.parent.open);
            } else {
                return true; // Keep all myco links for rollup
            }
        });
        
        // Apply rollup logic FIRST, then filter for node existence
        const rolledUpLinks = linksForProcessing.map(this.linksRollup).filter(link => link !== null);
        
        // Now filter the rolled-up links to ensure both nodes exist in visible set
        const finalLinks = rolledUpLinks.filter(link => {
            const hasSource = visibleNodeIds.has(link.source);
            const hasTarget = visibleNodeIds.has(link.target);
            
            return hasSource && hasTarget;
        });
        
        this.setUpForces(finalLinks);
        
        // Start simulation with filtered nodes and processed links
        this.simulation = d3.forceSimulation(visibleNodes)
            .force("link", this.linkForce)
            .force("charge", this.chargeForce)
            .force("x", this.xForce)
            .force("y", this.yForce)
            .force("collide", this.collideForce)
            .stop(); // Stop immediately to prevent simulation from running
            
        // Let D3 initialize the links (convert IDs to Node objects)
        this.simulation.tick();
        
        // Store filtered links for rendering
        this.filteredLinks = finalLinks;
        
        // Update the link force with final links
        this.linkForce.links(finalLinks);
        
        // Now start the simulation with the filtered links
        this.simulation
            .on("tick", this.ticked)
            .restart();
    }

    calculateBoundaries() {
        // First try to get the SVG dimensions directly
        const svg = d3.select(`#${this.options.containerId}`).select("svg");
        
        // Account for margins in the calculation
        const margin = 20; // Extra margin to ensure nodes don't touch edges
        
        // Get dimensions, with fallbacks
        let width = parseInt(svg.attr("width") || this.options.width);
        let height = parseInt(svg.attr("height") || this.options.height);
        
        // Store boundaries, accounting for margins
        this.boundaries = {
            minX: 0,
            maxX: width - margin,
            minY: 0, 
            maxY: height - margin,
            width: width,
            height: height
        };
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

    determineLinkColor(d){
        if (d.type == "myco") {
            return "rgb(27, 158, 119)"; // Green for myco links
        } else {
            return "#bbb"; // Gray for phylo links
        }
    }

    drawNodesAndLinks() {
        // Use all nodes initially, filtering will happen in updateSimulation
        const initialVisibleNodes = this.getVisibleNodes();
        const linksToRender = this.filteredLinks || this.links;
        
        // Create link elements
        this.linkElements = this.mainGroup.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(linksToRender)
            .enter()
            .append("line")
            .attr("stroke", d => this.determineLinkColor(d))
            .attr("stroke-width", d => this.arcScale(d.interactionStrength || 0));

        // Create node elements
        this.nodeElements = this.mainGroup.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(initialVisibleNodes)
            .enter()
            .append("circle")
            .attr("r", d => this.nodeDepthRadius[d.depth] || 5)
            .attr("fill", d => this.nodeColorScheme[d.data.type])
            .attr("stroke", "000")
            .attr("stroke-width", 1)
            .call(d3.drag()
                .on("start", this.dragstarted.bind(this))
                .on("drag", this.dragged.bind(this))
                .on("end", this.dragended.bind(this)))
            .on("click", this.selectNode.bind(this))
            .on("dblclick", this.doubleClickNode.bind(this));
                
        // Add hover title
        this.nodeElements.append("title")
            .text(d => d.data.name);

        this.setupTooltips();
    }
    
    dragstarted(event, d) {
        if (!event.active) this.simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        
        // Mark this node as user-positioned
        d.userPositioned = true;
    }

    findNode(x, y, radius, currentNode) {
        const nodes = this.simulation.nodes();
        let closest = null;
        let minDistance = radius == null ? Infinity : radius * radius;
        
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            
            // Skip the node being dragged
            if (node.id === currentNode.id) continue;
            
            // Only consider nodes that have fixed positions
            if (node.fx == null || node.fy == null) continue;
            
            // Calculate distance to current drag position using fixed positions
            const dx = x - node.fx;
            const dy = y - node.fy;
            const distance = dx * dx + dy * dy;
            
            // Check if this node is closer than previous closest
            if (distance < minDistance) {
                closest = node;
                minDistance = distance;
            }
        }
        
        return closest;
    }

    pushNode(x, y, d, closestNode) {
        // Calculate displacement to avoid overlap
        const draggedRadius = this.nodeDepthRadius[d.depth] || 5;
        const closestRadius = this.nodeDepthRadius[closestNode.depth] || 5;
        const minDistance = draggedRadius + closestRadius + 10; // Add 10px padding
        
        // Calculate current distance and direction vector
        const dx = x - closestNode.fx;
        const dy = y - closestNode.fy;
        const currentDistance = Math.sqrt(dx ** 2 + dy ** 2);
        
        // Only displace if nodes are too close
        if (currentDistance < minDistance) {
            // Calculate unit vector pointing away from dragged node
            const unitX = dx / currentDistance;
            const unitY = dy / currentDistance;
            
            // Calculate how far to push the fixed node
            const pushDistance = minDistance - currentDistance;
            
            // Displace the fixed node away from the dragged node
            closestNode.fx = closestNode.fx - (unitX * pushDistance);
            closestNode.fy = closestNode.fy - (unitY * pushDistance);
            
            // Ensure the displaced node stays within boundaries
            if (this.boundaries) {
                const nodeRadius = closestRadius;
                closestNode.fx = Math.max(this.boundaries.minX + nodeRadius, 
                                        Math.min(closestNode.fx, this.boundaries.maxX - nodeRadius));
                closestNode.fy = Math.max(this.boundaries.minY + nodeRadius, 
                                        Math.min(closestNode.fy, this.boundaries.maxY - nodeRadius));
            }
        }
    }
    
    dragged(event, d) {
        const x = event.x;
        const y = event.y;
        const closestNode = this.findNode(x, y, 30, d);
        
        if (closestNode) {
            this.pushNode(x, y, d, closestNode);
        }
        
        // Update dragged node position
        d.fx = x;
        d.fy = y;
    }
    
    dragended(event, d) {
        if (!event.active) this.simulation.alphaTarget(0);
        
        // For high-level nodes, keep them fixed where the user dragged them
        if (d.depth <= 1 || d.data.type === "tree") {
            // Keep position fixed, don't reset fx/fy
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
        this.targetNode.attr("stroke", this.color).attr("stroke-width", 2);
        this.tooltip.transition().duration(200).style("opacity", 0.9);
        this.displayTooltip(e, d, this.nodeTooltipHtml.bind(this));
    }

    nodeTooltipHtml(d){
        let parent = d.data.parent ? this.findNodeById(String(d.data.parent)).data.name: "None";
        return `
            <strong>Name:</strong> ${d.data.name} <br />
            <strong>Type:</strong> ${d.data.type} <br />
            <strong>Parent:</strong> ${parent}
        `;
    }

    hideNodeTooltip(){
        if (this.targetNode) {
            if (!this.targetNode.data()[0].selected) {
                this.targetNode.attr("stroke", "none").attr("stroke-width", 1);
            } else {
                this.targetNode.attr("stroke-width", 1);
            }
            this.targetNode = null;
            this.tooltip.transition().duration(200).style("opacity", 0);
        }
    }

    displayLinkTooltip(e, d){
        this.targetLink = d3.select(e.currentTarget);
        this.targetLink.style("stroke", "steelblue");
        this.tooltip.transition().duration(200).style("opacity", 1);
        this.displayTooltip(e, d, this.linkTooltipHtml);
        // Store the original link data for restoration
        this.targetLinkData = d;
    }

    displayTooltip(e, d, cb){
        this.tooltip
            .html(cb(d))
            .style("left", e.pageX + 20 +  "px")
            .style("top", e.pageY - 30 + "px");
    }

    hideLinkTooltip(){
        if (this.targetLink && this.targetLinkData) {
            // Restore the original color using the stored link data
            this.targetLink.style("stroke", this.determineLinkColor(this.targetLinkData));
            this.targetLink = null;
            this.targetLinkData = null;
            this.tooltip.transition().duration(200).style("opacity", 0);
        }
    }

    linkTooltipHtml(d){
        return `
            <strong>Source:</strong> ${d.source.data.name} <br />
            <strong>Target:</strong> ${d.target.data.name} <br />
            <strong>Type:</strong> ${d.type} <br />
            ${d.interactionStrength ? `<strong>Strength:</strong> ${d.interactionStrength} <br />` : ""}
            ${d.benefits ? `<strong>Benefits:</strong><div> ${d.benefits?.join("<br />")}</div>` : ""}
        `;
    }

    updateSimulation(){
        this.hideNodeTooltip();
        this.hideLinkTooltip();
        
        // Get fresh set of visible nodes
        const newVisibleNodes = this.getVisibleNodes();
        
        // Create a Set of visible node IDs for fast lookup
        const visibleNodeIds = new Set(newVisibleNodes.map(d => d.id));
        
        // Filter links based on type and apply rollup logic
        const linksForProcessing = this.links.filter(link => {
            if (link.type === "phylo") {
                // For phylo links, check if source node exists and is visible
                const sourceNode = this.nodes.find(n => n.id === link.source);
                if (!sourceNode) return false;
                
                // Keep phylo link if source is visible (depth 1 or parent is open)
                return sourceNode.depth === 1 || (sourceNode.parent && sourceNode.parent.open);
            } else {
                return true; // Keep all myco links for rollup
            }
        });
        
        // Apply rollup logic
        const rolledUpLinks = linksForProcessing.map(this.linksRollup).filter(link => link !== null);
        
        // Filter final links to ensure both nodes exist in visible set
        const finalLinks = rolledUpLinks.filter(link => {
            const hasSource = visibleNodeIds.has(link.source);
            const hasTarget = visibleNodeIds.has(link.target);

            return hasSource && hasTarget;
        });
        
        // Update the simulation with new nodes
        this.simulation.nodes(newVisibleNodes);
        
        // Update links
        this.linkForce.links(finalLinks);
        
        // Store the new filtered links
        this.filteredLinks = finalLinks;
        
        // Update the visual elements to match
        this.updateVisualElements(newVisibleNodes, finalLinks);
        
        // Restart simulation
        this.simulation.alpha(0.3).restart();
    }
    
    updateVisualElements(visibleNodes, filteredLinks) {
        // Update nodes - use data join pattern
        this.nodeElements = this.nodeElements.data(visibleNodes, d => d.id);
        
        // Remove exiting nodes
        this.nodeElements.exit().remove();
        
        // Add new nodes
        const newNodes = this.nodeElements.enter()
            .append("circle")
            .attr("r", d => this.nodeDepthRadius[d.depth] || 5)
            .attr("fill", d => this.nodeColorScheme[d.data.type])
            .attr("stroke", "000")
            .attr("stroke-width", 1)
            .call(d3.drag()
                .on("start", this.dragstarted.bind(this))
                .on("drag", this.dragged.bind(this))
                .on("end", this.dragended.bind(this)))
            .on("click", this.selectNode.bind(this))
            .on("dblclick", this.doubleClickNode.bind(this));
            
        // Add titles to new nodes
        newNodes.append("title").text(d => d.data.name);
        
        // Merge new and existing
        this.nodeElements = this.nodeElements.merge(newNodes);
        
        // Update links with proper data join
        this.linkElements = this.linkElements.data(filteredLinks, d => `${d.source}-${d.target}-${d.type}`);
        
        // Remove exiting links
        this.linkElements.exit().remove();
        
        // Add new links
        const newLinks = this.linkElements.enter()
            .append("line")
            .attr("stroke", d => {
                return this.determineLinkColor(d);
            })
            .attr("stroke-width", d => this.arcScale(d.interactionStrength || 0));
            
        // Merge new and existing links
        this.linkElements = this.linkElements.merge(newLinks);
        
        // Update existing link colors in case data changed
        this.linkElements.attr("stroke", d => this.determineLinkColor(d));
        
        // Re-setup tooltips for new elements
        this.setupTooltips();
    }

    selectNode(e) {
        if (this.selectedNode != d3.select(e.currentTarget) ) {
            // if there is a selected node, deselect it
            if (this.selectedNode) {
                this.selectedNode.data()[0].selected = false;
                this.selectedNode.attr("stroke", "none").attr("stroke-width", 1);
            }

            // select the new node
            this.selectedNode = d3.select(e.currentTarget);
            this.selectedNode.data()[0].selected = true;
            this.selectedNode.attr("stroke", this.color).attr("stroke-width", 1);
        }
    }

    doubleClickNode(_, d) {
        // if closing a node, close all children
        if (d.open){
            d.open = false;
            d.descendants().forEach(child => {
                child.open = false;
            });
        } else { 
            d.open = true; 
        }

        this.updateSimulation();
    }
}

export default StratifiedNetworkChart;