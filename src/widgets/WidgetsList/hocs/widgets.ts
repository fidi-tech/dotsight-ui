import {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useRouter} from 'next/navigation';

import {useDispatch} from '@/infra/providers/redux';
import {getWidgets} from '@/entities/widget/model/providers/getWidgets';
import {selectAll} from '@/entities/widget/model/selectors';
import {WidgetId} from '@/entities/widget/model';
import {deleteWidgetById} from '@/entities/widget/model/providers/deleteWidgetById';

export const useWidgets = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(getWidgets());
  }, [dispatch]);
  const widgets = useSelector(selectAll);
  const goToWidget = useCallback((id: WidgetId) => {
    router.push(`/v2/widget/${id}`);
  }, [router])
  const deleteWidget = useCallback((id: WidgetId) => {
    dispatch(deleteWidgetById(id))
  }, [deleteWidgetById])
  return {
    widgets,
    goToWidget,
    deleteWidget,
  }
}