import React from 'react';

import {Table} from '@/shared/ui/Table';
import {Module} from '@/shared/ui/Module';

import {useEnhance} from './hocs';

type Props = {
  data: any,
}

const View = ({data}: Props) => {
  const {
    header,
    rows
  } = useEnhance(data);
  return (
    <div>
      <Module>
        <Table header={header} rows={rows} />
      </Module>
    </div>
  )
}

export default View;