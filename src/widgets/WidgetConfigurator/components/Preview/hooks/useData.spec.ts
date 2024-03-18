import {renderHook, waitFor} from '@testing-library/react';

import {fetchWidgetDataById} from '@/shared/api/dotsight';

import {useData} from './useData';

jest.mock('@/shared/api/dotsight');

describe('widgets/WidgetConfigurator/components/Preview/hooks/useData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('fetches data', async () => {
    (fetchWidgetDataById as any as jest.MockedFn<any>).mockImplementation(() => Promise.resolve({
      some: 'data',
    }));
    const {result} = renderHook(() => useData('2024'));
    expect(fetchWidgetDataById).toHaveBeenCalledWith('2024');
    expect(fetchWidgetDataById).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(result.current).toEqual({
        isLoading: false,
        data: {some: 'data'},
        isError: false,
      });
    });
  });
  it('returns isError of request fails', async () => {
    (fetchWidgetDataById as any as jest.MockedFn<any>).mockImplementation(() => Promise.reject());
    const {result} = renderHook(() => useData('2024'));
    expect(fetchWidgetDataById).toHaveBeenCalledWith('2024');
    expect(fetchWidgetDataById).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(result.current).toEqual({
        isLoading: false,
        data: undefined,
        isError: true,
      });
    });
  })
});
