import {selectById} from '@/entities/widget/model/selectors';
import {renderHook} from '@testing-library/react';

import {useViewType} from './useViewType';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
}));
jest.mock('@/entities/widget/model/selectors', () => ({
  selectById: jest.fn((id) => (
    {
      id: id,
      view: 'type',
    }
  ))
}));

describe('widgets/WidgetConfigurator/hooks/useViewType', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('selects viewType', () => {
    const {result} = renderHook(() => useViewType('2024'));
    expect(selectById).toHaveBeenCalledTimes(1);
    expect(selectById).toHaveBeenCalledWith(undefined, '2024');
    expect(result.current.viewType).toEqual('type');
  })
});
