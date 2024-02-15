import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

import {useEnhance} from './hocs';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

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

type Props = {
  data: any,
}

const View = ({data}: Props) => {
  const {
    chart,
  } = useEnhance(data);
  return (
    <div>
      Line Chart!
      <Line data={chart} options={OPTIONS} />
      {JSON.stringify(data)}
    </div>
  )
}

export default View;