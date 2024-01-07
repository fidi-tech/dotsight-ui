'use client'

import React, {useCallback, useEffect} from 'react';
import {useRouter} from 'next/navigation';

import {useDispatch} from '@/infra/providers/redux';
import {PipelinesList} from '@/widgets/pipelinesList/ui';
import {fetchPipelines} from '@/entities/pipeline/model';
import {withAuth} from '@/features/HOC/withAuth/ui';
import MainLayout from '@/features/mainLayout/ui';
import {Module} from '@/shared/ui/Module';
import {Button} from '@/shared/ui/Button';
import {createPipeline} from '@/shared/api/dotsight';
import {Icons} from '@/shared/ui/icons';

import styles from './page.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(fetchPipelines());
  }, [dispatch]);
  const onCreate = useCallback(async () => {
    const pipeline = await createPipeline({});
    if (pipeline?.id) {
      router.push(`/pipeline/${pipeline?.id}`);
    }
  }, [router]);

  return (
    <MainLayout>
      <div className={styles.root}>
        <div>
          <Module className={styles.createModule}>
            <p className={styles.title}>Create Data Pipeline</p>
            <p className={styles.text}>Easily construct and create custom data pipelines for advanced Web3 analytics.</p>
            <hr className={styles.hr}/>
            <Button
              onClick={onCreate}
              text="Create Pipeline"
              icon={<Icons.Database />}
              iconPosition="Left"
              testId="create"
            />
          </Module>
        </div>
        <hr className={styles.hr}/>
        <p className={styles.title}>Your Data Pipelines</p>
        <div className={styles.list}>
          <PipelinesList />
        </div>
      </div>
    </MainLayout>
  )
}

export default withAuth(Home);
