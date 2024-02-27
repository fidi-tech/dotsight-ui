import {api} from '@/shared/api/dotsight/base';
import {Widget, WidgetId} from '@/entities/widget/model';
import {SubCategoryId} from '@/entities/subCategory/model';
import {MetricId} from '@/entities/metric/model';
import {CategoryId} from '@/entities/category/model';
import {PresetId} from '@/entities/preset/model';
import {UnitId} from '@/entities/unit/model';
import {MetricValue} from '@/entities/MetricValue/model';
import {WidgetType} from '@/features/widgetViews/ui/constants';

const BASE_URL = '/widgets';

export const createWidget = async ({category, name}: {category?: CategoryId, name?: string}): Promise<Widget> => {
  const response = await api.post(BASE_URL, {
    category,
    name,
  });
  return response.data.widget;
}

export const fetchWidgets = async (): Promise<any[]> => {
  const response = await api.get(BASE_URL);
  return response.data.widgets;
}

export const fetchWidgetById = async (id: WidgetId): any => {
  const response = await api.get(`${BASE_URL}/${id}`);
  return response.data.widget;
}

export const fetchWidgetSubcategoriesById = async (id: WidgetId, query?: string): any => {
  const response = await api.get(`${BASE_URL}/${id}/subcategories`, { params: { query } });
  return response.data.subcategories;
}

export const setWidgetSubcategoriesById = async (id: WidgetId, subcategories: SubCategoryId[], query: string): any => {
  const response = await api.put(
    `${BASE_URL}/${id}/subcategories`,
    { subcategories },
    { params: { query } },
  );
  return response.data;
}

export const fetchWidgetMetricsById = async (id: WidgetId, query?: string): any => {
  const response = await api.get(`${BASE_URL}/${id}/metrics`, { params: { query } });
  return response.data;
}

export const setWidgetMetricsById = async (id: WidgetId, metrics?: MetricId[], preset?: PresetId, query?: string): any => {
  const response = await api.put(
    `${BASE_URL}/${id}/metrics`,
    { metrics, preset },
    { params: { query } },
  );
  return response.data;
}

export type CopyrightsRaw = Record<SubCategoryId, Record<string, {id: string, name: string, icon?: string}>>
export type RawWidgetData = {
  items: Record<SubCategoryId, {id: SubCategoryId, name: string, icon?: string}>,
  metrics: Record<MetricId, {id: MetricId, name: string, icon?: string}>,
  units: Record<UnitId, {id: UnitId, name: string, icon?: string, symbol: string}>,
  data: {
    items: SubCategoryId[],
    metrics: MetricId[],
    values: Record<
      SubCategoryId,
      Record<
        MetricId,
        {timestamp: number, value: MetricValue}[]
      >
    >,
    copyrights: CopyrightsRaw,
  },
};
export const fetchWidgetDataById = async (id: WidgetId): Promise<RawWidgetData> => {
  const response = await api.get(`${BASE_URL}/${id}/data`);
  const data = JSON.parse(JSON.stringify(response.data.data));
  const subCategoriesIds = Object.keys(data.data.values);
  subCategoriesIds.forEach(subcategoryId => {
    const metricsIds = Object.keys(data.data.values[subcategoryId]);
    metricsIds.forEach(metricId => {

      data.data.values[subcategoryId][metricId] = data.data.values[subcategoryId][metricId].map(({timestamp, value}: {timestamp: number, value: number | Record<UnitId, number>}) => ({
        timestamp,
        value: new MetricValue(value)
      }));
    })
  })
  return data;
}

export const updateWidget = async (id: WidgetId, {name, view}: { name?: string, view?: WidgetType }): any => {
  const response = await api.patch(
    `${BASE_URL}/${id}`,
    {name, view}
  )
  return response.data.widget;
}

export const deleteWidget = async (id: WidgetId): any => api.delete(`${BASE_URL}/${id}`);
