import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490 ,3800, 4300,3800, 4300, 4000];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300 ,3800, 4300,3800, 4300, 5800];
const xLabels = [
  'January',
  'Febraury',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Agust',
  'september',
  'October',
  'November',
  'December',
];

const chartContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
};

export default function BarsDataset1() {
  return (
    <div style={chartContainerStyle}>
      <LineChart
        width={900}
        height={400}
        series={[
          { data: pData, label: 'Total_Earning' },
          { data: uData, label: 'Total_Expenses' },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
      />
    </div>
  );
}
