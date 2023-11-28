import React, {ReactNode} from 'react';
import cx from 'classnames';

import styles from './index.module.scss';

type Props = {
  text: string,
  onClick: () => void,
  Logo: ReactNode,
  className?: string,
}

const Button = ({className, Logo, text, onClick}: Props) => {
  return <div className={cx(styles.root, className)} onClick={onClick}>
    <div className={styles.logo}>{Logo}</div>
    <div>{text}</div>
  </div>
}

export default Button;