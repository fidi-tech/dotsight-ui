import React, {useCallback} from 'react';

import TilesSelector from '@/features/TilesSelector';
import {WidgetId} from '@/entities/widget/model';

import styles from './index.module.scss';
import {useEnhance} from './hocs';

type Props = {
  widgetId: WidgetId,
}

export const Types = ({widgetId}: Props) => {
  const {types, query, setQuery, onSelect} = useEnhance(widgetId);

  const renderType = useCallback(tile => {
    const Icon = tile.Icon;
    return (
      <div className={styles.tile}>
        <div className={styles.tileIcon}><Icon /></div>
        <div className={styles.tileName}>{tile.name}</div>
      </div>
    )
  }
  , [])

  return (
    <div>
      <TilesSelector
        title="Available Widget Types"
        query={query}
        setQuery={setQuery}
        placeholder="Search for Widget Types"
        tiles={types}
        renderTile={renderType}
        onSelect={onSelect}
      />
    </div>
  );
}