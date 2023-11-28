'use client'

import {useEffect} from 'react';

import {useDispatch} from '@/infra/providers/redux';
import {PipelinesList} from '@/widgets/pipelinesList/ui';
import {fetchPipelines} from '@/entities/pipeline/model';
import {withAuth} from '@/features/HOC/withAuth/ui';
import MainLayout from '@/features/mainLayout/ui';

import styles from './page.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPipelines());
  }, [dispatch]);

  return (
    <MainLayout>
      <div className={styles.root}>
        <p className={styles.title}>Your Data Pipelines</p>
        <div className={styles.list}>
          <PipelinesList />
        </div>
      </div>
    </MainLayout>
  )
}

export default withAuth(Home);
