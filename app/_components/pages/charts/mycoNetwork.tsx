"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
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

const MycoNetwork = () => {
    const defaultOptions = {
        colorScheme: { highlight: "darkred" },
        nodeColorScheme: nodeColorScheme,
        containerId: "network-chart",
        width: 600,
        height: 300,
        generateHierarchalLinks: true,
        hierarchalLinkType: "phylo",
        nodeDepthRadius: nodeDepthRadius
    };

    const [tooltipOpen, setTooltipOpen] = useState(false);

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

    useEffect(() => {
        mycorrhizalData.links = setLinkHierarchy(mycorrhizalData.links);
        
        const chart = new StratifiedNetworkChart(defaultOptions, mycorrhizalData);
    }, []);

    return (
        <div className="chart-page bar-chart-container container">
            <div className="p-4 ash-container my-2">
                <div className="row mb-2">
                    <h2 className="h6">Mycorrhizal Network
                        <span 
                            className="ms-2" 
                            id="myco-network-tooltip" 
                            onMouseOver={() => setTooltipOpen(true)}
                            onMouseOut={() => setTooltipOpen(false)}
                        >
                            <FontAwesomeIcon icon={faInfoCircle} size="xs" />
                        </span>
                    </h2>
                </div>
                
                <div id={defaultOptions.containerId} className="chart-viewbox"></div>
                <TooltipContainer target="myco-network-tooltip" isOpen={tooltipOpen} placement="right">
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