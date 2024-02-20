'use client'

import React from 'react';
import Link from 'next/link';

import {Module} from '@/shared/ui/Module';
import {Button} from '@/shared/ui/Button';
import {Icons} from '@/shared/ui/icons';

import styles from './index.module.scss';

const Header = () => {
  const disconnect = () => window.location.assign('/api/auth/logout');
  return (
    <Module className={styles.root}>
      <a href={window.location.pathname.startsWith("/v2") ? "https://dot.fidi.tech/v2" : 'https://dot.fidi.tech/'} className={styles.badge}>
        <div className={styles.logo} />
      </a>
      <div className={styles.links}>
        <Link href={window.location.pathname.startsWith("/v2") ? "/v2" : '/'} className={styles.link}>Code-Free Analytics</Link>
      </div>
      <Button onClick={disconnect} icon={<Icons.Disconnect />} theme="muted" className={styles.disconnect} />
    </Module>
  )
}

export default Header;
