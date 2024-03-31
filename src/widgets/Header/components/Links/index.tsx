import React from 'react';
import Link from 'next/link';
import cx from 'classnames';

import styles from './index.module.scss';

const Links = () => {
  return (
    <div className={styles.root}>
      <Link href="/" className={cx(styles.link, styles.active)}>Code-Free Analytics</Link>
      <Link href="https://app.fidi.tech" passHref className={styles.link}>Portfolio Tracker</Link>
    </div>
  );
}

export default Links;