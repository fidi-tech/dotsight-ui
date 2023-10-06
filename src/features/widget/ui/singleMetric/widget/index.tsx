import React from 'react';

import {Module} from '@/shared/ui/Module';
import {Widget} from '@/entities/widget/lib/widget';

import type {Parameters, Customization} from '../params';
import useEnhance from '../hooks/widget';
import Placeholder from '../placeholder';
import styles from './index.module.scss';

const SingleMetric: Widget<Parameters, Customization> = props => {
  const {
    data,
    isLoading,
    error,
  } = useEnhance(props);

  if (!data || isLoading || error) {
    return <Placeholder isLoading={isLoading} isError={Boolean(error)} />;
  }

  const {label} = props.customization;
  return (
    <Module className={styles.root}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{data}</p>
    </Module>
  )
};

export default SingleMetric;