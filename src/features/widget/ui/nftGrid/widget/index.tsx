import React from 'react';

import {Module} from '@/shared/ui/Module';
import {Widget} from '@/entities/widget/lib/widget';
import NFT from '@/shared/ui/NFT';

import type {Customization} from '../params';
import useEnhance from '../hooks/widget';
import Placeholder from '../placeholder';
import styles from './index.module.scss';

const NFTGrid: Widget<any, Customization> = props => {
  const {
    data,
    isLoading,
    error,
  } = useEnhance(props);

  if (!data || isLoading || error) {
    return <Placeholder isLoading={isLoading} isError={Boolean(error)} />;
  }

  return (
    <Module className={styles.root}>
      {data.items.filter(item => item.thumbnailUrl).map(item => (
        <NFT
          key={`${item.contractId}-${item.id}`}
          name={item.name}
          collectionName={item.contractName}
          thumbnail={item.thumbnailUrl}
          chain={item.chain}
          lastPrice={item.lastPrice}
          detailUrl={item.detailUrl}
        />
      ))}
    </Module>
  )
};

export default NFTGrid;