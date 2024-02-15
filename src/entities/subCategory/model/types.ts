export type SubCategoryId = string;

export type SubCategory = {
  icon: string | null,
  id: SubCategoryId,
  isAvailable: boolean,
  isSelected: boolean,
  name: string,
}