import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";

const chartSetting = {
  yAxis: [
    {
      label: " Total Output Of Hotel and hotel Rooms Data",
    },
  ],
  width: 700,
  height: 410,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};
const dataset = [
  {
    Total_Rooms_ADD: 77,
    Deleted_Rooms: 22,
    month: "Jan",
  },
  {
    // Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 47,
    // Deleted_Hotels: 16,
    Deleted_Rooms: 30,
    month: "Fev",
  },
  {
    // Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 27,
    // Deleted_Hotels: 16,
    Deleted_Rooms: 10,
    month: "Mar",
  },
  {
    // Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 37,
    // Deleted_Hotels: 16,
    Deleted_Rooms: 30,
    month: "Apr",
  },
  {
    // Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 27,
    // Deleted_Hotels: 16,
    Deleted_Rooms: 1,
    month: "May",
  },
  {
    // Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 17,
    // Deleted_Hotels: 16,
    Deleted_Rooms: 2,
    month: "June",
  },
  {
    // Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 132,
    // Deleted_Hotels: 16,
    Deleted_Rooms: 20,
    month: "July",
  },
  {
    // Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 107,
    // Deleted_Hotels: 16,
    Deleted_Rooms: 1,
    month: "Aug",
  },
  {
    // Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 87,
    // Deleted_Hotels: 16,
    Deleted_Rooms: 13,
    month: "Sept",
  },
  {
    // Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 79,
    // Deleted_Hotels: 16,
    Deleted_Rooms: 33,
    month: "Oct",
  },
  {
    // Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 83,
    // Deleted_Hotels: 16,
    Deleted_Rooms: 22,
    month: "Nov",
  },
  {
    // Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 62,
    // Deleted_Hotels: 16,
    Deleted_Rooms: 30,
    month: "Dec",
  },
];

const valueFormatter = (value) => `${value}`;

export default function BarsDataset() {
  return (
    <div style={{ marginLeft: "10%" }}>
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: "band", dataKey: "month" }]}
        series={[
          // { dataKey: 'Total_Hotels_ADD', label: 'Total_Hotels_ADD', valueFormatter },
          {
            dataKey: "Total_Rooms_ADD",
            label: "Total_Rooms_ADD",
            valueFormatter,
          },
          // { dataKey: 'Deleted_Hotels', label: 'Deleted_Hotels', valueFormatter },
          { dataKey: "Deleted_Rooms", label: "Deleted_Rooms", valueFormatter },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
