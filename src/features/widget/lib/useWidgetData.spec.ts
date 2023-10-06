import {renderHook, waitFor} from '@testing-library/react';
import {useWidgetData} from './useWidgetData';
import {executePipeline} from '@/shared/api/dotsight';

jest.mock('@/shared/api/dotsight');

describe('features/widget useWidgetData', () => {
  beforeEach(() => {
    (executePipeline as jest.MockedFn<any>).mockClear();
  })

  it('should start loading immediately', () => {
    (executePipeline as jest.MockedFn<any>).mockImplementation(async () => {
      return {
        data: {
          wid: {some: 'data'},
        },
      };
    });

    const params = {some: 'params'};
    const {result} = renderHook(() => useWidgetData({
      pipelineId: 'pid',
      widgetId: 'wid',
      params,
    }));

    expect(result.current).toEqual({
      isLoading: true,
      data: null,
      error: null,
    });
    expect(executePipeline).toHaveBeenCalledTimes(1);
    expect(executePipeline).toHaveBeenCalledWith({
      pipelineId: 'pid',
      widgetIds: ['wid'],
      params,
    });
  });

  it('should return the data once backend returns it', async () => {
    (executePipeline as jest.MockedFn<any>).mockResolvedValue({
      data: {
        wid: {some: 'data'},
      },
    });

    const params = {some: 'params'};
    const {result} = renderHook(() => useWidgetData({
      pipelineId: 'pid',
      widgetId: 'wid',
      params,
    }));

    await waitFor(() => {
      expect(result.current).toEqual({
        isLoading: false,
        data: {some: 'data'},
        error: null,
      });
    });
  });

  it('should return error if error happened', async () => {
    (executePipeline as jest.MockedFn<any>).mockRejectedValue('error');

    const params = {some: 'params'};
    const {result} = renderHook(() => useWidgetData({
      pipelineId: 'pid',
      widgetId: 'wid',
      params,
    }));

    await waitFor(() => {
      expect(result.current).toEqual({
        isLoading: false,
        data: null,
        error: 'error',
      });
    });
  });

  it('should refetch the data if params changed', async () => {
    (executePipeline as jest.MockedFn<any>)
      .mockResolvedValueOnce({
        data: {
          wid: {some: 'data'},
        },
      })
      .mockResolvedValueOnce({
        data: {
          wid: {other: 'data'},
        },
      });

    let params: object = {some: 'params'};
    const {result, rerender} = renderHook(() => useWidgetData({
      pipelineId: 'pid',
      widgetId: 'wid',
      params,
    }));
    await waitFor(() => {
      expect(result.current).toEqual({
        isLoading: false,
        data: {some: 'data'},
        error: null,
      });
    });

    params = {other: 'params'};
    rerender();
    await waitFor(() => {
      expect(result.current).toEqual({
        isLoading: true,
        data: {some: 'data'},
        error: null,
      });
    });
    await waitFor(() => {
      expect(result.current).toEqual({
        isLoading: false,
        data: {other: 'data'},
        error: null,
      });
    });

    expect(executePipeline).toHaveBeenCalledTimes(2);
    expect(executePipeline).toHaveBeenCalledWith({
      pipelineId: 'pid',
      widgetIds: ['wid'],
      params,
    });
  });
});
