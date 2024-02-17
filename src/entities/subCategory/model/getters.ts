import {SubCategory} from './types';

export const getSubCategoryId = (subCategory: SubCategory) => subCategory.id;
export const getSubCategoryIsSelected = (subCategory: SubCategory) => subCategory.isSelected;
export const getSubCategoryName = (subCategory: SubCategory) => subCategory.name;
export const getSubCategoryIcon = (subCategory: SubCategory) => subCategory.icon;