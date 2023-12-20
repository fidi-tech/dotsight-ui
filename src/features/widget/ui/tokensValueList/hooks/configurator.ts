import {createRef, Ref, useImperativeHandle, useState} from 'react';

import {PipelineId} from '@/entities/pipeline/model';
import useParametersSchema from '@/features/widget/lib/useParametersSchema';
import {useCustomization} from '@/features/widget/ui/tokensValueList/hooks/useCustomization';

import {Parameters} from '../params';

export const useEnhance = ({ref, pipelineId}: {ref: Ref<any>, pipelineId: PipelineId}) => {
  const parametersFormRef = createRef<any>();
  const customizationFormRef = createRef<any>();
  const [parametersFormData, setParametersFormData] = useState<Parameters | null>(null);
  const {
    customizationFormData,
    customizationSchema,
    setCustomizationFormData,
  } = useCustomization();
  const {parametersSchema} = useParametersSchema({pipelineId});

  useImperativeHandle(ref, () => ({
    getConfiguration: () => {
      const isCustomizationValid = customizationFormRef.current.validateForm();
      const isParametersValid = parametersFormRef.current.validateForm();
      if (isCustomizationValid && isParametersValid) {
        return {
          parameters: parametersFormData,
          customization: customizationFormData,
        }
      }
    }
  }));

  return {
    parametersFormRef,
    parametersFormData,
    setParametersFormData,
    parametersSchema,
    customizationFormRef,
    customizationFormData,
    setCustomizationFormData,
    customizationSchema,
  }
}