import React from 'react';

import {Module} from '@/shared/ui/Module';
import {Widget} from '@/entities/widget/lib/widget';
import Toggler from '@/shared/ui/Toggler';

import type {Customization} from '../params';
import useEnhance from '../hooks/widget';
import Placeholder from '../placeholder';
import styles from './index.module.scss';
import {Stat} from './components/Stat';

const RANGES = [
  {id: '24h', title: '24H'},
  {id: '7d', title: '1W'},
  {id: '30d', title: '30D'},
];

const Statistics: Widget<any, Customization> = props => {
  const {
    data,
    isLoading,
    error,
    range,
    setRange,
  } = useEnhance(props, {
    ranges: RANGES.map(({id}) => id),
  });

  if (!data || isLoading || error) {
    return <Placeholder isLoading={isLoading} isError={Boolean(error)} />;
  }

  return (
    <Module>
      <div className={styles.header}>
        <div className={styles.title}>
          {data.logoUrl && <img src={data.logoUrl} className={styles.logo} alt={data.name} />}
          <span>{data.name}</span>
          Stats
        </div>
        <Toggler options={RANGES} activeOptionId={range} onChange={setRange} />
      </div>
      <div className={styles.stats}>
        {data.stats.map(stat => <Stat {...stat} key={stat.stat}/>)}
      </div>
    </Module>
  )
};

export default Statistics;