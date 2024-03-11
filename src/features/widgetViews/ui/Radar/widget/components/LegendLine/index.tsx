import React, {useMemo} from 'react';

import styles from './index.module.scss';

type Props = {
  name: string,
  color: string,
}
export const LegendLine = ({name, color}: Props) => {
  const style = useMemo(() => ({
    backgroundColor: color,
  }), [color])
  return (
    <div className={styles.root}>
      <div className={styles.dot} style={style}/>
      <div>{name}</div>
    </div>
  );
}