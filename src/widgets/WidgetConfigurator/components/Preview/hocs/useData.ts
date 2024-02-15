import {useEffect, useState} from 'react';

import {WidgetId} from '@/entities/widget/model';
import {fetchWidgetDataById} from '@/shared/api/dotsight';

export const useData = (id: WidgetId) => {
  const [data, setData] = useState();

  console.log(data, 'ddata')

  useEffect(() => {
    fetchWidgetDataById(id).then(_data => setData(_data))
  }, [id, setData]);

  return {
    data,
  }
}