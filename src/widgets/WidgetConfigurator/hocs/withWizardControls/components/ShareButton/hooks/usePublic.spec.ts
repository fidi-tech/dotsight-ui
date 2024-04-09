import {act, renderHook} from '@testing-library/react';

import {selectById} from '@/entities/widget/model/selectors';
import {updateWidgetById} from '@/entities/widget/model/providers/updateWidgetById';

import {usePublic} from './usePublic';

let mockDispatch = jest.fn(action => action);
jest.mock('@/infra/providers/redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
}));
jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
}));
jest.mock('@/entities/widget/model/selectors');

jest.mock('@/entities/widget/model/providers/updateWidgetById', () => ({
  updateWidgetById: jest.fn(() => ({type: 'updateWidgetById'})),
}));

describe('widgets/WidgetConfigurator/hocs/withWizardControls/components/ShareButton/hooks/usePublic', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('selects widget', () => {
    (selectById as jest.MockedFn<any>).mockImplementation(() => ({
      id: '1',
      name: 'widget1',
      category: 'category1',
      subcategories: [],
      canDelete: true,
      isPublic: true,
    }));
    renderHook(() => usePublic('2024'));
    expect(selectById).toHaveBeenCalledWith(undefined, '2024');
  });

  describe('provides correct', () => {
    describe('public widget', () => {
      beforeEach(() => {
        (selectById as jest.MockedFn<any>).mockImplementation(() => ({
          id: '1',
          name: 'widget1',
          category: 'category1',
          subcategories: [],
          canDelete: true,
          isPublic: true,
        }));
      });
      it('label', () => {
        const {result} = renderHook(() => usePublic('2024'));
        expect(result.current.label).toEqual('Public');
      })
      it('isPublic', () => {
        const {result} = renderHook(() => usePublic('2024'));
        expect(result.current.isPublic).toEqual(true);
      })
    })
    describe('private widget', () => {
      beforeEach(() => {
        (selectById as jest.MockedFn<any>).mockImplementation(() => ({
          id: '1',
          name: 'widget1',
          category: 'category1',
          subcategories: [],
          canDelete: true,
          isPublic: false,
        }));
      });
      it('label', () => {
        const {result} = renderHook(() => usePublic('2024'));
        expect(result.current.label).toEqual('Private');
      })
      it('isPublic', () => {
        const {result} = renderHook(() => usePublic('2024'));
        expect(result.current.isPublic).toEqual(false);
      })
    })
  })
  describe('onChange function', () => {
    beforeEach(() => {
      (selectById as jest.MockedFn<any>).mockImplementation(() => ({
        id: '1',
        name: 'widget1',
        category: 'category1',
        subcategories: [],
        canDelete: true,
        isPublic: true,
      }));
    });
    it('provided', () => {
      const {result} = renderHook(() => usePublic('2024'));
      expect(result.current.onChange).toEqual(expect.any(Function));
    });
    it('updates widget', () => {
      const {result} = renderHook(() => usePublic('2024'));
      act(() => {
        result.current.onChange(false);
      });
      expect(updateWidgetById).toHaveBeenCalledTimes(1);
      expect(updateWidgetById).toHaveBeenCalledWith('2024', {isPublic: false});
    })
  })
});
