import {reducer as pipeline} from '@/entities/pipeline/model';
import {reducer as mapperSuggestion} from '@/entities/mapperSuggestion/model';
import {reducer as dataSourceSuggestion} from '@/entities/dataSourceSuggestion/model';
import {reducer as pipelineExecutionParams} from '@/entities/pipelineExecutionParams/model';

export const reducer = {
  pipeline,
  mapperSuggestion,
  dataSourceSuggestion,
  pipelineExecutionParams,
};
