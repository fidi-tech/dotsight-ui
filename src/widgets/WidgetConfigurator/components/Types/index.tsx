import React, {useCallback} from 'react';

import TilesSelector from '@/features/TilesSelector';
import {WidgetId} from '@/entities/widget/model';

import styles from './index.module.scss';
import {useEnhance} from './hocs';

type Props = {
  widgetId: WidgetId,
  onSelect: (id: string) => void,
}

export const Types = ({onSelect: onParentSelect, widgetId}: Props) => {
  const {types, query, setQuery, onSelect} = useEnhance(widgetId);

  const _onSelect = useCallback((t) => {
    onParentSelect(t);
    onSelect(t);
  }, [onSelect]);

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
        onSelect={_onSelect}
      />
    </div>
  );
}