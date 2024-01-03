import React from 'react';

import {Widget} from '@/entities/widget/lib/widget';
import {LineChart as LineChartComponent} from '@/shared/ui/LineChart';

import Placeholder from '../placeholder';
import type {Customization} from '../params';
import useEnhance from '../hooks/widget';

const LineChart: Widget<any, Customization> = props => {
  const {
    data,
    isLoading,
    error
  } = useEnhance(props);

  if (!data || isLoading || error) {
    return <Placeholder isLoading={isLoading} isError={Boolean(error)} />;
  }

  return <LineChartComponent labels={data.labels} datasets={data.datasets} />;
};

export default LineChart;
