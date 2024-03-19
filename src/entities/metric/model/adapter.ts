import {createEntityAdapter} from '@reduxjs/toolkit';

import {Metric} from './types';

export const metricAdapter = createEntityAdapter<Metric>();
