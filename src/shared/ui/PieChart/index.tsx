import React, {useMemo} from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

type Props = {
  pie: Array<{
    name: string;
    value: number;
    color: string;
  }>;
};

const OPTIONS = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const PieChart = ({pie}: Props) => {
  const data = useMemo(() => ({
    labels: pie.map(({name}) => name),
    datasets: [
      {
        data: pie.map(({value}) => value),
        backgroundColor: pie.map(({color}) => color),
        borderWidth: 0,
      },
    ],
  }), [pie]);

  return <Pie data={data} options={OPTIONS} />;
};
