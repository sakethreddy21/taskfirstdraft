'use client';

import SideBar from '@/components/shared/SideBar';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { IStoreState } from '@/store/store';

interface CoreLayoutProps {
  children: React.ReactNode;
}

export default function CoreLayout({ children }: CoreLayoutProps) {

  const router = useRouter();

  const isLoggedIn = useSelector((state: IStoreState) => state.app.isLoggedIn);

  if (!isLoggedIn) {
    router.push('/login');
  } else {
    router.push('/dashboard');
  }
  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden">
      <SideBar />
      <div className="w-full h-full flex flex-col items-start justify-start ">
        <div className="flex-1  w-full h-full">{children}</div>
       
      </div>
    </div>
  );
}