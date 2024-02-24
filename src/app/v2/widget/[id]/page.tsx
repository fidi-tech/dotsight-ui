'use client'

import React from 'react';
import {Wizard} from 'react-use-wizard';

import MainLayout from '@/features/mainLayout/ui';
import {withAuth2} from '@/features/HOC/withAuth/ui';
import SubCategoriesSelector from '@/widgets/SubCategoriesSelector';
import MetricsSelector from '@/widgets/MetricsSelector';
import WidgetConfigurator from '@/widgets/WidgetConfigurator';
import {WidgetId} from '@/entities/widget/model';

import {useEnhance} from './hocs';
import {Breadcrumbs} from './components/Breadcrumbs';
import styles from './index.module.scss';

type Props = {
  params: {
    id: WidgetId;
  }
}

const Widget = ({ params }: Props) => {
  const {id} = params;
  const {step} = useEnhance(id);

  if (!id || step === undefined) {
    return null;
  }

  return <MainLayout>
    <div className={styles.breadcrumbs}>
      <Breadcrumbs id={id} />
    </div>
    <Wizard startIndex={step}>
      <SubCategoriesSelector id={id} />
      <MetricsSelector id={id} />
      <WidgetConfigurator id={id} />
    </Wizard>
  </MainLayout>;
}

export default withAuth2(Widget);
