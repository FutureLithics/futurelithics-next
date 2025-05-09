"use client";

import React from "react";

interface TableProps {
  data: any[];
  type: string;
}

interface DataPoint {
  x: string;
  x2?: string;
  y: number;
}

interface CategoryProps {
  data: DataPoint[];
  options?: Record<string, any>;
}

interface DataTable {
  [key: string]: {
    [key: string]: number[];
  };
}

interface SingleDataTable {
  [key: string]: number[];
}

const DoubleCategory = (props: CategoryProps) => {
  const { data } = props;
  const dataTable: DataTable = {};

  const headers: string[] = [...new Set(data.map((d) => d.x))];
  const subCategories: string[] = [...new Set(data.map((d) => d.x2).filter((x): x is string => x !== undefined))];

  for (let d = 0; d < data.length; d++) {
    const datum = data[d];

    if (Object.keys(dataTable).includes(datum.x)) {
      if (datum.x2 && Object.keys(dataTable[datum.x]).includes(datum.x2)) {
        dataTable[datum.x][datum.x2].push(datum.y);
      } else if (datum.x2) {
        dataTable[datum.x][datum.x2] = [datum.y];
      }
    } else if (datum.x2) {
      dataTable[datum.x] = {};
      dataTable[datum.x][datum.x2] = [datum.y];
    }
  }

  let rows = 0;

  for (let header in dataTable) {
    const main = dataTable[header];

    for (let subCategory in main) {
      const subArray = main[subCategory];
      const len = subArray.length;

      if (len > rows) {
        rows = len;
      }
    }
  }

  const rowsArray = new Array(rows).fill(0);

  return (
    <div className="desktop-table-single">
      <table className="table table-bordered mb-0">
        <thead>
          <tr>
            <th>SubCategory</th>
            {headers.map((h, i) => (
              <th key={`header-${i}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {subCategories.map((subCategory, s) => {
            return (
              <tr key={`table-row-${s}`}>
                <th>{subCategory}</th>
                {headers.map((h) => {
                  const element = dataTable[h][subCategory];
                  return (
                    <td key={`cell-${h}`}>
                      {element[0] == undefined ? "N/A" : element[0]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const SingleCategory = (props: CategoryProps) => {
  const { data } = props;
  const dataTable: SingleDataTable = {};

  const headers = [...new Set(data.map((d) => d.x))];

  for (let d = 0; d < data.length; d++) {
    const datum = data[d];

    if (Object.keys(dataTable).includes(datum.x)) {
      dataTable[datum.x].push(datum.y);
    } else {
      dataTable[datum.x] = [datum.y];
    }
  }

  let rows = 0;

  for (let header in dataTable) {
    const len = dataTable[header].length;

    if (len > rows) {
      rows = len;
    }
  }

  const rowsArray = new Array(rows).fill(0);

  return (
    <div className="desktop-table-single">
      <table className="table table-striped table-bordered mb-0">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={`header-${i}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowsArray.map((row, r) => {
            return (
              <tr key={`table-row-${r}`}>
                {headers.map((h) => {
                  return (
                    <td key={`cell-${h}`}>
                      {dataTable[h][r] == undefined ? "N/A" : dataTable[h][r]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const DesktopTable = (props: TableProps) => {
  const { data, type } = props;

  return (
    <div className="desktop-table-container">
      {type == "single" ? (
        <SingleCategory data={data} />
      ) : (
        <DoubleCategory data={data} />
      )}
    </div>
  );
};

export default DesktopTable;