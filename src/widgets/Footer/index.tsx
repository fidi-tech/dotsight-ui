import * as React from 'react';

import {Icons} from '@/shared/ui/icons';

import styles from './index.module.scss';
import Link from 'next/link';

const Footer = () => (
  <div className={styles.root}>
    <div className={styles.left}>
      <div className={styles.icon}>
        <Icons.FlatStack />
      </div>
      <span className={styles.copyright}>FiDi Tech Inc ©{new Date().getFullYear()} - All rights reserved</span>
    </div>
    <div className={styles.center}>
      <Link href="https://fidi.tech/tos/" target="_blank" className={styles.link}>Terms</Link>
      <Link href="https://fidi.tech/privacy/" target="_blank" className={styles.link}>Privacy</Link>
    </div>
    <div className={styles.socialWrapper}>
      <a href="https://x.com/cryptofidi" target="_blank" className={styles.social}>
        <Icons.X />
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
