import {isAxiosError} from 'axios';

import {api} from '@/shared/api/dotsight/base';
import {WidgetId} from '@/entities/widget/model/types';
import {PipelineExecutionParamsRaw} from '@/entities/pipelineExecutionParams/model/types';

import type {Pipeline, PipelineId, MapperId, ExecuteResult} from './models';

const BASE_URL = '/pipelines';

export const getPipelinesList = async (): Promise<Pipeline[]> => {
  const response = await api.get(BASE_URL);
  return response.data;
}

export const getPipelineById = async ({id}: {id: PipelineId}): Promise<Pipeline | null> => {
  try {
    const response = await api.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status && [401, 403].includes(error.response?.status)) {
      return null;
    }
    throw error;
  }
};

export const getPipelineParams = async (
  {id, mapperCode}: {id: PipelineId, mapperCode: MapperId}
): Promise<PipelineExecutionParamsRaw> => {
  const response = await api.get(`${BASE_URL}/${id}/mappers/${mapperCode}/params`);
  return response.data;
}

export const createPipeline = async ({name}: {name?: string}): Promise<Pipeline> => {
  const response = await api.post(BASE_URL, {name});
  return response.data;
};

export const addWidgetToPipeline = async (
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
): Promise<Pipeline> => {
  const response = await api.post(`${BASE_URL}/${id}/widgets`, {
    type,
    config,
    datashape
  });
  return response.data;
};

export const updatePipeline = async ({id, name, isPublic}: {id: PipelineId, name: string, isPublic: boolean}): Promise<any> => {
  const response = await api.patch(`${BASE_URL}/${id}`, {
    name,
    isPublic,
  });
  return response.data;
};

export const getWidgetMapperSuggestions = async (
  {
    id,
    widgetId,
  }: {
    id: PipelineId,
    widgetId: WidgetId,
  }
): Promise<any> => {
  const response = await api.get(`${BASE_URL}/${id}/widgets/${widgetId}/suggestions/mappers`);
  return response.data;
};

export const setPipelineWidgetMapper = async (
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
): Promise<Pipeline> => {
  const response = await api.post(`${BASE_URL}/${pipelineId}/widgets/${widgetId}/mappers`, {
    code,
    type,
    config
  });
  return response.data;
};

export const getPipelineDataSourceSuggestions = async (
  {
    id
  }: {
    id: PipelineId
  }
): Promise<any> => {
  const response = await api.get(`${BASE_URL}/${id}/suggestions/data-sources`);
  return response.data;
}

export const setPipelineDataSource = async (
  {
    pipelineId,
    type,
    config,
  }: {
    pipelineId: PipelineId,
    type: string,
    config: object,
  }
): Promise<Pipeline> => {
  const response = await api.post(`${BASE_URL}/${pipelineId}/data-sources`, {
    type,
    config,
  });
  return response.data;
}

export const executePipeline = async (
  {
    pipelineId,
    widgetIds,
    params,
  }: {
    pipelineId: PipelineId,
    widgetIds: WidgetId[],
    params: Record<string, any>,
  }
): Promise<any> => {
  const response = await api.get(`${BASE_URL}/${pipelineId}/execute`, {
    params: {
      ...params,
      widgetIds,
    },
  });
  return response.data;
}

export const getPipelineOutput = async (
  pipelineId: PipelineId,
  mapperIds: MapperId[],
  params: Record<string, any>,
): Promise<ExecuteResult> => {
  const response = await api.get(`${BASE_URL}/${pipelineId}/execute`, {
    params: {
      ...params,
      mapperIds,
    },
  });
  return response.data;
};
