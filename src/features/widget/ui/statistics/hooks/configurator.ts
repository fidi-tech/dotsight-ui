import React, {createRef, Ref, useImperativeHandle} from 'react';
import FormType from '@rjsf/core';

import {PipelineId} from '@/entities/pipeline/model';
import useParametersSchema from '@/features/widget/lib/useParametersSchema';

import {customizationSchema} from '../params';

export const useEnhance = ({ref, pipelineId}: {ref: Ref<any>, pipelineId: PipelineId}) => {
  const parametersFormRef = createRef<FormType>();
  const customizationFormRef = createRef<FormType>();
  const [parametersFormData, setParametersFormData] = React.useState(null);
  const [customizationFormData, setCustomizationFormData] = React.useState(null);
  const {parametersSchema} = useParametersSchema({pipelineId});

  useImperativeHandle(ref, () => ({
    getConfiguration: () => {
      const isCustomizationValid = customizationFormRef.current?.validateForm();
      const isParametersValid = parametersFormRef.current?.validateForm();
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