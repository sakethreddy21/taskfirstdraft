'use client';

import SideBar from '@/components/shared/SideBar';

interface CoreLayoutProps {
  children: React.ReactNode;
}

export default function CoreLayout({ children }: CoreLayoutProps) {
  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden">
      <SideBar />
      <div className="w-full h-full flex flex-col items-start justify-start ">
        <div className="flex-1  w-full h-full">{children}</div>
       
      </div>
    </div>
  );
}