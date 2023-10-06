export const formatValue = (x: number) => Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
  style: 'currency',
  currency: 'USD',
}).format(x);