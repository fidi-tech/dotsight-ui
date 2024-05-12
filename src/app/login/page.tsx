'use client'

import { redirect } from "next/navigation"
import { getCookie } from 'cookies-next';
import {useCallback, useEffect} from 'react';

import {Module} from '@/shared/ui/Module';
import {Icons} from '@/shared/ui/icons';
import {ACCESS_TOKEN} from '@/shared/constants/cookies';

import Button from './components/Button';
import styles from './index.module.scss';
import dynamic from 'next/dynamic';

const Login = () => {
  const token = getCookie(ACCESS_TOKEN);
  useEffect(() => {
    if (token) {
      redirect('/');
    }
  }, [token]);
  const loginGoogle = () => window.location.assign('/api/auth/google');
  const loginGithub = () => window.location.assign('/api/auth/github');
  const loginWeb3 = useCallback(async () => {
    try {
      const msg = '0x57656c636f6d6520746f20446f74736967687421'; // Welcome to Dotsight!
      // @ts-ignore global variable
      const [address] = await window.ethereum.request({method: "eth_requestAccounts"});
      // @ts-ignore global variable
      const signed = await window.ethereum.request({method: "personal_sign", params: [msg, address]});
      window.location.assign(`/api/auth/web3?address=${address}&msg=${msg}&signed=${signed}`);
    } catch (err) {
      console.error(err);
    }
  }, []);
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.logo} />
      </div>
      <div className={styles.container}>
        <Module className={styles.module}>
          <p className={styles.title}>Code-Free Analytics for Web3</p>
          <p className={styles.text}>Visualize on-chain and off-chain data in a matter of several clicks.</p>
          <div className={styles.buttons}>
            <Button text="Sign in with Google" onClick={loginGoogle} Logo={<Icons.Google />} />
            <Button text="Sign in with Github" onClick={loginGithub} Logo={<Icons.Github />} />
            {
              // @ts-ignore
              typeof window !== 'undefined' && window.ethereum ? (
                <Button text="Sign in with Metamask" onClick={loginWeb3} Logo={<Icons.Metamask />} />
              ) : null
            }
          </div>
        </Module>
      </div>
      <div className={styles.footer} />
    </div>
  )
}

export default dynamic(async () => Login, {ssr: false});
