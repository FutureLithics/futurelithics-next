"use client";
import * as d3 from "d3";
import BaseChart from "../BaseChart";

class StratifiedNetworkChart extends BaseChart {
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
    }

    stratifyData(data) {
        this.nodes = d3.stratify()
            .id((d) => d.id)
            .parentId((d) => d.parent)(data.nodes).descendants();
        
        this.links = [];

        this.createLinks(data);
        this.setupSimulation();
        this.drawNodesAndLinks();
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
            .force("link", d3.forceLink(this.links).id((d) => d.id))
            .force("charge", d3.forceManyBody().strength(-100))
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

    drawNodesAndLinks() {
        // Create link elements
        this.linkElements = this.mainGroup.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(this.links)
            .enter()
            .append("line")
            .attr("stroke", "#999")
            .attr("stroke-width", 1);

        // Create node elements
        this.nodeElements = this.mainGroup.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(this.nodes)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("fill", d => this.color(d.data.type))
            .call(d3.drag()
                .on("start", this.dragstarted.bind(this))
                .on("drag", this.dragged.bind(this))
                .on("end", this.dragended.bind(this)));
                
        // Add hover title
        this.nodeElements.append("title")
            .text(d => d.data.id);
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
}

export default StratifiedNetworkChart;