import React, {useCallback, useMemo} from 'react';

import TilesSelector from '@/features/TilesSelector';
import {WidgetId} from '@/entities/widget/model';

import styles from './index.module.scss';
import {useEnhance} from './hooks';
import {Type} from '@/widgets/WidgetConfigurator/components/Types/hooks/useTypes';

type Props = {
  widgetId: WidgetId,
}

export const Types = ({widgetId}: Props) => {
  const {types, query, setQuery, onSelect} = useEnhance(widgetId);

  const renderType = useCallback((tile: Type) => {
    const Icon = tile.Icon;
    return (
      <div className={styles.tile}>
        <div className={styles.tileIcon}><Icon /></div>
        <div className={styles.tileName}>{tile.name}</div>
      </div>
    )
  }
  , []);

  const sections = useMemo(() => [
    {id: 'type', tiles: types, renderTile: renderType, onSelect}
  ], [types, renderType, onSelect]);

  return (
    <div>
      <TilesSelector
        title="Available Widget Types"
        query={query}
        setQuery={setQuery}
        placeholder="Search for Widget Types"
        sections={sections}
      />
    </div>
  );
}
