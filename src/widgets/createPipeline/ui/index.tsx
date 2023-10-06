'use client'

import React, {useCallback} from 'react';
import { useRouter } from 'next/navigation';

import {Button} from '@/shared/ui/Button';
import {createPipeline} from '@/shared/api/dotsight';
import {Icons} from '@/shared/ui/icons';

export const CreatePipeline = () => {
  const router = useRouter();
  const onCreate = useCallback(async () => {
    const result = await createPipeline({});
    if (result?.data?.id) {
      router.push(`/pipeline/${result?.data?.id}`);
    }
  }, [router]);
  return (
      <Button
        onClick={onCreate}
        text="Create"
        icon={<Icons.Database />}
        iconPosition="Left"
      />
  );
};
