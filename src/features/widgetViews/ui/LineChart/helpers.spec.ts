import {CategoryId} from '@/entities/category/model';

import {getUnavailabilityReason} from './helpers';

describe('features/widgetViews/ui/LineChart/helpers', () => {
  describe('getUnavailabilityReason', () => {
    it('returns undefined if can be applied', () => {
      expect(getUnavailabilityReason({
        id: 'w1',
        name: 'wn1',
        category: CategoryId.network,
        subcategories: ['sc1'],
        metrics: ['m1'],
        canDelete: false,
        canModify: true,
        canExecute: true,
        isPublic: true,
      })).toBeUndefined();
    });
    describe('returns restriction message', () => {
      it('if more than 1 metric', () => {
        expect(getUnavailabilityReason({
          id: 'w1',
          name: 'wn1',
          category: CategoryId.network,
          subcategories: ['sc1'],
          metrics: ['m1', 'm2'],
          canDelete: false,
          canModify: true,
          canExecute: true,
          isPublic: true,
        })).toEqual('Only one metric can be selected');
      })
      it('if preset selected', () => {
        expect(getUnavailabilityReason({
          id: 'w1',
          name: 'wn1',
          category: CategoryId.network,
          subcategories: ['sc1'],
          preset: 'p1',
          canDelete: false,
          canModify: true,
          canExecute: true,
          isPublic: true,
        })).toEqual('Does not work with presets');
      })
    })
  })
})