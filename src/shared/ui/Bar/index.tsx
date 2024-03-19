import styles from './index.module.scss';
import {useMemo} from 'react';

type Props = {
  p: number;
};

export const Bar = ({p}: Props) => {
  const style = useMemo(() => ({
    width: `${p}%`,
  }), [p])
  return (
    <div className={styles.root}>
      <div className={styles.bar} style={style} />
    </div>
  );
}
