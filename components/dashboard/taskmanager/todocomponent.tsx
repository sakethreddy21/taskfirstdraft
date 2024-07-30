import React from 'react';
import { Plus, Text } from 'lucide-react';
import Taskcard from '../taskcard';

const TodoComponent = () => {
  const tasks = [
    {
      title: 'Implement User Authentication',
      description: 'Develop and integrate user authentication using email and password.',
      status: 'Urgent',
      deadline: '2024-08-12',
      timepassed: '1 hour ago',
    },
    {
      title: 'Design Database Schema',
      description: 'Create and optimize database schema for new project.',
      status: 'Medium',
      deadline: '2024-08-15',
      timepassed: '2 hours ago',
    },
    // Add more tasks here as needed
  ];

  return (
    <div className='flex flex-col '>
      <div className='flex justify-between items-center w-[300px]'>
        <h2 className='text-[20px]'>To Do</h2>
        <Text color='#555555'/>
      </div>
      {tasks.map((task, index) => (
        <Taskcard
          key={index}
          title={task.title}
          description={task.description}
          status={task.status}
          deadline={task.deadline}
          timepassed={task.timepassed}
        />
      ))}
      <button
        className='w-full flex justify-between items-center mt-4 p-2 rounded-xl text-left text-[#E3E1E1]'
        style={{ background: 'linear-gradient(180deg, #3A3A3A 0%, #202020 100%)' }}
      >
        Add New
        <Plus color='#E3E1E1'/>
      </button>
    </div>
  );
};

export default TodoComponent;
