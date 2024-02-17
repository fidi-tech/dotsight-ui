import React from 'react';

import {getWidgetCategoryId, getWidgetId, getWidgetName} from '@/entities/widget/model/getters';

import styles from './index.module.scss';
import {useEnhance} from './hocs';

export const WidgetsList = () => {
  const {widgets, goToWidget} = useEnhance();
  return (
    <div>
      <div className={styles.title}>
        <div>Name</div>
        <div>Data Sources</div>
        <div>Category</div>
        <div>Type</div>
        <div>Creator</div>
        <div/>
      </div>
      <div className={styles.list}>
        {widgets.map(widget => (
          <div className={styles.row} key={getWidgetId(widget)}>
            <div className={styles.name} onClick={goToWidget.bind(this, getWidgetId(widget))}>{getWidgetName(widget)}</div>
            <div/>
            <div>{getWidgetCategoryId(widget)}</div>
            <div/>
            <div/>
            <div/>
          </div>
        ))}
      </div>
    </div>
  )
}