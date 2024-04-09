'use client'

import React from 'react';

import MainLayout from '@/features/mainLayout/ui';
import WidgetConfigurator from '@/widgets/WidgetConfigurator';
import {WidgetId} from '@/entities/widget/model';

import {useEnhance} from '../hooks';

export type Props = {
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

  return (
    <MainLayout>
      <WidgetConfigurator id={id} />
    </MainLayout>
  );
}

export default Widget;
