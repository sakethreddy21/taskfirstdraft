'use client';
import { IStoreState } from '@/store/store';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function Home() {
  const router = useRouter();

  const isLoggedIn = useSelector((state: IStoreState) => state.app.isLoggedIn);
  console.log(isLoggedIn)

  if (!isLoggedIn) {
    router.push('/login');
  } else {
    router.push('/dashboard');
  }
  return (
    <div className="grid place-content-center h-screen">
      <Loader size="50" className="text-yellow-400 animate-spin" />
    </div>
  );
}
