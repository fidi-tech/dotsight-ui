import {api} from '@/shared/api/dotsight/base';

const BASE_URL = '/v2/categories';

export const fetchCategoriesList = async (): Promise<any[]> => {
  const response = await api.get(BASE_URL);
  return response.data.categories;
}
