import React from 'react';

import {
  getWidgetCategoryId,
  getWidgetId,
  getWidgetName,
  getWidgetView,
  isWidgetDeletable,
} from '@/entities/widget/model/getters';
import {WidgetTypeTag} from '@/shared/ui/WidgetTypeTag';
import {withConfirmation} from '@/features/HOC/withConfirmation/ui';
import {Icons} from '@/shared/ui/icons';

import styles from './index.module.scss';
import {useEnhance} from './hocs';

export const WidgetsList = () => {
  const {widgets, goToWidget, deleteWidget} = useEnhance();
  return (
    <div>
      <div className={styles.title}>
        <div className={styles.name}>Name</div>
        <div className={styles.datasources}>Data Sources</div>
        <div className={styles.category}>Category</div>
        <div className={styles.type}>Type</div>
        <div className={styles.creator}>Creator</div>
        <div className={styles.actions}/>
      </div>
      <div className={styles.list}>
        {widgets.map(widget => {
          const Delete = withConfirmation(
            {
              text: `Do you want to delete widget "${getWidgetName(widget)}"?`,
              positive: 'Delete',
              negative: 'Cancel',
              onPositiveClick: () => deleteWidget(getWidgetId(widget)),
            }
          )(() => <div className={styles.action}><Icons.Trash /></div>)
          return (
            <div className={styles.row} key={getWidgetId(widget)}>
              <div className={styles.name} onClick={goToWidget.bind(this, getWidgetId(widget))}>
                {getWidgetName(widget)}
              </div>
              <div className={styles.datasources} />
              <div className={styles.category}>
                {getWidgetCategoryId(widget)}
              </div>
              <div className={styles.type}>
                <WidgetTypeTag type={getWidgetView(widget)}/>
              </div>
              <div className={styles.creator}/>
              <div className={styles.actions}>
                {isWidgetDeletable(widget) && <Delete />}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}