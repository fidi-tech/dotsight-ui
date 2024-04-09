import React from 'react';

import {
  getWidgetCategoryId,
  getWidgetId,
  getWidgetName,
  getWidgetView,
  isWidgetDeletable,
  isWidgetPublic,
} from '@/entities/widget/model/getters';
import {WidgetTypeTag} from '@/shared/ui/WidgetTypeTag';
import {withConfirmation} from '@/features/HOC/withConfirmation/ui';
import {Icons} from '@/shared/ui/icons';
import Loader from '@/shared/ui/Loader';
import PublicityToggler from '@/features/PublicityToggler';
import {getRawShareLink} from '@/app/widget/[id]/share/utils';
import Copyable from '@/shared/ui/Copyable';

import styles from './index.module.scss';
import {useEnhance} from './hooks';
import Action from '@/widgets/WidgetsList/components/Action';

export const WidgetsList = () => {
  const {widgets, goToWidget, deleteWidget, isLoading} = useEnhance();
  return (
    <div>
      <div className={styles.title}>
        <div className={styles.name}>Name</div>
        <div className={styles.datasources}>Data Sources</div>
        <div className={styles.category}>Category</div>
        <div className={styles.type}>Type</div>
        <div className={styles.visibility}>Visibility</div>
        <div className={styles.creator}>Creator</div>
        <div className={styles.actions}/>
      </div>
      {isLoading && <div className={styles.loader}><Loader /></div>}
      {!isLoading && (
        <div className={styles.list}>
          {widgets.map(widget => {
            const widgetId = getWidgetId(widget);
            const Delete = withConfirmation(
              {
                text: `Do you want to delete widget "${getWidgetName(widget)}"?`,
                positive: 'Delete',
                negative: 'Cancel',
                onPositiveClick: () => deleteWidget(widgetId),
              }
            )(Icons.Trash);
            return (
              <div className={styles.row} key={widgetId}>
                <div className={styles.name} onClick={goToWidget.bind(this, widgetId)}>
                  {getWidgetName(widget)}
                </div>
                <div className={styles.datasources}/>
                <div className={styles.category}>
                  {getWidgetCategoryId(widget)}
                </div>
                <div className={styles.type}>
                  <WidgetTypeTag type={getWidgetView(widget)}/>
                </div>
                <div className={styles.visibility}>
                  <PublicityToggler id={widgetId} />
                </div>
                <div className={styles.creator}/>
                <div className={styles.actions}>
                  {isWidgetPublic(widget) && (
                    <Copyable value={getRawShareLink(widgetId)}>
                      <Action>
                        <Icons.Export />
                      </Action>
                    </Copyable>
                  )}
                  {isWidgetDeletable(widget) && (
                    <Action>
                      <Delete />
                    </Action>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}