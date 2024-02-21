import {format} from 'date-fns';

export const formatTime = value => {
  if (!value) {
    return '';
  }
  return format(new Date(value * 1000), 'd MMM')
};

const formatCompact = Intl.NumberFormat('en-US', {
  notation: "compact",
  maximumFractionDigits: 1
})
export const formatValue = value => {
  if (!value) {
    return '';
  }
  return formatCompact.format(value);
}