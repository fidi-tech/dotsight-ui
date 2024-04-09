'use client'

import React from 'react';
import {Wizard} from 'react-use-wizard';

import MainLayout from '@/features/mainLayout/ui';
import {withAuth} from '@/features/HOC/withAuth/ui';
import SubCategoriesSelector from '@/widgets/SubCategoriesSelector';
import MetricsSelector from '@/widgets/MetricsSelector';
import WidgetConfigurator from '@/widgets/WidgetConfigurator';
import {withWizardControls} from '@/widgets/WidgetConfigurator/hocs/withWizardControls';
import {WidgetId} from '@/entities/widget/model';

import {useEnhance} from './hooks';

type Props = {
  params: {
    id: WidgetId;
  }
}

const WidgetConfiguratorWithWizardControls = withWizardControls(WidgetConfigurator);

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
      <WidgetConfiguratorWithWizardControls id={id} />
    </Wizard>
  </MainLayout>;
}

export default withAuth(Widget);
