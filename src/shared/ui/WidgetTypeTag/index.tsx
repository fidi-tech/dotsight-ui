import React from 'react';

import widgets from '@/features/widgetViews/ui';
import {WidgetType} from '@/features/widgetViews/ui/constants';

import styles from './index.module.scss';

type Props = {
  type?: WidgetType;
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