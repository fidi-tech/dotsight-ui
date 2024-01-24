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
            <p className={styles.title}>Build Web3 Dashboard</p>
            <p className={styles.text}>Seamlessly design and deploy tailored data dashboards for in-depth Web3 analytics.</p>
            <hr className={styles.hr}/>
            <Button
              onClick={onCreate}
              text="New Dashboard"
              icon={<Icons.Database />}
              iconPosition="Left"
              testId="create"
            />
          </Module>
        </div>
        <hr className={styles.hr}/>
        <p className={styles.title}>My Dashboards</p>
        <div className={styles.list}>
          <PipelinesList />
        </div>
      </div>
    </MainLayout>
  )
}

export default withAuth(Home);
