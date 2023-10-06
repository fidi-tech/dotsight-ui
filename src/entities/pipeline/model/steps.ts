import {Pipeline} from '@/entities/pipeline/model/types';
import {
  getPipelineDataSources,
  getPipelineMappers,
  getPipelineWidgets,
} from '@/entities/pipeline/model/getters';
import WidgetTypeSelector from '@/features/widgetTypeSelector/ui';
import MapperSelector from '@/features/mapperSelector/ui';
import DataSourceSelector from '@/features/dataSourceSelector/ui';
import PipelineSave from '@/features/pipelineSave/ui/index';

export const STEPS = {
  TYPE: 'TYPE',
  MAPPERS: 'MAPPERS',
  DATA_SOURCES: 'DATA_SOURCES',
  SAVE: 'SAVE',
} as const;

export const STEP_NAMES = {
  [STEPS.TYPE]: 'Widget type',
  [STEPS.MAPPERS]: 'Mapper',
  [STEPS.DATA_SOURCES]: 'Data source',
  [STEPS.SAVE]: 'Code',
} as const;

export const STEP_BUTTONS = {
  [STEPS.TYPE]: 'Next',
  [STEPS.MAPPERS]: 'Next',
  [STEPS.DATA_SOURCES]: 'Next',
  [STEPS.SAVE]: 'Save',
} as const;

export const STEPS_ORDER = [
  STEPS.TYPE,
  STEPS.MAPPERS,
  STEPS.DATA_SOURCES,
  STEPS.SAVE,
] as const;

export const STEP_WIDGETS = {
  [STEPS.TYPE]: WidgetTypeSelector,
  [STEPS.MAPPERS]: MapperSelector,
  [STEPS.DATA_SOURCES]: DataSourceSelector,
  [STEPS.SAVE]: PipelineSave,
} as const;

export const getInitialStep = (pipeline: Pipeline) => {
  if (getPipelineDataSources(pipeline).length > 0) {
    return STEPS.SAVE;
  }
  if (Object.values(getPipelineMappers(pipeline)).length > 0) {
    return STEPS.DATA_SOURCES;
  }
  if (getPipelineWidgets(pipeline).length > 0) {
    return STEPS.MAPPERS;
  }
  return STEPS.TYPE;
};

export const isPipelineCompleted = (pipeline: Pipeline) => getInitialStep(pipeline) === STEPS.SAVE;
