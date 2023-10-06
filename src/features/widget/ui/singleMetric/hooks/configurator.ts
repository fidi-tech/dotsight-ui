import React, {createRef, Ref, useImperativeHandle} from 'react';

import {customizationSchema, parametersSchema} from '../params';
import FormType from '@rjsf/core';

export const useEnhance = ({ref}: {ref: Ref<any>}) => {
  const parametersFormRef = createRef<FormType>();
  const customizationFormRef = createRef<FormType>();
  const [parametersFormData, setParametersFormData] = React.useState(null);
  const [customizationFormData, setCustomizationFormData] = React.useState(null);

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