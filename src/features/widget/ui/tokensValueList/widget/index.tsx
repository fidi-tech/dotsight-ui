import React from 'react';

import {Module} from '@/shared/ui/Module';
import {Widget} from '@/entities/widget/lib/widget';
import {Table} from '@/shared/ui/Table';

import type {Parameters, Customization} from '../params';
import useEnhance from '../hooks/widget';
import Placeholder from '../placeholder';

const TokensValueList: Widget<Parameters, Customization> = props => {
  const {
    data,
    isLoading,
    error,
  } = useEnhance(props);

  if (!data || isLoading || error) {
    return <Placeholder isLoading={isLoading} isError={Boolean(error)} />;
  }

  const {rows} = data;
  const {palette} = props.customization;
  return (
    <Module>
      <Table header={['Asset', 'Value']} rows={rows} palette={palette} />
    </Module>
  )
};

export default TokensValueList;