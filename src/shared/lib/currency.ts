export const CURRENCY_FORMATTER: Record<string, Intl.NumberFormat> = {
  usd: Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'USD',
  }),
}