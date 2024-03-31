'use client'

import React from 'react';
import Link from 'next/link';

import {Module} from '@/shared/ui/Module';
import {Button} from '@/shared/ui/Button';
import {Icons} from '@/shared/ui/icons';

import styles from './index.module.scss';
import Links from './components/Links';

const Header = () => {
  const disconnect = () => window.location.assign('/api/auth/logout');
  return (
    <Module className={styles.root}>
      <Link href="/" className={styles.badge}>
        <div className={styles.logo}/>
      </Link>
      <div className={styles.links}>
        <Links />
      </div>
      <Button onClick={disconnect} icon={<Icons.Disconnect />} theme="muted" className={styles.disconnect} />
    </Module>
  )
}

export default Header;
