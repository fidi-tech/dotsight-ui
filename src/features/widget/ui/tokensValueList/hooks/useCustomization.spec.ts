import {renderHook, waitFor} from '@testing-library/react';

import {PaletteVariant} from '@/shared/ui/styles/palettes';

import {useCustomization} from './useCustomization'

const DEFAULT = {
  count: 2,
  order: 'ASC' as const,
  withMarks: false,
  palette: PaletteVariant.v1,
  unit: 'usd',
}

describe('features/widget/ui/tokenValueList/hooks/useCustomization', () => {
  it('should return customizationFormData, customizationSchema and setCustomizationFormData', () => {
      const {result} = renderHook(() => useCustomization());
      expect(result.current).toHaveProperty('customizationFormData');
      expect(result.current).toHaveProperty('customizationSchema');
      expect(result.current).toHaveProperty('setCustomizationFormData');
  })

  it('should properly handle withMarks option', async () => {
    const {result} = renderHook(() => useCustomization());
    result.current.setCustomizationFormData({...DEFAULT, withMarks: true});
    await waitFor(() => {
      const currentSchema = result.current.customizationSchema.definitions?.customizationSchema;
      expect(result.current.customizationFormData.withMarks).toEqual(true);
      // @ts-ignore
      expect(currentSchema?.properties.withMarks).toEqual({type: 'boolean'});
      // @ts-ignore
      expect(currentSchema?.properties.palette).not.toBeNull();
      expect(result.current.customizationFormData.palette).toBeDefined();
    });
    result.current.setCustomizationFormData({...DEFAULT, withMarks: false});
    await waitFor(() => {
      const currentSchema = result.current.customizationSchema.definitions?.customizationSchema;
      expect(result.current.customizationFormData.withMarks).toEqual(false);
      // @ts-ignore
      expect(currentSchema?.properties.withMarks).toEqual({type: 'boolean'});
      // @ts-ignore
      expect(currentSchema?.properties.palette).not.toBeDefined();
      expect(result.current.customizationFormData.palette).not.toBeDefined();
    });
  })
});
