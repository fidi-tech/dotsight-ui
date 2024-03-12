import {renderHook} from '@testing-library/react';

import {selectById} from '@/entities/widget/model/selectors';
import {updateWidgetById} from '@/entities/widget/model/providers/updateWidgetById';

import {useWidget} from './useWidget';

let mockDispatch = jest.fn(action => action);
jest.mock('@/infra/providers/redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
}));
jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
}));
jest.mock('@/entities/widget/model/selectors', () => ({
  selectById: jest.fn(() => ({
    id: '1',
    name: 'widget1',
  })),
}));

jest.mock('@/entities/widget/model/providers/updateWidgetById', () => ({
  updateWidgetById: jest.fn(() => ({type: 'updateWidgetById'})),
}));

describe('widgets/WidgetConfigurator/components/Breadcrumbs/hooks/useWidget', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('selects widget', () => {
    renderHook(() => useWidget('2024'));
    expect(selectById).toHaveBeenCalledTimes(1);
    expect(selectById).toHaveBeenCalledWith(undefined, '2024');
  });
  it('returns name', () => {
    const {result} = renderHook(() => useWidget('2024'));
    expect(result.current.name).toEqual('widget1')
  });
  it('returns onSave callback', () => {
    const {result} = renderHook(() => useWidget('2024'));
    expect(result.current.onSaveName).toEqual(expect.any(Function));
    result.current.onSaveName('new');
    expect(updateWidgetById).toHaveBeenCalledTimes(1);
    expect(updateWidgetById).toHaveBeenCalledWith('2024', {name: 'new'});
  })
});
