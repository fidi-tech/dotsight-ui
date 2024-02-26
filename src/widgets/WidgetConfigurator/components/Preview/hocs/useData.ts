import {useEffect, useState} from 'react';

import {WidgetId} from '@/entities/widget/model';
import {fetchWidgetDataById} from '@/shared/api/dotsight';

export const useData = (id: WidgetId) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetchWidgetDataById(id)
      .then(_data => setData(_data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false))
  }, [id, setData]);

  return {
    data,
    isLoading,
    isError,
  }
}