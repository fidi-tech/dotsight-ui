import {act, renderHook} from '@testing-library/react';

import {selectAll} from '@/entities/metric/model/selectors';
import {getMetricsByWidgetId} from '@/entities/metric/model/providers/getMetricsByWidgetId';
import {setMetricsByWidgetId} from '@/entities/metric/model/providers/setMetricsByWidgetId';

import {useMetrics} from './useMetrics';

let mockDispatch = jest.fn(action => action);
jest.mock('@/infra/providers/redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
}));
jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
}));
jest.mock('@/entities/metric/model/providers/getMetricsByWidgetId', () => ({
  getMetricsByWidgetId: jest.fn(() => ({type: 'getMetricsByWidgetId'})),
}));
jest.mock('@/entities/metric/model/providers/setMetricsByWidgetId', () => ({
  setMetricsByWidgetId: jest.fn(() => ({type: 'setMetricsByWidgetId'})),
}));
jest.mock('@/entities/metric/model/selectors', () => ({
  selectAll: jest.fn(() => ([{
    id: '2024',
    name: 'metric1',
  }])),
}));
jest.mock('@/entities/preset/model/selectors', () => ({
  selectAll: jest.fn(() => ([{
    id: 'p1',
    name: 'preset1',
  }])),
}));

describe('widgets/MetricSelector/hooks/useMetrics', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('gets metrics', () => {
    renderHook(() => useMetrics('2024'));
    expect(mockDispatch).toHaveBeenCalledWith(getMetricsByWidgetId('2024', ''));
  });
  it('provides metrics', () => {
    const {result} = renderHook(() => useMetrics('2024'));
    expect(result.current.metrics).toEqual([{
      id: '2024',
      name: 'metric1',
      isDisabled: true,
    }]);
  })
  describe('handles query successfully', () => {
    it('provides query', () => {
      const {result} = renderHook(() => useMetrics('2024'));
      expect(result.current.query).toEqual('');
    })
    it('provides setQuery function', () => {
      const {result} = renderHook(() => useMetrics('2024'));
      expect(result.current.setQuery).toEqual(expect.any(Function));
    })
    it('handles setQuery correctly', () => {
      const {result} = renderHook(() => useMetrics('2024'));
      act(() => {
        result.current.setQuery('c1');
      })
      expect(mockDispatch).toHaveBeenCalledWith(getMetricsByWidgetId('2024', 'c1'));
    })
  })
  it('provides onSelectMetric function', () => {
    const {result} = renderHook(() => useMetrics('2024'));
    expect(result.current.onSelectMetrics).toEqual(expect.any(Function));
  })
  it('handles onSelectMetric correctly', () => {
    (selectAll as jest.MockedFn<any>).mockReturnValue([
      {
        id: 'm1',
        name: 'metric1',
        isAvailable: true,
        isSelected: false,
      },
      {
        id: 'm2',
        name: 'metric2',
        isAvailable: true,
        isSelected: true,
      },
    ]);
    const {result} = renderHook(() => useMetrics('2024'));
    act(() => {
      result.current.onSelectMetrics('m2');
    })
    expect(setMetricsByWidgetId).toHaveBeenCalledTimes(1);
    expect(setMetricsByWidgetId).toHaveBeenCalledWith('2024', [], undefined, '');
  })
  it('provides presets', () => {
    const {result} = renderHook(() => useMetrics('2024'));
    expect(result.current.presets).toEqual([{
      id: 'p1',
      name: 'preset1',
    }]);
  });
  it('provides onSelectPreset function', () => {
    const {result} = renderHook(() => useMetrics('2024'));
    expect(result.current.onSelectPreset).toEqual(expect.any(Function));
  })
  it('handles onSelectPreset correctly', () => {
    (selectAll as jest.MockedFn<any>).mockReturnValue([
      {
        id: 'm1',
        name: 'metric1',
        isAvailable: true,
        isSelected: false,
      },
      {
        id: 'm2',
        name: 'metric2',
        isAvailable: true,
        isSelected: true,
      },
    ]);
    const {result} = renderHook(() => useMetrics('2024'));
    act(() => {
      result.current.onSelectPreset('p1');
    })
    expect(setMetricsByWidgetId).toHaveBeenCalledTimes(1);
    expect(setMetricsByWidgetId).toHaveBeenCalledWith('2024', undefined, 'p1', '');
  })
});