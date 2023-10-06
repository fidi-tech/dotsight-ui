'use client'

import React from 'react';

import {PipelineManager} from '@/widgets/pipelineManager/ui';

export default function Pipeline({ params }: { params: { id: string } }) {
  const {id} = params;

  if (!id) {
    return null;
  }

  return <PipelineManager id={id} />;
}
