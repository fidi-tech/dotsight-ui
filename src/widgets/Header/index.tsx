'use client'

import React from 'react';
import Link from 'next/link';

import {Button} from '@/shared/ui/Button';
import {Icons} from '@/shared/ui/icons';

import styles from './index.module.scss';
import Links from './components/Links';
import MobileNavigation from './components/MobileNavigation';

const Header = () => {
  const disconnect = () => window.location.assign('/api/auth/logout');
  return (
    <div className={styles.root}>
      <Link href="/" className={styles.badge}>
        <div className={styles.logo}/>
      </Link>
      <div className={styles.links}>
        <Links/>
      </div>
      <div className={styles.right}>
        <Button onClick={disconnect} icon={<Icons.Disconnect/>} theme="muted" className={styles.disconnect}/>
        <div className={styles.mobileNavigation}>
          <MobileNavigation/>
        </div>
      </div>
    </div>
  )
}

export default Header;
