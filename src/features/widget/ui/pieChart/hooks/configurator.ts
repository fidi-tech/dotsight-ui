import {createRef, Ref, useCallback, useEffect, useImperativeHandle, useMemo, useState} from 'react';
import {z} from 'zod';
import {zodToJsonSchema} from 'zod-to-json-schema';

import {modifyArrayLength} from '@/shared/lib/array';

import {customization as _customization, Customization, Parameters, parametersSchema} from '../params';

export const useEnhance = ({ref}: {ref: Ref<any>}) => {
  const parametersFormRef = createRef<any>();
  const customizationFormRef = createRef<any>();
  const [parametersFormData, setParametersFormData] = useState<Parameters | null>(null);
  const [customizationFormData, setCustomizationFormData] = useState<Customization | null>(null);

  const updateCustomizationFormData = useCallback((data: Customization) => {
    if (data.palette) {
      data.palette = modifyArrayLength(data.palette, data.count ?? 0, '');
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
    setCustomization(_customization.extend({
      palette: z.string().array().length(count).describe('Palette'),
    }));
  }, [customizationFormData?.count]);

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