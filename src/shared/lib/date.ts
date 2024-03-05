export const timestampToStartOfTheDay = (timestamp: number): number => {
  const date = new Date(timestamp * 1000);
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return startOfDay.getTime() / 1000;
}