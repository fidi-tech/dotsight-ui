import React from 'react';

import {WidgetId} from '@/entities/widget/model';
import widgets from '@/features/widgetViews/ui';

import {useEnhance} from './hocs';
import styles from './index.module.scss';

type Props = {
  id: WidgetId;
  viewType: string;
}

export const Preview = ({id, viewType}: Props) => {
  const {data} = useEnhance(id);

  if (!viewType) {
    return null;
  }

  const Widget = widgets[viewType].Widget;

  return (
    <div className={styles.root}>
      {data && <Widget data={data} />}
    </div>
  );
}