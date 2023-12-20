import {createRef, Ref, useCallback, useImperativeHandle, useMemo, useState} from 'react';
import {zodToJsonSchema} from 'zod-to-json-schema';

import {PipelineId} from '@/entities/pipeline/model';
import useParametersSchema from '@/features/widget/lib/useParametersSchema';

import {customization, Customization, Parameters} from '../params';
import {PaletteVariant} from '@/shared/ui/styles/palettes';

export const useEnhance = ({ref, pipelineId}: {ref: Ref<any>, pipelineId: PipelineId}) => {
  const parametersFormRef = createRef<any>();
  const customizationFormRef = createRef<any>();
  const [parametersFormData, setParametersFormData] = useState<Parameters | null>(null);
  const [customizationFormData, setCustomizationFormData] = useState<Partial<Customization>>({
    palette: PaletteVariant.v1,
  });
  const {parametersSchema} = useParametersSchema({pipelineId});

  const updateCustomizationFormData = useCallback((data: Customization) => {
    setCustomizationFormData(data);
  }, [setCustomizationFormData]);

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
    setCustomizationFormData: updateCustomizationFormData,
    customizationSchema: zodToJsonSchema(customization, "customizationSchema"),
  }
}