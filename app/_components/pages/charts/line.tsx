"use client"
import React, { useState } from "react";
import { usePathname } from 'next/navigation';

import { LineChartComponent, AreaChartComponent } from "../../charts/line";

import DesktopTable from "../../tables/DesktopTable";
import MobileTable from "../../tables/MobileTable";
import SelectInput from "../../shared/SelectInput";
import { getRouteDataBySlug } from "@/app/utils/common.utils";

import cardRoutes from "@/app/service-routes";
import lineChartData from "../../../data/lineChartData";

const options = {
  chartType: [
    { value: "line", key: "Line Chart", table: "double" },
    { value: "area", key: "Area Chart", table: "double" },
  ],
  curveType: [
    { value: "curveLinear", key: "Curve Linear" },
    { value: "curveBasis", key: "Curve Basis" },
    { value: "curveCatmullRom", key: "Catmull–Rom" },
  ],
  colorScheme: [
    {
      value: "default",
      key: "Default Colors",
      highlight: "#25DD87",
      scheme: "Dark2",
    },
    {
      value: "second",
      key: "Category 10",
      highlight: "#F8BA42",
      scheme: "Category10",
    },
    {
      value: "tableau",
      key: "Tableau 10",
      highlight: "#d82340",
      scheme: "Tableau10",
    },
  ],
};

const componentSwitch = (value: string, data: any, options: any) => {
  switch (value) {
    case "line":
      return <LineChartComponent options={options} data={data} />;
    case "area":
      return <AreaChartComponent options={options} data={data} />;
    default:
      return <LineChartComponent options={options} data={data} />;
  }
};

const Line: React.FC = () => {
    const pathName = usePathname();
    const pathNameArray = pathName.split('/');
    const info = getRouteDataBySlug(pathNameArray[pathNameArray.length - 1], cardRoutes);
  
    const data = lineChartData;
  
    const [stateData, _] = useState([...data]);
  
    const [chartType, setChartType] = useState(options.chartType[0]);
    const [curveType, setCurveType] = useState(options.curveType[0]);
    const [colorScheme, setColorScheme] = useState(options.colorScheme[0]);
  
    const colorSetter = (value: string) => {
      const color = options.colorScheme.filter((c) => c.value == value)[0];
      setColorScheme(color);
    };
  
    const chartSetter = (value: string) => {
      const chart = options.chartType.filter((c) => c.value == value)[0];
      setChartType(chart);
    };
  
    const curveSetter = (value: string) => {
      const curve = options.curveType.filter((c) => c.value == value)[0];
      setCurveType(curve);
    };
  
    const componentOptions = {
      colorScheme,
      curve: curveType.value,
      containerId: "line-div-1",
      width: 600,
      height: 300,
    };
  
    const stillData = [...data.map((d: any) => d)];
  
    return (
      <div className="bar-chart-container container my-4">
        <div className="p-4 ash-container my-2">
          <h5>{info.title}</h5>
          <div className="my-2 row justify-content-start">
            <div className="col-md-3 py-2">
              <SelectInput
                options={options.chartType}
                value={chartType.value}
                handler={chartSetter}
              />
            </div>
            <div className="col-md-3 py-2">
              <SelectInput
                options={options.curveType}
                value={curveType.value}
                handler={curveSetter}
              />
            </div>
            <div className="col-md-3 py-2">
              <SelectInput
                options={options.colorScheme}
                value={colorScheme.value}
                handler={colorSetter}
              />
            </div>
          </div>
          {componentSwitch(chartType.value, stillData, componentOptions)}
        </div>
        <div className="text-center p-4 ash-container my-4 d-none d-md-block">
          <DesktopTable data={stateData} type={"double"} />
        </div>
        <div className="text-center p-4 ash-container my-4 d-block d-md-none">
          <MobileTable data={stateData} type={"double"} />
        </div>
      </div>
    );
  };
  
  export default Line;