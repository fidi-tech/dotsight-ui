import {useCallback, useEffect, useMemo, useReducer, useState} from 'react';
import {z} from 'zod';
import {zodToJsonSchema} from 'zod-to-json-schema';

import {PaletteVariant} from '@/shared/ui/styles/palettes';

import {customization as _customization, Customization, partialCustomization} from '../params';

type PartialCustomization = Partial<Customization>;
enum ActionType {
  remove = 'remove',
  add = 'add',
  set = 'set',
}
type Action = {
  type: ActionType,
  payload?: PartialCustomization,
}

const reducer = (state: Partial<Customization>, action: Action): PartialCustomization => {
  switch (action.type) {
    case ActionType.remove:
      const { palette, ...rest } = state;
      return rest;
    case ActionType.add:
      if (state.palette) {
        return state;
      }
      return {
        ...state,
        palette: PaletteVariant.v1,
      };
    case ActionType.set:
      return action.payload!;
    default:
      return state;
  }
}

export const useCustomization = () => {
  const [customizationFormData, dispatchCustomizationFormData] = useReducer(reducer, {});
  const [customization, setCustomization] = useState<typeof partialCustomization | typeof _customization>(
    _customization
  );

  const customizationSchema = useMemo(
    () => zodToJsonSchema(customization, "customizationSchema"),
    [customization],
  );
  const setCustomizationFormData = useCallback((data: Customization) => {
    dispatchCustomizationFormData({type: ActionType.set, payload: data})
  }, [dispatchCustomizationFormData]);

  useEffect(() => {
    const withMarks = customizationFormData?.withMarks || false;
    if (withMarks) {
      setCustomization(_customization.extend({
        palette: z.enum([PaletteVariant.v1, PaletteVariant.v2, PaletteVariant.v3] as const),
      }));
      dispatchCustomizationFormData({type: ActionType.add});
    } else {
      setCustomization(_customization.omit({
        palette: true,
      }) as typeof partialCustomization);
      dispatchCustomizationFormData({type: ActionType.remove});
    }
  }, [customizationFormData.withMarks, dispatchCustomizationFormData]);

  return {
    customizationFormData,
    customizationSchema,
    setCustomizationFormData,
  }
}