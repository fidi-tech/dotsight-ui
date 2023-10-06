import React from 'react';

import {Widget} from '@/entities/widget/lib/widget';
import {PieChart as PieChartComponent} from '@/shared/ui/PieChart';

import Placeholder from '../placeholder';
import type {Parameters, Customization} from '../params';
import useEnhance from '../hooks/widget';

const PieChart: Widget<Parameters, Customization> = props => {
  const {
    data,
    isLoading,
    error
  } = useEnhance(props);

  if (!data || isLoading || error) {
    return <Placeholder isLoading={isLoading} isError={Boolean(error)} />;
  }

  return <PieChartComponent pie={data} />;
};

export default PieChart;
