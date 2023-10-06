import styles from './index.module.scss';

type Props = {};

export const Card = ({children}: React.PropsWithChildren<Props>) => {
  return (
    <div className={styles.root}>
      {children}
    </div>
  );
}
