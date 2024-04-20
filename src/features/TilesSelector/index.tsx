import React, {ReactNode, useCallback} from 'react';

import {Tile} from '@/shared/ui/Tile';
import {Input} from '@/shared/ui/InputV2';

import styles from './index.module.scss';

export type Tile = {
  id: string,
  isDisabled?: boolean,
  isSelected?: boolean,
  unavailabilityReason?: string,
}

type Section = {
  id: string;
  title?: string;
  tiles: Tile[],
  renderTile: (entity: any) => ReactNode,
  onSelect: (id: string) => void,
};

type Props = {
  title: string,
  query: string,
  setQuery: (value: string) => void,
  placeholder: string,
  sections: Section[],
}

const TilesSelector = ({title, placeholder, query, setQuery, sections}: Props) => {
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
      <div>
        {sections.filter(section => section.tiles.length > 0).map(section => (
          <div key={section.id} className={styles.section}>
            {section.title && <div className={styles.heading}>{section.title}</div>}
            <div className={styles.tiles}>
              {section.tiles.map(tile => (
                <Tile
                  isActive={tile.isSelected}
                  isDisabled={tile.isDisabled}
                  className={styles.tile}
                  key={tile.id}
                  onClick={(!tile.isDisabled ? section.onSelect.bind(this, tile.id) : undefined)}
                  Tooltip={tile.unavailabilityReason && <div className={styles.tooltip}>{tile.unavailabilityReason}</div>}
                >
                  {section.renderTile(tile)}
                </Tile>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TilesSelector;
