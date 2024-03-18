import {renderHook} from '@testing-library/react';

import {WidgetId} from '@/entities/widget/model';
import {SubCategory} from '@/entities/subCategory/model';

import {useEnhance} from '.';
import {useSubCategories} from './useSubCategories';
import {useWidget} from './useWidget';

const SUBCATEGORIES_RESULT: {subCategories: SubCategory[]} = {
  subCategories: [{
    id: 'sc1',
    icon: null,
    isAvailable: true,
    isSelected: true,
    name: 'subcategory1',
  }]
};
jest.mock('./useSubCategories', () => ({
  useSubCategories: jest.fn(() => SUBCATEGORIES_RESULT)
}))
const WIDGET_RESULT: Record<WidgetId, any> = {};
jest.mock('./useWidget', () => ({
  useWidget: jest.fn(() => WIDGET_RESULT)
}))


describe('widgets/SubCategoriesSelector/hooks/index', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('combines hooks', () => {
    const {result} = renderHook(() => useEnhance('2024'));
    expect(useSubCategories).toHaveBeenCalledTimes(1);
    expect(useSubCategories).toHaveBeenCalledWith('2024');
    expect(useWidget).toHaveBeenCalledTimes(1);
    expect(useWidget).toHaveBeenCalledWith('2024');
    Object.keys(WIDGET_RESULT).forEach(key => {
      expect(result.current).toHaveProperty(key, WIDGET_RESULT[key])
    })
    Object.keys(SUBCATEGORIES_RESULT).forEach(key => {
      expect(result.current.subCategories).toEqual(SUBCATEGORIES_RESULT.subCategories)
    })
  });
  describe('provides correct isCompleted value', () => {
    it('truthy', () => {
      (useSubCategories as  jest.MockedFn<any>).mockImplementation(() => ({
        subCategories: [{
          id: 'sc1',
          isAvailable: true,
          isSelected: true,
          name: 'subcategory1',
        }]
      }));
      const {result} = renderHook(() => useEnhance('2024'));
      expect(result.current.isCompleted).toBeTruthy();
    })
    it('falsy', () => {
      (useSubCategories as  jest.MockedFn<any>).mockImplementation(() => ({
        subCategories: [{
          id: 'sc1',
          isAvailable: true,
          isSelected: false,
          name: 'subcategory1',
        }]
      }));
      const {result} = renderHook(() => useEnhance('2024'));
      expect(result.current.isCompleted).toBeFalsy();
    })
  })
});
