"use client"

import { AxiosError, AxiosResponse } from 'axios';
import { ReactNode, useEffect } from 'react';
import axios from './AxiosInstance';
import { useRouter } from 'next/navigation';

export default function AxiosInterceptorProvider({ children }: { children: ReactNode }) {
  const router = useRouter();  

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        const status = error.response?.status;
        if (status === 403) {
          router.push('/')
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return children;
}
