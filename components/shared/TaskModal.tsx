import React, { useState, useEffect } from 'react';
import { BadgeAlert, Calendar, Loader, Maximize2, Pencil, Share2, Star, X } from "lucide-react";

const TaskModal = ({ task, setOpenMode, onSave, openMode }: any) => {
    const statusOptions: { value: number; label: string }[] = [
      { value: 1, label: 'ToDo' },
      { value: 2, label: 'UnderReview' },
      { value: 3, label: 'InProgress' },
      { value: 4, label: 'Completed' },
    ];
  
    const getStatusLabel = (columnId: any) => {
      const status = statusOptions.find(option => option.value === columnId);
      return status ? status.label : 'Unknown';
    };
  
    const defaultTask = {
      content: '',
      columnId: 1,  // Default to 'ToDo' or another appropriate value
      status: 'ToDo',
      deadline: '',
      description: ''
    };
  
    const [formData, setFormData] = useState<{ [key: string]: string | number }>(defaultTask);
  
    useEffect(() => {
      if (task) {
        setFormData({
          content: task.content || '',
          columnId: task.columnId || 1,
          status: getStatusLabel(task.columnId) || 'ToDo',
          deadline: task.deadline || '',
          description: task.description || ''
        });
      } else {
        setFormData(defaultTask);
      }
    }, [task]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prevData => ({ ...prevData, [name]: value }));
    };
  
    const handleSubmit = () => {
      onSave({
        id: task.id,  // Ensure you are passing the task ID
        ...formData,
        columnId: statusOptions.find(option => option.label === formData.status)?.value || 1  // Map status label to column ID
      });
    };
  
    return (
      <div className={`fixed top-0 right-0 h-full w-[670px] p-4 bg-white z-50 transition-transform duration-300 ease-in-out ${openMode ? 'translate-x-0' : 'translate-x-[670px]'}`}>
        <div className="flex flex-row justify-between items-center py-2">
          <div className="flex flex-row gap-x-4">
            <X size={20} color="#797979" onClick={() => setOpenMode(false)} />
            <Maximize2 size={18} color="#797979" />
          </div>
          <div className="flex flex-row gap-4">
            <div className='bg-[#F4F4F4] text-[#797979] text-[16px] font-normal flex rounded-md items-center p-[6px]'>
              Share
              <Share2 className='flex mx-2' color="#797979" size={20} />
            </div>
            <div className='bg-[#F4F4F4] text-[#797979] text-[16px] font-normal flex rounded-md items-center p-[6px]'>
              Favorite
              <Star className='flex mx-2' color="#797979" size={20} />
            </div>
          </div>
        </div>
        <div className="flex flex-col py-4 gap-y-4">
          <input
            className="font-semibold text-[48px] text-[#CCCCCC]"
            value={formData.content}
            name="content"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-y-3">
          {[
            { Icon: Loader, label: 'Status', options: statusOptions, name: 'status', defaultValue: formData.status },
            { Icon: BadgeAlert, label: 'Priority', options: ['Urgent', 'Medium', 'Low'], name: 'priority', defaultValue: formData.priority },
            { Icon: Calendar, label: 'Deadline', component: <input type="date" className="h-[40px] rounded-md w-auto ml-8 outline-0" value={formData.deadline} name="deadline" onChange={handleChange} />, defaultValue: formData.deadline },
            { Icon: Pencil, label: 'Description', component: <input className="h-[40px] rounded-md text-wrap w-[200px] outline-0 ml-4" placeholder="Not Selected" value={formData.description} name="description" onChange={handleChange} />, defaultValue: formData.description },
          ].map(({ Icon, label, options, name, component, defaultValue }) => (
            <div key={label} className="flex flex-row gap-x-4 text-[#797979] text-[16px] font-normal rounded-md items-center">
              <Icon className='flex mx-2' color="#797979" size={20} />
              <p className="max-w-[200px]">{label}</p>
              {component || (
                <select className="h-[40px] rounded-md w-auto ml-12 outline-0" name={name} value={formData[name]} onChange={handleChange}>
                  <option value="" disabled>Not Selected</option>
                  {options?.map((option, index) => {
                    if (typeof option === 'string') {
                      return <option key={index} value={option}>{option}</option>;
                    } else {
                      return <option key={index} value={option.value}>{option.label}</option>;
                    }
                  })}
                </select>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    );
  };
  
  export default TaskModal;
  