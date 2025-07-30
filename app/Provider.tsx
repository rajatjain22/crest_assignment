'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { fetchCurrentUser } from '@/lib/slices/authSlice';

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (isLoading) {
    return <>Loading dd...</>
  }

  return <>{children}</>;
}
