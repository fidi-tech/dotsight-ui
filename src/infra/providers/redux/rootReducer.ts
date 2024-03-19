import {reducer as category} from '@/entities/category/model';
import {reducer as subCategory} from '@/entities/subCategory/model';
import {reducer as metric} from '@/entities/metric/model';
import {reducer as preset} from '@/entities/preset/model';
import {reducer as widget} from '@/entities/widget/model';

export const reducer = {
  category,
  subCategory,
  metric,
  preset,
  widget,
};
