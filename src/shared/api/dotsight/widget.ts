import {api} from '@/shared/api/dotsight/base';
import {Widget, WidgetId, WidgetView} from '@/entities/widget/model';
import {SubCategoryId} from '@/entities/subCategory/model';
import {MetricId} from '@/entities/metric/model';
import {CategoryId} from '@/entities/category/model';

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
  return response.data.metrics;
}

export const setWidgetMetricsById = async (id: WidgetId, metrics: MetricId[], query: string): any => {
  const response = await api.put(
    `${BASE_URL}/${id}/metrics`,
    { metrics },
    { params: { query } },
  );
  return response.data;
}

export const fetchWidgetDataById = async (id: WidgetId): any => {
  const response = await api.get(`${BASE_URL}/${id}/data`);
  return response.data;
}

export const updateWidget = async (id: WidgetId, {name, view}: { name?: string, view?: WidgetView }): any => {
  const response = await api.patch(
    `${BASE_URL}/${id}`,
    {name, view}
  )
  return response.data.widget;
}
