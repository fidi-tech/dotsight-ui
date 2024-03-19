import {act, renderHook} from '@testing-library/react';

import {getSubCategoriesByWidgetId} from '@/entities/subCategory/model/providers/getSubCategoriesByWidgetId';
import {setSubCategoriesByWidgetId} from '@/entities/subCategory/model/providers/setSubCategoriesByWidgetId';

import {useSubCategories} from './useSubCategories';

let mockDispatch = jest.fn(action => action);
jest.mock('@/infra/providers/redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
}));
jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
}));
jest.mock('@/entities/subCategory/model/providers/getSubCategoriesByWidgetId', () => ({
  getSubCategoriesByWidgetId: jest.fn(() => ({type: 'getSubCategoriesByWidgetId'})),
}));
jest.mock('@/entities/subCategory/model/providers/setSubCategoriesByWidgetId', () => ({
  setSubCategoriesByWidgetId: jest.fn(() => ({type: 'setSubCategoriesByWidgetId'})),
}));
jest.mock('@/entities/subCategory/model/selectors', () => ({
  selectAll: jest.fn(() => [
    {
      id: '2024',
      isAvailable: true,
      isSelected: true,
      name: 'subcategory2024',
    },
    {
      id: '2025',
      isAvailable: true,
      isSelected: false,
      name: 'subcategory2025',
    },
  ]),
}));


describe('widgets/SubCategoriesSelector/hooks/useWidget', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('gets subcategories', () => {
    const {result} = renderHook(() => useSubCategories('1'));
    expect(mockDispatch).toHaveBeenCalledWith(getSubCategoriesByWidgetId('1', ''));
    expect(result.current.subCategories).toEqual([
      {
        id: '2024',
        isAvailable: true,
        isSelected: true,
        name: 'subcategory2024',
      },
      {
        id: '2025',
        isAvailable: true,
        isSelected: false,
        name: 'subcategory2025',
      },
    ]);
  });
  it('handles query', () => {
    const {result} = renderHook(() => useSubCategories('1'));
    expect(result.current.query).toEqual('');
    expect(result.current.setQuery).toEqual(expect.any(Function));
    act(() => {
      result.current.setQuery('a');
    })
    expect(result.current.query).toEqual('a');
    expect(mockDispatch).toHaveBeenCalledWith(getSubCategoriesByWidgetId('1', 'a'));
  })
  it('handles onSelect', () => {
    const {result} = renderHook(() => useSubCategories('1'));
    expect(result.current.onSelectSubCategory).toEqual(expect.any(Function));
    act(() => {
      result.current.onSelectSubCategory('2025');
    });
    expect(mockDispatch).toHaveBeenCalledWith(setSubCategoriesByWidgetId('1', ['2024', '2025'], ''));
    act(() => {
      result.current.onSelectSubCategory('2024');
    });
    expect(mockDispatch).toHaveBeenCalledWith(setSubCategoriesByWidgetId('1', ['2025'], ''));
  })
});
