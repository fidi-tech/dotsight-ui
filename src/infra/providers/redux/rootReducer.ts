import {reducer as pipeline} from '@/entities/pipeline/model';
import {reducer as mapperSuggestion} from '@/entities/mapperSuggestion/model';
import {reducer as dataSourceSuggestion} from '@/entities/dataSourceSuggestion/model';
import {reducer as pipelineExecutionParams} from '@/entities/pipelineExecutionParams/model';
import {reducer as category} from '@/entities/category/model';
import {reducer as subCategory} from '@/entities/subCategory/model';
import {reducer as metric} from '@/entities/metric/model';
import {reducer as widget} from '@/entities/widget/model';

export const reducer = {
  pipeline,
  mapperSuggestion,
  dataSourceSuggestion,
  pipelineExecutionParams,
  category,
  subCategory,
  metric,
  widget,
};
