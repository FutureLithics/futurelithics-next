"use client";
import React, { useState, useEffect } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { usePathname } from 'next/navigation';
import { StratifiedNetworkChart } from "../../charts/network";
import { mycorrhizalData } from "../../../data/mycorrhizalData";

const nodeColorScheme = {
    "fungus": "pink",
    "tree": "green",
    "group": "brown",
    "genus": "salmon"
 };

const MycoNetwork = () => {
    const defaultOptions = {
        colorScheme: {highlight: "darkred"},
        nodeColorScheme: nodeColorScheme,
        containerId: "network-chart",
        width: 600,
        height: 300,
    };

    useEffect(() => {
        const chart = new StratifiedNetworkChart(defaultOptions, mycorrhizalData);
    }, []);

    return (
        <div id={defaultOptions.containerId} className="chart-viewbox"></div>
    )
};

export default MycoNetwork;