import {createEntityAdapter} from '@reduxjs/toolkit';
import {Pipeline} from './types';

export const pipelineAdapter = createEntityAdapter<Pipeline>();
