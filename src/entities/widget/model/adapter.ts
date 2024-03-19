import {createEntityAdapter} from '@reduxjs/toolkit';

import {Widget} from './types';

export const widgetAdapter = createEntityAdapter<Widget>();
