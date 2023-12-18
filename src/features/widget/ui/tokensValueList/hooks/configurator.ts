import {createRef, Ref, useCallback, useEffect, useImperativeHandle, useMemo, useState} from 'react';
import {z} from 'zod';
import {zodToJsonSchema} from 'zod-to-json-schema';

import {modifyArrayLength} from '@/shared/lib/array';
import {PipelineId} from '@/entities/pipeline/model';
import useParametersSchema from '@/features/widget/lib/useParametersSchema';

import {customization as _customization, Customization, Parameters} from '../params';

export const useEnhance = ({ref, pipelineId}: {ref: Ref<any>, pipelineId: PipelineId}) => {
  const parametersFormRef = createRef<any>();
  const customizationFormRef = createRef<any>();
  const [parametersFormData, setParametersFormData] = useState<Parameters | null>(null);
  const [customizationFormData, setCustomizationFormData] = useState<Customization | null>(null);
  const {parametersSchema} = useParametersSchema({pipelineId});

  const updateCustomizationFormData = useCallback((data: Customization) => {
    if (data.withMarks && data.palette) {
      data.palette = modifyArrayLength(data.palette, data.withMarks ? (data.count ?? 0) : 0, '');
    } else if (!data.withMarks) {
      delete data.palette;
    }
    setCustomizationFormData(data);
  }, [setCustomizationFormData]);
  const [customization, setCustomization] = useState(_customization);
  const customizationSchema = useMemo(
    () => zodToJsonSchema(customization, "customizationSchema"),
    [customization],
  );

  useEffect(() => {
    const count = customizationFormData?.count ?? 0;
    const withMarks = customizationFormData?.withMarks || false;
    const length = (count && withMarks) ? count : 0;
    setCustomization(_customization.extend({
      palette: z.array(z.string()).length(length).optional().describe('Palette'),
    }));
  }, [customizationFormData?.count, customizationFormData?.withMarks]);

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
    customizationSchema,
  }
}