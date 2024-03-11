import React from 'react';

import {MetricId} from '@/entities/metric/model';

type Props = {
  external: {
    metrics: Record<MetricId, {name: string}>,
  },
  payload: {
    value: number,
  },
  x: number,
  y: number,
  textAnchor: string,
  stroke: string,
  radius: number,
};

export const Tick = ({ payload, x, y, textAnchor, stroke, radius, external }: Props) => {
  return (
    <g
      className="recharts-layer recharts-polar-angle-axis-tick"
    >
      <text
        radius={radius}
        stroke={stroke}
        x={x}
        y={y}
        className="recharts-text recharts-polar-angle-axis-tick-value"
        textAnchor={textAnchor}
      >
        <tspan x={x} dy="0em">
          {external.metrics[payload.value].name}
        </tspan>
      </text>
    </g>
  );
}