import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { id: 0, value: 17, label: 'Pakistanis' },
  { id: 1, value: 22, label: 'European' },
  { id: 2, value: 14, label: 'Middle East ' },
  { id: 3, value: 11, label: 'Africans' },
  { id: 4, value: 27, label: 'Western Countries' },
];

export default function BarsDataset2() {
  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={400}
      width={850}
    />
  );
}