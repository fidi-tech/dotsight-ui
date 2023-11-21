import {renderHook} from '@testing-library/react';

import {
  fetchPipelineDataSourceSuggestions
} from '@/entities/dataSourceSuggestion/model/fetchPipelineDataSourceSuggestions';

import {useRefetchSuggestions} from './useRefetchSuggestions';

let mockDispatch = jest.fn(action => action);
jest.mock('@/infra/providers/redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
}));
jest.mock('@/entities/dataSourceSuggestion/model/fetchPipelineDataSourceSuggestions');

describe('features/dataSourceSelector useRefetchSuggestions', () => {
  it('dispatches fetchPipelineDataSourceSuggestions when pipelineId gets changed', () => {
    (fetchPipelineDataSourceSuggestions as jest.MockedFn<any>).mockImplementation(params => params);
    let pipelineId = '1';

    const {rerender} = renderHook(() => useRefetchSuggestions({pipelineId}));

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, fetchPipelineDataSourceSuggestions({pipelineId}));

    pipelineId = '2';
    rerender();

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenNthCalledWith(2, fetchPipelineDataSourceSuggestions({pipelineId}));
  });
});
