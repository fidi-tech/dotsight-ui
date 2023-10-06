import type {AxiosPromise} from 'axios';

import {api} from '@/shared/api/dotsight/base';
import {WidgetId} from '@/entities/widget/model/types';

import type {Pipeline, PipelineId, MapperId, ExecuteResult} from './models';

const BASE_URL = '/pipelines';

export const getPipelinesList = (): AxiosPromise<Pipeline[]> =>
  api.get(BASE_URL);

export const getPipelineById = ({id}: {id: PipelineId}): AxiosPromise<Pipeline> =>
  api.get(`${BASE_URL}/${id}`)

export const createPipeline = ({name}: {name?: string}): AxiosPromise<Pipeline> =>
  api.post(BASE_URL, {name})

export const addWidgetToPipeline = (
  {
    id,
    type,
    config,
    datashape,
  }: {
    id: PipelineId,
    type: string,
    config: any,
    datashape: string,
  }
): AxiosPromise<Pipeline> =>
  api.post(`${BASE_URL}/${id}/widgets`, {
    type,
    config,
    datashape
  })

export const updatePipelineName = ({id, name}: {id: PipelineId, name: string}): AxiosPromise<any> =>
  api.patch(`${BASE_URL}/${id}`, {
    name
  });

export const getWidgetMapperSuggestions = (
  {
    id,
    widgetId,
  }: {
    id: PipelineId,
    widgetId: WidgetId,
  }
): AxiosPromise<any> =>
  api.get(`${BASE_URL}/${id}/widgets/${widgetId}/suggestions/mappers`);

export const setPipelineWidgetMapper = (
  {
    pipelineId,
    widgetId,
    code,
    type,
    config
  }: {
    pipelineId: PipelineId,
    widgetId: WidgetId,
    code: string,
    type: string,
    config: object,
  }
): AxiosPromise<any> =>
  api.post(`${BASE_URL}/${pipelineId}/widgets/${widgetId}/mappers`, {
    code,
    type,
    config
  });

export const getPipelineDataSourceSuggestions = (
  {
    id
  }: {
    id: PipelineId
  }
): AxiosPromise<any> =>
  api.get(`${BASE_URL}/${id}/suggestions/data-sources`);

export const setPipelineDataSource = (
  {
    pipelineId,
    type,
    config,
  }: {
    pipelineId: PipelineId,
    type: string,
    config: object,
  }
) => api.post(`${BASE_URL}/${pipelineId}/data-sources`, {
  type,
  config,
});

export const executePipeline = (
  {
    pipelineId,
    widgetIds,
    params,
  }: {
    pipelineId: PipelineId,
    widgetIds: WidgetId[],
    params: Record<string, any>,
  }
) => api.get(`${BASE_URL}/${pipelineId}/execute`, {
  params: {
    ...params,
    widgetIds,
  },
});

export const getPipelineOutput = (
  pipelineId: PipelineId,
  mapperIds: MapperId[],
  params: Record<string, any>,
): AxiosPromise<ExecuteResult> =>
  api.get(`${BASE_URL}/${pipelineId}/execute`, {
    params: {
      ...params,
      mapperIds,
    },
  });
