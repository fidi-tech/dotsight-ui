import React, {useState, useMemo, useCallback} from 'react';

import styles from './index.module.scss';
import {Tile} from '@/shared/ui/Tile';
import {NameWithIcon} from '@/shared/ui/NameWithIcon';
import {Button} from '@/shared/ui/Button';
import Autosuggest from 'react-autosuggest';
import {Input} from '@/shared/ui/InputV2';

type Tile = {
  id: string,
  isDisabled?: boolean,
  isSelected: boolean,
}

type Props = {
  title: string,
  query: string,
  setQuery: () => void,
  placeholder: string,
  tiles: Tile[],
  renderTile: (tile: Tile) => React.ElementType,
  onSelect: (id: string) => void,
}

const TilesSelector = ({title, placeholder, query, setQuery, tiles, onSelect, renderTile}: Props) => {
  const onChange = useCallback((e) => {
    setQuery(e.target.value);
  }, [setQuery]);
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <div className={styles.controls}>
          <div className={styles.search}>
            <Input placeholder={placeholder} onChange={onChange} value={query} />
          </div>
          {/*<Button onClick={console.log} text="Select All" theme="minor" />*/}
        </div>
      </div>
      <div className={styles.content}>
        {tiles.map(tile => {
          return (
            <Tile
              isActive={tile.isSelected}
              isDisabled={tile.isDisabled}
              className={styles.tile}
              key={tile.id}
              onClick={(!tile.isDisabled ? onSelect.bind(this, tile.id) : undefined)}
            >
              {renderTile(tile)}
            </Tile>
          )
        })}
      </div>
    </div>
  )
}

export default TilesSelector;
