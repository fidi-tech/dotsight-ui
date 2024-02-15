import {createEntityAdapter} from '@reduxjs/toolkit';

import {Category} from './types';

export const categoryAdapter = createEntityAdapter<Category>();
