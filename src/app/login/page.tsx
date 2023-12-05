'use client'

import { useRouter, redirect } from "next/navigation"
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
  const router = useRouter();
  const loginGoogle = () => router.push('/api/auth/google');
  const loginX = () => router.push('/api/auth/twitter');
  const loginGithub = () => router.push('/api/auth/github');
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
            <Button text="Sign in with X" onClick={loginX} Logo={<Icons.X />} className={styles.dark} />
          </div>
        </Module>
      </div>
      <div className={styles.footer} />
    </div>
  )
}

export default Login;
