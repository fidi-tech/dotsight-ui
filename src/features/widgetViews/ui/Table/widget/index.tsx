import React from 'react';

import {useEnhance} from './hooks';
import {ViewComponents, ViewType} from './views';

type Props = {
  data: any,
}

const View = ({data}: Props) => {
  const {
    header,
    rows,
    copyrights,
  } = useEnhance(data);

  const viewType = ViewType.default;
  const Component = ViewComponents[viewType].View;

  return <Component header={header} rows={rows} copyrights={copyrights} />
}

export default View;