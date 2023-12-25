import {createEntityAdapter} from '@reduxjs/toolkit';

import {PipelineExecutionParams} from './types';

export const pipelineExecutionParamsAdapter = createEntityAdapter<PipelineExecutionParams>();
