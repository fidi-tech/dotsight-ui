import {renderHook} from '@testing-library/react';

import {getWidgetById} from '@/entities/widget/model/providers/getWidgetById';
import {selectById} from '@/entities/widget/model/selectors';

import {useWidget} from './useWidget';

let mockDispatch = jest.fn(action => action);

jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
}));

jest.mock('@/infra/providers/redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
}));
jest.mock('@/entities/widget/model/providers/getWidgetById', () => ({
  getWidgetById: jest.fn(() => ({type: 'getWidgetById'})),
}));
jest.mock('@/entities/widget/model/selectors', () => ({
  selectById: jest.fn(() => ({
    id: '1',
    name: 'widget1',
    category: 'category1',
    subcategories: [],
    canDelete: true,
  })),
}));

describe('app/widget/[id]/hooks/useWidget', () => {
  beforeEach(() => {
    (selectById as jest.MockedFn<any>).mockImplementation(() => ({
      id: '1',
      name: 'widget1',
      category: 'category1',
      subcategories: [],
      canDelete: true,
    }));
  })
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('gets widget', () => {
    renderHook(() => useWidget('1'));
    expect(mockDispatch).toHaveBeenCalledWith(getWidgetById('1'));
  })
  describe('returns correct step', () => {
    it('if view selected', () => {
      (selectById as jest.MockedFn<any>).mockImplementation(() => ({
        id: '1',
        name: 'widget1',
        category: 'category1',
        subcategories: [],
        canDelete: true,
        metrics: ['a'],
        view: 'b',
      }));
      const {result} = renderHook(() => useWidget('1'));
      expect(result.current.step).toEqual(2);
    })
    it('if metrics selected', () => {
      (selectById as jest.MockedFn<any>).mockImplementation(() => ({
        id: '1',
        name: 'widget1',
        category: 'category1',
        subcategories: [],
        canDelete: true,
        metrics: ['a'],
      }));
      const {result} = renderHook(() => useWidget('1'));
      expect(result.current.step).toEqual(1);
    })
    it('if nothing selected', () => {
      (selectById as jest.MockedFn<any>).mockImplementation(() => ({
        id: '1',
        name: 'widget1',
        category: 'category1',
        subcategories: [],
        canDelete: true,
      }));
      const {result} = renderHook(() => useWidget('1'));
      expect(result.current.step).toEqual(0);
    })
  })
});