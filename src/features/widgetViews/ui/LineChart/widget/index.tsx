import React from 'react';

import {useEnhance} from './hooks';
import {ViewType, ViewComponents} from './views';

type Props = {
  data: any,
}

const View = ({data}: Props) => {
  const {
    title,
    chart,
    keys,
    items,
    unitId,
    copyrights,
  } = useEnhance(data);

  const viewType = ViewType.default;
  const Component = ViewComponents[viewType].View;
  return <Component title={title} chart={chart} keys={keys} items={items} unitId={unitId} copyrights={copyrights} />
}

export default View;