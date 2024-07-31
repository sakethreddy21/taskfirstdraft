"use client";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from '@/components/dashboard/card';
import image1 from '@/public/image1.svg';
import image2 from '@/public/image2.svg';
import image3 from '@/public/image3.svg';
import { IStoreState } from '@/store/store';
import SearchComponent from '@/components/dashboard/search';
import { Calendar, CirclePlus, Filter, Share2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TaskManager from '@/components/dashboard/taskmanager';

const Dashboard: React.FC = () => {
  const username = useSelector((state: IStoreState) => state.app.username);
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    setName(username ?? '');

    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good Morning';
      if (hour < 18) return 'Good Afternoon';
      return 'Good Evening';
    };

    setGreeting(updateGreeting());
  }, [username]);

  const cards = [
    { path: image1, heading1: 'Introducing tags', heading2: 'Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.' },
    { path: image2, heading1: 'Stay Organized', heading2: 'Use folders and categories to organize your notes and projects effectively.' },
    { path: image3, heading1: 'Collaborate with Team', heading2: 'Share your notes and collaborate with your team in real-time.' }
  ];

  const actions = [
    { label: 'Calendar view', Icon: Calendar },
    { label: 'Automation', Icon: Sparkles },
    { label: 'Filter', Icon: Filter },
    { label: 'Share', Icon: Share2 }
  ];

  return (
    <div className='flex flex-col bg-[#F7F7F7] gap-y-3 w-full h-full p-4'>
      <div className='flex flex-row justify-between items-center'>
        <div className='text-[#080808] font-semibold text-[34px]'>
          {greeting}, {name}
        </div>
        <div className='pr-4 font-normal text-[16px] text-[#080808]'>
          Help and Feedback?
        </div>
      </div>
      <div className='flex flex-row mt-[2px] justify-between'>
        {cards.map((card, index) => (
          <Card key={index} path={card.path} heading1={card.heading1} heading2={card.heading2} />
        ))}
      </div>
      <div className='flex flex-row justify-between items-center '>
        <SearchComponent />
        <div className='flex flex-row text-[#797979] w-[800px] justify-between'>
          {actions.map((action, index) => (
            <div key={index} className='bg-[#F4F4F4] flex p-2'>
              {action.label}
              <action.Icon className='flex mx-2' />
            </div>
          ))}
          <Button className="flex flex-row items-center justify-center cursor-pointer rounded-md custom-gradient text-xs p-[5px]">
            <span className="font-normal text-white text-[20px] w-full text-center">
              Create new
            </span>
            <CirclePlus className="mt-1 mx-2" size={26} fill='#FFFFFF' color='#2F2188' />
          </Button>
        </div>
      </div>
      <div className='bg-[#FFFFFF] rounded-md overflow-y-scroll'>
        <TaskManager />
      </div>
    </div>
  );
};

export default Dashboard;
