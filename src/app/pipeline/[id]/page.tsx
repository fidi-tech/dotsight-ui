'use client'

import React from 'react';

import {PipelineManager} from '@/widgets/pipelineManager/ui';
import MainLayout from '@/features/mainLayout/ui';
import {withAuth} from '@/features/HOC/withAuth/ui';

type Props = {
  params: {
    id?: string;
  }
}
const Pipeline = ({ params }: Props) => {
  const {id} = params;

  if (!id) {
    return null;
  }

  return <MainLayout>
    <PipelineManager id={id} />
  </MainLayout>;
}

export default withAuth(Pipeline);
