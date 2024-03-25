import {useRouter} from 'next/navigation';
import {renderHook, waitFor} from '@testing-library/react';

import {fetchWidgets} from '@/shared/api/dotsight';
import {deleteWidgetById} from '@/entities/widget/model/providers/deleteWidgetById';
import {updateAll} from '@/entities/widget/model/actions';
import {selectAll} from '@/entities/widget/model/selectors';

import {useWidgets} from './widgets';

let mockDispatch = jest.fn(action => action);

jest.mock('@/infra/providers/redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
}));
jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
}));
const WIDGETS = [
  {
    id: '1',
    name: 'widget1',
    category: 'category1',
    subcategories: [],
    canDelete: false,
  },
];
jest.mock('@/entities/widget/model/selectors', () => ({
  selectAll: jest.fn(() => WIDGETS),
}));
jest.mock('@/shared/api/dotsight', () => ({
  fetchWidgets: jest.fn(() => Promise.resolve(WIDGETS))
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
    it('fetching widgets', async () => {
      const {result} = renderHook(() => useWidgets());
      expect(result.current.isLoading).toBeTruthy();
      await waitFor(() => {
        expect(fetchWidgets).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith(updateAll(WIDGETS));
        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(result.current.isLoading).toBeFalsy();
        expect(result.current.widgets).toEqual(WIDGETS)
      })
    })
    it('selects all widgets', async () => {
      const {result} = renderHook(() => useWidgets());
      await waitFor(() => {
        expect(selectAll).toHaveBeenCalledTimes(2);
        expect(result.current.widgets).toEqual(WIDGETS);
      });
    })
    it('provides goToWidget callback', async () => {
      const {result} = renderHook(() => useWidgets());
      await waitFor(() => {
        expect(result.current.goToWidget).toEqual(expect.any(Function));
        result.current.goToWidget('2024');
        expect(pushMock).toHaveBeenCalledTimes(1);
        expect(pushMock).toHaveBeenCalledWith('/widget/2024');
      })
    })
    it('provides deleteWidget callback', async () => {
      const {result} = renderHook(() => useWidgets());
      await waitFor(() => {
        expect(result.current.deleteWidget).toEqual(expect.any(Function));
        result.current.deleteWidget('2024');
        expect(deleteWidgetById).toHaveBeenCalledTimes(1);
        expect(deleteWidgetById).toHaveBeenCalledWith('2024');
      });
    })
  })
});
