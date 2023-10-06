import styles from './index.module.scss';

type Props = {
  type: 'h3' | 'h4' | 'subtext';
};

export const Text = ({type, children}: React.PropsWithChildren<Props>) => {
  return (
    <span className={`${styles.root} ${styles[type]}`}>
      {children}
    </span>
  );
};
