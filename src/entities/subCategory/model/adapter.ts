import {createEntityAdapter} from '@reduxjs/toolkit';

import {SubCategory} from './types';

export const subCategoryAdapter = createEntityAdapter<SubCategory>();
