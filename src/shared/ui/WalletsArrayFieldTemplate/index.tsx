import React from 'react';
import {ArrayFieldTemplateProps} from '@rjsf/utils';

import {Icons} from '@/shared/ui/icons';

import styles from './index.module.scss';

const WalletsArrayFieldTemplate = (props: ArrayFieldTemplateProps) =>
  <div>
    <div className={styles.title}>
      <p>{props.schema.description}</p>
      {props.canAdd && <div className={styles.add} onClick={props.onAddClick}>
        <Icons.Plus />
      </div>}
    </div>
    {props.items.map(element =>
      <div className={styles.row} key={element.index}>
        <div className={styles.input}>{element.children}</div>
        {element.hasRemove && <div className={styles.remove} onClick={element.onDropIndexClick(element.index)}>
          <Icons.Trash />
        </div>}
      </div>
    )}
  </div>;

export default WalletsArrayFieldTemplate;