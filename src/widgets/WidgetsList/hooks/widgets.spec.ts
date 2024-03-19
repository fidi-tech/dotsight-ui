import {useRouter} from 'next/navigation';
import {renderHook} from '@testing-library/react';

import {getWidgets} from '@/entities/widget/model/providers/getWidgets';
import {deleteWidgetById} from '@/entities/widget/model/providers/deleteWidgetById';
import {selectAll} from '@/entities/widget/model/selectors';

import {useWidgets} from './widgets';

let mockDispatch = jest.fn(action => action);

jest.mock('@/infra/providers/redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
}));
jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
}));
jest.mock('@/entities/widget/model/selectors', () => ({
  selectAll: jest.fn(() => [
    {
      id: '1',
      name: 'widget1',
      category: 'category1',
      subcategories: [],
      canDelete: true,
    },
  ]),
}));
jest.mock('@/entities/widget/model/providers/getWidgets', () => ({
  getWidgets: jest.fn(() => ({type: 'getWidgets'})),
}));
jest.mock('@/entities/widget/model/providers/deleteWidgetById', () => ({
  deleteWidgetById: jest.fn(() => ({type: 'deleteWidgetById'})),
}));

jest.mock('next/navigation');

describe('widgets/WidgetsList/hooks/widgets', () => {
  const pushMock = jest.fn();
  (useRouter as jest.MockedFn<any>).mockReturnValue({
    push: pushMock,
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('useWidgets', () => {
    it('dispatching getWidgets', () => {
      renderHook(() => useWidgets());
      expect(mockDispatch).toHaveBeenCalledWith(getWidgets());
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    })
    it('selects all widgets', () => {
      const {result} = renderHook(() => useWidgets());
      expect(selectAll).toHaveBeenCalledTimes(1);
      expect(result.current.widgets).toEqual([
        {
          id: '1',
          name: 'widget1',
          category: 'category1',
          subcategories: [],
          canDelete: true,
        },
      ]);
    })
    it('provides goToWidget callback', () => {
      const {result} = renderHook(() => useWidgets());
      expect(result.current.goToWidget).toEqual(expect.any(Function));
      result.current.goToWidget('2024');
      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith('/widget/2024');
    })
    it('provides deleteWidget callback', () => {
      const {result} = renderHook(() => useWidgets());
      expect(result.current.deleteWidget).toEqual(expect.any(Function));
      result.current.deleteWidget('2024');
      expect(deleteWidgetById).toHaveBeenCalledTimes(1);
      expect(deleteWidgetById).toHaveBeenCalledWith('2024');
    })
  })
});
