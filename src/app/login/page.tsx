'use client'

import { redirect } from "next/navigation"
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';

import {Module} from '@/shared/ui/Module';
import {Icons} from '@/shared/ui/icons';
import {ACCESS_TOKEN} from '@/shared/constants/cookies';

import Button from './components/Button';
import styles from './index.module.scss';

const Login = () => {
  const token = getCookie(ACCESS_TOKEN);
  useEffect(() => {
    if (token) {
      redirect('/');
    }
  }, [token]);
  const loginGoogle = () => window.location.assign('/api/auth/google');
  const loginGithub = () => window.location.assign('/api/auth/github');
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.logo} />
      </div>
      <div className={styles.container}>
        <Module className={styles.module}>
          <p className={styles.title}>Code-Free Analytics for Web3</p>
          <p className={styles.text}>Visualize on-chain and off-chain data in a matter several clicks.</p>
          <div className={styles.buttons}>
            <Button text="Sign in with Google" onClick={loginGoogle} Logo={<Icons.Google />} />
            <Button text="Sign in with Github" onClick={loginGithub} Logo={<Icons.Github />} />
          </div>
        </Module>
      </div>
      <div className={styles.footer} />
    </div>
  )
}

export default Login;
