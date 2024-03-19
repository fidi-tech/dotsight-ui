import {createEntityAdapter} from '@reduxjs/toolkit';

import {Preset} from './types';

export const presetAdapter = createEntityAdapter<Preset>();
