import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
  yAxis: [
    {
      label: 'Total Output Of Hotel and hotel Rooms Data',
    },
  ],
  width:1000,
  height:450,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};
const dataset = [
  {
    Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 77,
    Deleted_Hotels: 16,
    Deleted_Rooms: 30,
    month: 'Jan',
  },
  {
    Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 77,
    Deleted_Hotels: 16,
    Deleted_Rooms: 30,
    month: 'Fev',
  },
  {
    Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 77,
    Deleted_Hotels: 16,
    Deleted_Rooms: 30,
    month: 'Mar',
  },
  {
    Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 77,
    Deleted_Hotels: 16,
    Deleted_Rooms: 30,
    month: 'Apr',
  },
  {
    Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 77,
    Deleted_Hotels: 16,
    Deleted_Rooms: 30,
    month: 'May',
  },
  {
    Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 77,
    Deleted_Hotels: 16,
    Deleted_Rooms: 30,
    month: 'June',
  },
  {
    Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 77,
    Deleted_Hotels: 16,
    Deleted_Rooms: 30,
    month: 'July',
  },
  {
    Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 77,
    Deleted_Hotels: 16,
    Deleted_Rooms: 30,
    month: 'Aug',
  },
  {
    Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 77,
    Deleted_Hotels: 16,
    Deleted_Rooms: 30,
    month: 'Sept',
  },
  {
    Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 77,
    Deleted_Hotels: 16,
    Deleted_Rooms: 30,
    month: 'Oct',
  },
  {
    Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 77,
    Deleted_Hotels: 16,
    Deleted_Rooms: 30,
    month: 'Nov',
  },
  {
    Total_Hotels_ADD: 47,
    Total_Rooms_ADD: 77,
    Deleted_Hotels: 16,
    Deleted_Rooms: 30,
    month: 'Dec',
  },
];

const valueFormatter = (value) => `${value}`;

export default function BarsDataset() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[
          { dataKey: 'Total_Hotels_ADD', label: 'Total_Hotels_ADD', valueFormatter },
          { dataKey: 'Total_Rooms_ADD', label: 'Total_Rooms_ADD', valueFormatter },
          { dataKey: 'Deleted_Hotels', label: 'Deleted_Hotels', valueFormatter },
          { dataKey: 'Deleted_Rooms', label: 'Deleted_Rooms', valueFormatter },
        ]}
        {...chartSetting}
      />
    </div>
  )}