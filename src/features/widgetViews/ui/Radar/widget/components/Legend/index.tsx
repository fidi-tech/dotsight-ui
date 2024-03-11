import React, {RefObject} from 'react';
import {createPortal} from 'react-dom';
import type {Payload} from 'recharts/types/component/DefaultLegendContent';

import {SubCategoryId} from '@/entities/subCategory/model';

import {LegendLine} from '../LegendLine';
import styles from './index.module.scss';

type Props = {
  payload: Payload[],
  external: {
    items: Record<SubCategoryId, any>,
    containerRef: RefObject<any>,
  },
}

export const Legend = (props: Props) => {
  const {payload, external} = props;
  const {items, containerRef} = external;

  return (
    <>
      {containerRef?.current && createPortal(
        <div className={styles.marks}>
          {payload.map(mark => {
            const key = mark.dataKey;
            if (!key || typeof key !== 'string' || !items[key]) {
              return null;
            }
            return (
              <div className={styles.mark} key={mark.id}>
                <LegendLine name={items[key].name} color={mark.color!}/>
              </div>
            );
          })}
        </div>,
        containerRef.current
      )}
    </>
  )
}