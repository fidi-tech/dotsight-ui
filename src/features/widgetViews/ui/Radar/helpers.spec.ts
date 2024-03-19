import {CategoryId} from '@/entities/category/model';

import {getUnavailabilityReason} from './helpers';

describe('features/widgetViews/ui/Radar/helpers', () => {
  describe('getUnavailabilityReason', () => {
    it('returns undefined if can be applied', () => {
      expect(getUnavailabilityReason({
        id: 'w1',
        name: 'wn1',
        category: CategoryId.network,
        subcategories: ['sc1', 'sc2', 'sc3'],
        canDelete: false,
      })).toBeUndefined();
    });
    describe('returns restriction message', () => {
      it('if less than 3 metrics', () => {
        expect(getUnavailabilityReason({
          id: 'w1',
          name: 'wn1',
          category: CategoryId.network,
          subcategories: ['sc1', 'sc2'],
          metrics: ['m1', 'm2'],
          canDelete: false,
        })).toEqual('Unavailable with less than 3 metrics selected');
      })
      it('if one subcategory selected', () => {
        expect(getUnavailabilityReason({
          id: 'w1',
          name: 'wn1',
          category: CategoryId.network,
          subcategories: ['sc1'],
          preset: 'p1',
          canDelete: false,
        })).toEqual('Unavailable with one subCategory selected');
      })
      it('if preset selected', () => {
        expect(getUnavailabilityReason({
          id: 'w1',
          name: 'wn1',
          category: CategoryId.network,
          subcategories: ['sc1', 'sc2'],
          preset: 'p1',
          canDelete: false,
        })).toEqual('Does not work with presets');
      })
    })
  })
})