"use client";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faImage, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { StratifiedNetworkChart } from "../../charts/network";
import { mycorrhizalData } from "../../../data/mycorrhizalData";
import TooltipContainer from "../../shared/Tooltip";

const nodeColorScheme = {
    "fungus": "pink",
    "tree": "green",
    "group": "brown",
    "genus": "salmon"
 };

const nodeDepthRadius = {
    1: 12,
    2: 8,
    3: 5,
};

const NodeInfoEmpty = () => {
    return (
        <>
            <div className="placeholder-node-image overflow-hidden me-2 align-self-center align-self-md-start">
                <FontAwesomeIcon icon={faImage} size="xl" />
            </div>
            <div>
                <p>Select a node to view more information</p>
            </div>
        </>
    )
}

const NodeInfo = ({node}: {node: any}) => {
    return (
        <>
            <div className="network-node-image rounded-circle overflow-hidden align-self-center align-self-md-start">
                <img src={node?.image} alt={node?.name} className="img-fluid d-block" />
            </div>
            <div>
                <p className="h6">{node?.name}</p>
                <p className="text-muted">{node?.description.slice(0, 175).split(" ").slice(0, -1).join(" ")}...</p>
                <a href={node?.link} target="_blank" rel="noopener noreferrer">
                    Learn More
                    <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" className="ms-2" />
                </a>
            </div>
        </>
    )
}

const MycoNetwork = () => {

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState<any>(null);

    const setLinkHierarchy = (links: any)=> {
        return links.map((l: any) => {
            return Object.assign({}, l, {
                hiearchal: false,
                type: "myco",
                source: String(l.source),
                target: String(l.target)
            })
        });
    }

    const defaultOptions = {
        colorScheme: { highlight: "darkred" },
        nodeColorScheme: nodeColorScheme,
        containerId: "network-chart",
        width: 600,
        height: 350,
        generateHierarchalLinks: true,
        hierarchalLinkType: "phylo",
        hierarchalNodeType: "fungus",
        nonHierarchalNodeType: "tree",
        nodeDepthRadius: nodeDepthRadius,
        setSelectedNode: setSelectedNode
    };

    useEffect(() => {
        mycorrhizalData.links = setLinkHierarchy(mycorrhizalData.links);
        
        const chart = new StratifiedNetworkChart(defaultOptions, mycorrhizalData);
    }, []);

    useEffect(() => {
        console.log("selectedNode", selectedNode);
    }, [selectedNode]);

    return (
        <div className="chart-page bar-chart-container container">
            <div className="p-2 p-md-4 ash-container my-2 container">
                <div className="row mb-2 mb-md-0 justify-content-between px-2">
                    <div className="col-md-5 mb-1">
                        <h2 className="h5 text-center text-md-start">Mycorrhizal Network
                            <span 
                                className="ms-2 h6" 
                                id="myco-network-tooltip" 
                                onMouseOver={() => setTooltipOpen(true)}
                                onMouseOut={() => setTooltipOpen(false)}
                            >
                                <FontAwesomeIcon icon={faInfoCircle} size="xs" />
                            </span>
                        </h2>                        
                    </div>
                    <div className="d-none d-md-flex network-node-info col-md-7 text-md-start gap-3">
                    { selectedNode ? <NodeInfo node={selectedNode} /> : <NodeInfoEmpty /> }
                    </div>
                </div>
                
                <div id={defaultOptions.containerId} className="chart-viewbox"></div>
                <div className="d-flex d-md-none mt-4 network-node-info col-md-12 flex-column text-center gap-2">
                    { selectedNode ? <NodeInfo node={selectedNode} /> : <NodeInfoEmpty /> }
                </div>
                <TooltipContainer target="myco-network-tooltip" isOpen={tooltipOpen} placement="bottom">
                    <div className="text-primary">
                        <strong>Mycorrhizal Network Visualization</strong><br/>
                        <p className="text-start mt-1">
                            Double-click nodes to expand/collapse branches.<br/>
                            Green nodes are trees, and do not expand.<br/>
                        </p>
                    </div>
                </TooltipContainer>
            </div>
        </div>
    )
};

export default MycoNetwork;