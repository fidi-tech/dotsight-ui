import React from 'react';

import {Table} from '@/shared/ui/Table';
import {Module} from '@/shared/ui/Module';
import {Copyrights} from '@/shared/ui/Copyrights';

import {useEnhance} from './hooks';
import styles from './index.module.scss';

type Props = {
  data: any,
}

const View = ({data}: Props) => {
  const {
    header,
    rows,
    copyrights,
  } = useEnhance(data);
  return (
    <div>
      <Module>
        <Table header={header} rows={rows} />
        <Copyrights copyrights={copyrights} className={styles.copyright} />
      </Module>
    </div>
  )
}

export default View;