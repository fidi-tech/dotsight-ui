import React from 'react';

import {WidgetId} from '@/entities/widget/model';
import widgets from '@/features/widgetViews/ui';
import {WidgetType} from '@/features/widgetViews/ui/constants';

import {useEnhance} from './hocs';
import styles from './index.module.scss';

type Props = {
  id: WidgetId;
  viewType: WidgetType;
}

export const Preview = ({id, viewType}: Props) => {
  const {data, isLoading, isError} = useEnhance(id);

  if (!viewType) {
    return null;
  }

  const Widget = widgets[viewType].Widget;
  const Placeholder = widgets[viewType].Placeholder;

  return (
    <div className={styles.root}>
      {data
        ? <Widget data={data} />
        : <Placeholder isLoading={isLoading} isError={isError} />
      }
    </div>
  );
}