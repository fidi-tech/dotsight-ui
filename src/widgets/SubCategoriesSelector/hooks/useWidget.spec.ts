import {renderHook} from '@testing-library/react';

import {getWidgetById} from '@/entities/widget/model/providers/getWidgetById';

import {useWidget} from './useWidget';

let mockDispatch = jest.fn(action => action);
jest.mock('@/infra/providers/redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
}));
jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
}));
jest.mock('@/entities/widget/model/providers/getWidgetById', () => ({
  getWidgetById: jest.fn(() => ({type: 'getWidgetById'})),
}));
jest.mock('@/entities/widget/model/selectors', () => ({
  selectById: jest.fn(() => ({
    id: '2024',
    name: 'widget1',
    category: 'category1',
    subcategories: [],
    canDelete: true,
  })),
}));


describe('widgets/SubCategoriesSelector/hooks/useWidget', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('gets widget', () => {
    renderHook(() => useWidget('2024'));
    expect(mockDispatch).toHaveBeenCalledWith(getWidgetById('2024'));
  });
  it('returns category', () => {
    const {result} = renderHook(() => useWidget('2024'));
    expect(result.current.categoryId).toEqual('category1');
  })
});
