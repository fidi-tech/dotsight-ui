import palettes from './palettes.module.scss';

export enum PaletteVariant {
  v1 = 'v1',
  v2 = 'v2',
  v3 = 'v3',
}

export const getColorsFromPaletteByVariant = (variant: PaletteVariant = PaletteVariant.v1) => {
  const rawPalette = palettes[variant] || palettes[PaletteVariant.v1];
  return JSON.parse(rawPalette);
}

