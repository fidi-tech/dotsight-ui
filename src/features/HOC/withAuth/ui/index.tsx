"use client";

import { ComponentType, useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { redirect } from 'next/navigation';

export const withAuth = <P extends object>(Component: ComponentType<P>) => {
  const MyComp = (props: P) => {
    const [mounted, setMounted] = useState(false);
    const token = getCookie('access_token');

    useEffect(() => {
      if (!token) {
        return redirect("/login");
      }
      setMounted(true);
    }, [token]);

    if (!mounted) {
      return null;
    }

    if (!token) {
      return null;
    }

    return (
      <Component {...props} />
    );
  }
  MyComp.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`;
  return MyComp;
};