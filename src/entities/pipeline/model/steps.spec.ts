import {getInitialStep, STEPS} from '@/entities/pipeline/model/steps';
import {
  getPipelineDataSources,
  getPipelineMappers,
  getPipelineWidgets,
} from '@/entities/pipeline/model/getters';

jest.mock('@/entities/pipeline/model/getters');
jest.mock('@/features/widgetTypeSelector/ui', () => ({
  __esModule: true,
  default: () => {},
}));
jest.mock('@/features/mapperSelector/ui', () => ({
  __esModule: true,
  default: () => {},
}));
jest.mock('@/features/dataSourceSelector/ui', () => ({
  __esModule: true,
  default: () => {},
}));
jest.mock('@/features/pipelineSave/ui/index', () => ({
  __esModule: true,
  default: () => {},
}));

describe('getInitialStep', () => {
  it('should return SAVE if data source is selected', () => {
    (getPipelineDataSources as  jest.MockedFn<any>).mockImplementation(() => [1, 2, 3]);
    expect(getInitialStep({} as any)).toEqual(STEPS.SAVE);
  });

  it('should return DATA_SOURCES if data source is not selected, but mappers are', () => {
    (getPipelineDataSources as jest.MockedFn<any>).mockImplementation(() => []);
    (getPipelineMappers as jest.MockedFn<any>).mockImplementation(() => ({some: 'mapper', other: 'mapper'}));
    expect(getInitialStep({} as any)).toEqual(STEPS.DATA_SOURCES);
  });

  it('should return MAPPERS if only widget is selected', () => {
    (getPipelineDataSources as jest.MockedFn<any>).mockImplementation(() => []);
    (getPipelineMappers as jest.MockedFn<any>).mockImplementation(() => ({}));
    (getPipelineWidgets as jest.MockedFn<any>).mockImplementation(() => [3, 2, 1]);
    expect(getInitialStep({} as any)).toEqual(STEPS.MAPPERS);
  });

  it('should return TYPE if widget is not selected', () => {
    (getPipelineDataSources as jest.MockedFn<any>).mockImplementation(() => []);
    (getPipelineMappers as jest.MockedFn<any>).mockImplementation(() => ({}));
    (getPipelineWidgets as jest.MockedFn<any>).mockImplementation(() => []);
    expect(getInitialStep({} as any)).toEqual(STEPS.TYPE);
  });
});
