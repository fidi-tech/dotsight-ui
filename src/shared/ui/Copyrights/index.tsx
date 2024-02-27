import React, {useMemo} from 'react';

import {CopyrightsRaw} from '@/shared/api/dotsight';
import {pluralize} from '@/shared/lib/string';

type Props = {
  copyrights: CopyrightsRaw,
  className?: string,
}

export const Copyrights = ({copyrights, className}: Props) => {
  const list = useMemo(() => {
    const map: Record<string, {id: string, name: string, icon?: string}> = {};
    Object.values(copyrights).forEach(datasources => {
      Object.entries(datasources).forEach(([datasourceId, datasource]) => {
        if (map[datasourceId]) {
          map[datasourceId] = Object.assign({}, map[datasourceId], datasource);
        } else {
          map[datasourceId] = datasource;
        }
      })
    })
    return Object.values(map);
  }, [copyrights]);
  if (!list.length) {
    return null;
  }
  return (
    <div className={className}>
      <span>{pluralize(list.length, 'Data source')}: </span>
      {list.map((copyright, i) => (
        <>
          {i > 0 && ', '}
          <span key={copyright.id}>{copyright.name}</span>
        </>
      ))}
    </div>
  )
}