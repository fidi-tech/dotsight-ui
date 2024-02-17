'use client'

import React, {useCallback} from 'react';
import { useRouter } from 'next/navigation'

import MainLayout from '@/features/mainLayout/ui';
import {withAuth} from '@/features/HOC/withAuth/ui';
import {Module} from '@/shared/ui/Module';
import {Button} from '@/shared/ui/Button';
import {Icons} from '@/shared/ui/icons';
import HideableBlock from '@/shared/ui/HideableBlock';
import {WidgetsList} from '@/widgets/WidgetsList';

import styles from './index.module.scss';

type Props = {}
const Widgets = ({}: Props) => {
  const router = useRouter()
  const onCreate = useCallback(async () => router.push(`/v2/widget`), [router]);

  return <MainLayout>
    <div>
      <div>
        <Module className={styles.createModule}>
          <div className={styles.title}>
            <Icons.Tiles />
            Create Data Widgets
          </div>
          <p className={styles.text}>Easily construct and create custom data widget for advanced Web3 analytics.</p>
          <Button
            onClick={onCreate}
            text="Create Widget"
            testId="create"
          />
        </Module>
      </div>
      <hr className={styles.hr}/>
      <HideableBlock title="Data Widgets" Icon={<div className={styles.widgetsIcon}><Icons.Database /></div>}>
        <div className={styles.content}>
          <WidgetsList />
        </div>
      </HideableBlock>
    </div>
  </MainLayout>;
}

export default withAuth(Widgets);
