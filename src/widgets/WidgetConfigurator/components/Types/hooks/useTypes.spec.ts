import {act, renderHook} from '@testing-library/react';

import {getWidgetById} from '@/entities/widget/model/providers/getWidgetById';
import widgetViews from '@/features/widgetViews/ui';
import {selectById} from '@/entities/widget/model/selectors';
import {updateWidgetById} from '@/entities/widget/model/providers/updateWidgetById';
import {WidgetType} from '@/features/widgetViews/ui/constants';

import * as module from './useTypes';

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

jest.mock('@/entities/widget/model/providers/updateWidgetById', () => ({
  updateWidgetById: jest.fn(() => ({type: 'updateWidgetById'})),
}));

jest.mock('@/features/widgetViews/ui', () => ({
  w1: {
    title: 'widget1',
    type: 'w1',
    getUnavailabilityReason: () => 'unavailable',
  },
  w2: {
    title: 'widget2',
    type: 'w2',
  },
  w3: {
    title: 'widget3',
    type: 'w3',
  },
}));


describe('widgets/WidgetConfigurator/components/Types/hooks/useWidget', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('gets widget', () => {
    renderHook(() => module.useTypes('2024'));
    expect(mockDispatch).toHaveBeenCalledWith(getWidgetById('2024'));
  });
  describe('composes types', () => {
    it('by default', () => {
      const {result} = renderHook(() => module.useTypes('2024'));
      expect(result.current.types.map(type => type.id))
        .toEqual(Object.values(widgetViews).map(t => t.type))
    })
    it('with query', () => {
      const {result} = renderHook(() => module.useTypes('2024'));
      act(() => {
        result.current.setQuery('t3');
      })
      expect(result.current.query).toEqual('t3');
      expect(result.current.types.map(type => type.id)).toEqual(['w2', 'w3']);
    })
    it('handles unavailable', () => {
      const {result} = renderHook(() => module.useTypes('2024'));
      const expectedUnavailable = result.current.types.find(
        t => t.id === 'w1' as WidgetType
      );
      expect(expectedUnavailable?.unavailabilityReason).toEqual('unavailable');
      expect(expectedUnavailable?.isDisabled).toBeTruthy();
      expect(expectedUnavailable?.isSelected).toBeFalsy();
    });
    it('handles selection', () => {
      const {result} = renderHook(() => module.useTypes('2024'));
      expect(result.current.types.find(type => type.isSelected)?.id).toEqual('w2');
      updateWidgetById.mockClear();
      act(() => {
        (selectById as jest.MockedFn<any>).mockReturnValue({
          id: '2024',
          name: 'widget1',
          category: 'category1',
          view: 'w3',
          subcategories: [],
          canDelete: true,
        });
        result.current.onSelect('w3');
      })
      expect(result.current.types.find(type => type.isSelected)?.id).toEqual('w3');
      expect(updateWidgetById).toHaveBeenCalledTimes(1);
      expect(updateWidgetById).toHaveBeenCalledWith('2024', {view: 'w3'});
    })
  })
});
