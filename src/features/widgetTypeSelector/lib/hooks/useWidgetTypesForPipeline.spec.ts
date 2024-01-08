import {selectDefaultWidgetType, selectCanModify} from '@/entities/pipeline/model';
import {act, renderHook} from '@testing-library/react';
import {useWidgetTypesForPipeline} from './useWidgetTypesForPipeline';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
}));
jest.mock('@/entities/pipeline/model');
jest.mock('@/features/widget/ui', () => ({
  __esModule: true,
  default: {
    w1: {
      type: 't1',
      title: 'l1',
    },
    w2: {
      type: 't2',
      title: 'l2',
    },
  },
}))

describe('features/widgetTypeSelector useWidgetTypesForPipeline', () => {
  beforeEach(() => {
    (selectDefaultWidgetType as any as jest.MockedFn<any>).mockImplementation(() => '42');
  });

  it('should return pipelineWidgetType as selectedType', () => {
    const {result: {current: {
      selectedType,
    }}} = renderHook(() => useWidgetTypesForPipeline({pipelineId: '1'}));

    expect(selectedType).toEqual('42');
  });

  it('changes selectedType when onOptionSelect is called', () => {
    const {result} = renderHook(() => useWidgetTypesForPipeline({pipelineId: '1'}));

    expect(result.current.selectedType).toEqual('42');

    act(() => {
      result.current.onOptionSelect({label: 'any', value: '43'});
    });

    expect(result.current.selectedType).toEqual('43');
  });

  it('should return typeOptions', () => {
    const {result: {current: {
      typeOptions,
    }}} = renderHook(() => useWidgetTypesForPipeline({pipelineId: '1'}));

    expect(typeOptions).toEqual([
      {value: 't1', label: 'l1'},
      {value: 't2', label: 'l2'},
    ]);
  });

  it('should been disabled when type is already defined for pipeline', () => {
    const {result: {current: {
      isDisabled,
    }}} = renderHook(() => useWidgetTypesForPipeline({pipelineId: '1'}));
    expect(isDisabled).toBeTruthy();
  });

  it('should not been disabled when type is not defined for pipeline', () => {
    (selectDefaultWidgetType as any as jest.MockedFn<any>).mockImplementation(() => undefined);
    (selectCanModify as any as jest.MockedFn<any>).mockImplementation(() => true);
    const {result: {current: {
      isDisabled,
    }}} = renderHook(() => useWidgetTypesForPipeline({pipelineId: '1'}));
    expect(isDisabled).toBeFalsy();
  });
});
