import { time } from 'console'
import { Clock } from 'lucide-react'
import React from 'react'

const Taskcard = ({title, description, status , deadline, timepassed}:{title:string, description:string, status:string, deadline:string, timepassed:string}) => {
const getStatusColor = (status:string) => {
          switch (status) {
            case 'Urgent':
              return '#FF6B6B';
            case 'Medium':
              return '#FFA235';
            case 'Low':
              return '#0ECC5A';
            default:
              return '#FFFFFF'; // Default color if status is not matched
                        }
}

  return (
    <div className='bg-[#F9F9F9] w-[300px] rounded-lg p-2 px-5  gap-y-2 mt-4 flex flex-col'>
    <div className=' text-[16px] max-w-[200.75px] font-medium text-[#606060]'>{title}</div>
<div className='text-[14px] font-normal max-w-[220.75px] text-[#797979]'>{description}</div>
<button className='text-white text-[12px] font-normal w-[55px] h-[30px] rounded-xl' style={{ backgroundColor: getStatusColor(status) }}>
{status}    </button>
<div className='flex flex-row gap-x-2 items-center'>
        <Clock color='#606060'/>
        <div className='text-[#606060] text-[14px]'>
            {deadline}
        </div>
    </div>
    <div className='mt-2 text-[#606060] text-[14px]'>
        {timepassed}
    </div>
    </div>
  )
}

export default Taskcard