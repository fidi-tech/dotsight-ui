import {getColorsFromPaletteByVariant, PaletteVariant} from '@/shared/ui/styles/palettes';

const palette = getColorsFromPaletteByVariant(PaletteVariant.v1);

const LABELS = [
  '10:00',
  '11:00',
  '12:00',
  '13:00',
];

const DATASETS = [
  {
    label: 'First',
    data: [
      {x: '10:00', y: 10},
      {x: '11:00', y: 20},
      {x: '12:00', y: 15},
      {x: '13:00', y: 5},
    ],
    borderColor: palette[0],
    backgroundColor: palette[0],
  },
  {
    label: 'Second',
    data: [
      {x: '10:00', y: 25},
      {x: '11:00', y: 10},
      {x: '12:00', y: 15},
      {x: '13:00', y: 30},
    ],
    borderColor: palette[0],
    backgroundColor: palette[0],
  },
];

export const useDataset = (data, entity) => {
  console.log(data, 'dataset inital')
  const labels = LABELS;
  const datasets = DATASETS;
  return {
    chart: {
      labels,
      datasets,
    }
  }
}