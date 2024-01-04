import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

type Props = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: Array<{x: string; y: number}>;
    borderColor: string;
    backgroundColor: string;
  }>
};

const OPTIONS = {
  plugins: {
    legend: {
      display: false,
    },
    customCanvasBackgroundColor: {
      color: 'white',
    },
  },
};

export const LineChart = (data: Props) => {
  return <Line data={data} options={OPTIONS} />;
};
