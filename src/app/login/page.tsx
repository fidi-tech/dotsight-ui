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
          <p className={styles.title}>Welcome to DotSight</p>
          <p className={styles.text}>Visualize with Precision, Simplify with Innovation</p>
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
