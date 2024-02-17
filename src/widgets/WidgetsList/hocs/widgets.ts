import {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useRouter} from 'next/navigation';

import {useDispatch} from '@/infra/providers/redux';
import {getWidgets} from '@/entities/widget/model/providers/getWidgets';
import {selectAll} from '@/entities/widget/model/selectors';

export const useWidgets = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(getWidgets());
  }, [dispatch]);
  const widgets = useSelector(selectAll);
  const goToWidget = useCallback((id) => {
    router.push(`/v2/widget/${id}`);
  }, [])
  return {
    widgets,
    goToWidget,
  }
}