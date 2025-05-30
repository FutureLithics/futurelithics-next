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
            .parentId((d) => d.parent)(data.nodes).descendants();
        
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

    setupSimulation() {
        this.simulation = d3.forceSimulation(this.nodes)
            .force("link", d3.forceLink(this.links).id((d) => d.id).strength((d) => d.type == "myco" ? 0.002 : 0.02))
            .force("charge", d3.forceManyBody().strength(-1))
            .force("center", d3.forceCenter(this.options.width / 2, this.options.height / 2))
            .on("tick", this.ticked);
    }

    ticked() {
        if (this.nodeElements) {
            this.nodeElements
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        }

        if (this.linkElements) {
            this.linkElements
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
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
            .attr("r", 5)
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
    }
    
    dragstarted(event, d) {
        if (!event.active) this.simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    
    dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    
    dragended(event, d) {
        if (!event.active) this.simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
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