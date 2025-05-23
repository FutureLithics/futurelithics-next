"use client"
import React, { useState } from "react";
import { usePathname, useRouter } from 'next/navigation';

import {
  BarChartComponent,
  BandedBarComponent,
  StackedBarComponent,
} from "../../charts/bar";

import cardRoutes from "@/app/service-routes";
import barChartData from "../../../data/barChartData";

import DesktopTable from "../../tables/DesktopTable";
import MobileTable from "../../tables/MobileTable";
import SelectInput from "../../shared/SelectInput";
import { getRouteDataBySlug } from "@/app/utils/common.utils";

const options = {
  orientation: [
    { value: "landscape", key: "Landscape" },
    { value: "portrait", key: "Portrait" },
  ],
  chartType: [
    { value: "bar", key: "Bar", table: "single" },
    { value: "scaleBand", key: "Scale Band", table: "double" },
    { value: "stacked", key: "Stacked Bar", table: "double" },
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
    case "bar":
      return <BarChartComponent data={data} options={options} />;
    case "scaleBand":
      return <BandedBarComponent data={data} options={options} />;
    case "stacked":
      return <StackedBarComponent data={data} options={options} />;
    default:
      return <BarChartComponent data={data} options={options} />;
  }
};

const Bar: React.FC = () => {
    const pathName = usePathname();
    const pathNameArray = pathName.split('/');
    const info = getRouteDataBySlug(pathNameArray[pathNameArray.length - 1], cardRoutes);
    
    const data = barChartData;

    const [orientation, setOrientation] = useState(options.orientation[0].value);
    const [chartType, setChartType] = useState(options.chartType[0]);
    const [colorScheme, setColorScheme] = useState(options.colorScheme[0]);
  
    const tableOptions = {
      type: chartType.table,
    };
  
    const chartSetter = (value: string) => {
      const chart = options.chartType.filter((c) => c.value == value)[0];
      setChartType(chart);
      tableOptions.type = chartType.table;
    };
  
    const colorSetter = (value: string) => {
      const color = options.colorScheme.filter((c) => c.value == value)[0];
      setColorScheme(color);
    };
  
    const componentOptions = {
      orientation,
      colorScheme,
      containerId: "bar-divy-1",
      width: 600,
      height: 300,
    };
  
    return (
      <div className="chart-page bar-chart-container container">
        <div className="p-4 ash-container my-2">
          <h5>{info.title}</h5>
          <div className="my-2 row justify-content-start">
            <div className="col-md-3 py-2">
              <SelectInput
                options={options.orientation}
                value={orientation}
                handler={setOrientation}
              />
            </div>
            <div className="col-md-3 py-2">
              <SelectInput
                options={options.chartType}
                value={chartType.value}
                handler={chartSetter}
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
          {componentSwitch(chartType.value, data, componentOptions)}
        </div>
  
        <div className="text-center p-4 ash-container my-4 d-none d-md-block">
          <DesktopTable data={data} type={chartType.table} />
        </div>
        <div className="text-center p-4 ash-container my-4 d-block d-md-none">
          <MobileTable data={data} type={chartType.table} />
        </div>
      </div>
    );
}

export default Bar;
