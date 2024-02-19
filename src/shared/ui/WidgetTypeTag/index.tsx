import React from 'react';

import widgets from '@/features/widgetViews/ui';
import {WidgetView} from '@/entities/widget/model';

import styles from './index.module.scss';

type Props = {
  type?: WidgetView;
}

export const WidgetTypeTag = ({type}: Props) => {
  if (!type || !widgets[type]) {
    return null;
  }
  return (
    <div className={styles.root}>
      {widgets[type].title}
    </div>
  )
}