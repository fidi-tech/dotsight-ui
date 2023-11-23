export const formatNumber = (n: number) =>
  Intl.NumberFormat('en-US', {
    maximumFractionDigits: 6,
  }).format(n)