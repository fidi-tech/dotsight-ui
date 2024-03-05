import {SubCategoryId} from '@/entities/subCategory/model';
import {MetricId} from '@/entities/metric/model';
import {WidgetType} from '@/features/widgetViews/ui/constants';
import {CategoryId} from '@/entities/category/model';

export type WidgetId = string;

export type Widget = {
  id: WidgetId,
  name: string,
  category: CategoryId,
  subcategories: SubCategoryId[],
  metrics?: MetricId[],
  preset?: string,
  view?: WidgetType,
  canDelete: boolean,
}
