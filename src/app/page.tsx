'use client'

import {useEffect} from 'react';

import {useDispatch} from '@/infra/providers/redux';
import {PipelinesList} from '@/widgets/pipelinesList/ui';
import {fetchPipelines} from '@/entities/pipeline/model';

import styles from './page.module.scss';

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPipelines());
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <p className={styles.title}>Your Data Pipelines</p>
      <div className={styles.list}>
        <PipelinesList />
      </div>
    </div>
  )
}
