import { Search } from 'lucide-react'
import React from 'react'

const SearchComponent = () => {
  return (
    <div> 
    <div className="ml-auto  flex text-[16px] text-[#797979] font-normal  justify-between h-8 w-[180px] select-none items-center gap-1 rounded-lg  bg-[#FFFFFF] px-1.5  ">
    <input
  type="text"
  placeholder="Search"
  onClick={()=>{}}
  className=" w-full h-full text-black   " 
/>

   <Search className='' size={24} absoluteStrokeWidth color='#797979'/>
  </div></div>
  )
}

export default SearchComponent