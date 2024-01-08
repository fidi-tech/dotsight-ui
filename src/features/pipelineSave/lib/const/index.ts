export const VISIBILITY = {
  PUBLIC: 'Public',
  PRIVATE: 'Private'
} as const;
export type Visibility = typeof VISIBILITY[keyof typeof VISIBILITY];
