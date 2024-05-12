import React from 'react';

import {RawWidgetData} from '@/shared/api/dotsight';

import {useEnhance} from './hooks';
import {ViewComponents, ViewType} from './views';

type Props = {
  data: RawWidgetData,
}

const View = ({data}: Props) => {
  const {items, chart, copyrights, metrics} = useEnhance(data);

  const viewType = ViewType.default;
  const Component = ViewComponents[viewType].View;

  return <Component items={items} chart={chart} copyrights={copyrights} metrics={metrics} />
}

export default View;