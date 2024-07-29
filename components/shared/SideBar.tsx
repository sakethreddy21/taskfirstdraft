'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronsRight,
  InfoIcon,
  Settings,
  House,
  SquareKanban,
  Users,
  ChartLine,
  CirclePlus,
  ArrowDownToLine
} from 'lucide-react';
import Image from 'next/image';
import ActiveUserMenu from './ActiveUserMenu';
import { Button } from '../ui/button';



const SideBar = () => {
  const activeLink = 'font-semibold text-black bg-[#F4F4F4]';
  const inactive = 'hover:text-black font-medium';
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const LINKS = [
    {
      href: '/home',
      name: 'Home',
      icon: <House className="h-5 w-5" color='#797979' />,
    },
    {
      href: '/boards',
      name: 'Boards',
      icon: <SquareKanban className="h-5 w-5" color='#797979' />,
    },
    {
      href: '/settings',
      name: 'Settings',
      icon: <Settings className="h-5 w-5" color='#797979' />,
    },
    {
      href: '/teams',
      name: 'Teams',
      icon: <Users className="h-5 w-5" color='#797979' />,
    },
    {
      href: '/dashboard',
      name: 'Dashboard',
      icon: <ChartLine className="h-5 w-5" color='#797979' />,
    },
  ];

  const SECONARY_LINKS = [
    {
      href: '/support',
      name: 'Ask AI',
      icon: <InfoIcon className="h-5 w-5" />,
    },
  ];

  return (
    <div
      className={`flex h-screen w-full   flex-col overflow-hidden bg-[#ffffff] text-black
      transition-all duration-300 ease-in-out  ${open ? 'max-w-[200px]' : 'max-w-[70px]'
        } border-r`}
    >
      <div className="flex items-center justify-between border-gray-800 p-2.5 mt-2 max-h-[73px]">
        <Link className="flex items-center transition-all" href="#">
          {open ? (
            <div className='w-full'> <ActiveUserMenu setState={setOpen} state={open} /></div>

          ) : (
            <Image
              src={'/shared/brandlogo.png'}
              onClick={() => setOpen(!open)}
              alt="logo"
              width={40}
              height={40}
            />
          )}
        </Link>

      </div>
      <nav className="flex-1 overflow-y-auto">
        <div>
        {LINKS.map((link, index) => (
          <Link
            href={link.href}
            key={index}
            className={`transition-colors hover:bg-[#F4F4F4] mx-2  flex flex-row items-center cursor-pointer rounded-md  h-50 text-xs p-2 ${pathname.includes(link.href) ? activeLink : inactive
              }`}
          >
            {link.icon}
            {open && (
              <span className="ml-2 align-middle inline-block text-[#797979]">
                {link.name}
              </span>
            )}
          </Link>
        ))}
        </div>
        <div className='p-2'>  
          <Button className="flex flex-row items-center justify-center cursor-pointer rounded-md custom-gradient  text-xs p-[10px] ">
        <span className=" font-normal text-white text-[20px] w-full text-center">
        Create new task 
      </span>
      <CirclePlus className="mt-1" size={26} fill='#FFFFFF' color='#2F2188 '/>
      </Button></div>
      
      </nav>
     
    
      <div className="overflow-y-auto p-2 pb-4 ">  
        <div className='flex flex-row bg-[#F3F3F3] p-1 items-center justify-center gap-x-2'>

          <ArrowDownToLine  color='#797979' size={20} />
          <div className='flex flex-col '>
            <span className='text-[14px] font-medium'>Download the app</span>
            <span className='text-[10px] text-[#797979]'>Get the full experience</span>
          </div>
         
        </div>
         
         </div>
    
      
    </div>
  );
};

export default SideBar;
