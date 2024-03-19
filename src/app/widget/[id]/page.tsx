'use client'

import React from 'react';
import {Wizard} from 'react-use-wizard';

import MainLayout from '@/features/mainLayout/ui';
import {withAuth} from '@/features/HOC/withAuth/ui';
import SubCategoriesSelector from '@/widgets/SubCategoriesSelector';
import MetricsSelector from '@/widgets/MetricsSelector';
import WidgetConfigurator from '@/widgets/WidgetConfigurator';
import {WidgetId} from '@/entities/widget/model';

import {useEnhance} from './hooks';

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
    <Wizard startIndex={step}>
      <SubCategoriesSelector id={id} />
      <MetricsSelector id={id} />
      <WidgetConfigurator id={id} />
    </Wizard>
  </MainLayout>;
}

export default withAuth(Widget);
