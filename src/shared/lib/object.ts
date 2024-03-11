export const pick = (o: Record<string, any>, keys: string[]) => {
  const result: Record<string, any> = {};
  keys.forEach(key => {
    if (o[key]) {
      result[key] = o[key];
    }
  })
  return result;
}

export const omit = (o: Record<string, any>, keys: string[]) => {
  const result: Record<string, any> = {};
  Object.keys(o).forEach(key => {
    if (keys.includes(key)) {
      return;
    }
    result[key] = o[key];
  })
  return result;
}
