import * as React from 'react';

import {Icons} from '@/shared/ui/icons';

import styles from './index.module.scss';

const Footer = () => (
  <div className={styles.root}>
    <div className={styles.copyright}>
      <div className={styles.icon}>
        <Icons.FlatStack />
      </div>
      <span>FiDi Tech Inc ©{new Date().getFullYear()} - All rights reserved</span>
    </div>
    <div className={styles.socialWrapper}>
      <a href="https://twitter.com/cryptofidi" target="_blank" className={styles.social}>
        <Icons.Twitter />
      </a>
      <a href="https://t.me/+vxA51osvNrw5NGUx" target="_blank" className={styles.social}>
        <Icons.Telegram />
      </a>
      <a href="https://discord.gg/fhaRzWZa2r" target="_blank" className={styles.social}>
        <Icons.Discord />
      </a>
      <a href="https://www.linkedin.com/company/87238251/" target="_blank" className={styles.social}>
        <Icons.LinkedIn />
      </a>
    </div>
  </div>
)

export default Footer;
