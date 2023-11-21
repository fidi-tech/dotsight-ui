import {renderHook} from '@testing-library/react';

import {
  fetchWidgetMapperSuggestions
} from '@/entities/mapperSuggestion/model/fetchWidgetMapperSuggestions';

import {useRefetchSuggestions} from './useRefetchSuggestions';

let mockDispatch = jest.fn(action => action);
jest.mock('@/infra/providers/redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
}));
jest.mock('@/entities/mapperSuggestion/model/fetchWidgetMapperSuggestions');
jest.mock('@/entities/pipeline/model', () => ({
  selectById: jest.fn((s, id) => ({id})),
}));
jest.mock('@/entities/pipeline/model/getters', () => ({
  getPipelineWidgets: jest.fn(() => [{id: '101'}]),
}));
jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
}));

describe('features/mapperSelector useRefetchSuggestions', () => {
  it('dispatches fetchPipelineDataSourceSuggestions when pipelineId gets changed', () => {
    (fetchWidgetMapperSuggestions as jest.MockedFn<any>).mockImplementation(params => params);
    let pipelineId = '1';

    const {rerender} = renderHook(() => useRefetchSuggestions({pipelineId}));

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, fetchWidgetMapperSuggestions({pipelineId, widgetId: '101'}));

    pipelineId = '2';
    rerender();

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenNthCalledWith(2, fetchWidgetMapperSuggestions({pipelineId, widgetId: '101'}));
  });
});
