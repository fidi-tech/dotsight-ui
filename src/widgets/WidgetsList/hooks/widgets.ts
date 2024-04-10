import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useRouter} from 'next/navigation';

import {useDispatch} from '@/infra/providers/redux';
import {selectAll} from '@/entities/widget/model/selectors';
import {WidgetId} from '@/entities/widget/model';
import {deleteWidgetById} from '@/entities/widget/model/providers/deleteWidgetById';
import {fetchWidgets} from '@/shared/api/dotsight';
import {updateAll} from '@/entities/widget/model/actions';

export const useWidgets = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetchWidgets()
      .then(_data => dispatch(updateAll(_data)))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false))
  }, [dispatch]);

  const router = useRouter();
  const widgets = useSelector(selectAll);
  const goToWidget = useCallback((id: WidgetId) => {
    router.push(`/widget/${id}`);
  }, [router])
  const deleteWidget = useCallback((id: WidgetId) => {
    dispatch(deleteWidgetById(id))
  }, [dispatch])
  return {
    widgets,
    goToWidget,
    deleteWidget,
    isLoading,
    isError,
  }
}