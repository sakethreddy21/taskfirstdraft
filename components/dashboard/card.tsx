import React from 'react'
import Image, { StaticImageData } from 'next/image'
const Card = ({path, heading1, heading2}:{path:StaticImageData, heading1:string, heading2:string}) => {
  return (
    <div className='flex flex-row bg-[#FFFFFF] w-[400px] h-[125px] p-4  items-center justify-center'> 
    <Image
     src={path}
     alt="logo"
            width={77}
            height={60}/>
             <div className='flex flex-col p-[6px]'>
    <div className='font-semibold text-[16px] text-[#757575]'>{heading1}</div>
    <div className='font-normal text-[#868686]'>{heading2}</div>
    </div>
            
    </div>
  )
}

export default Card