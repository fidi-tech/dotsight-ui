import {Pipeline} from './types';

export const getPipelineName = (pipeline: Pipeline) => pipeline.name;
export const getPipelineWidgets = (pipeline: Pipeline) => pipeline.widgets;
export const getPipelineMappers = (pipeline: Pipeline) => pipeline.mappers;
export const getPipelineDataSources = (pipeline: Pipeline) => pipeline.dataSources;