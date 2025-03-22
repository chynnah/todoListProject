import React from 'react'
import { Bell, Moon, PencilLine } from 'lucide-react';

const Header = () => {



  return (
    <div>
      <div className='flex pt-5 ml-20 mr-10 justify-between'>
        <div className='flex items-center gap-1'>
          <h2 className='font-bold text-sm text-[#3E3F5B]'>TODO LIST</h2>
          <PencilLine size={15} color='#3E3F5B'/>
        </div>
         

         <ul className='flex gap-3'>
         <li className="relative">
            <Bell size={17} color="#3E3F5B" />
            <span className="absolute top-0.5 right-0.5 transform translate-x-1/2 -translate-y-1/2 bg-[#FF5A54] w-[13px] h-[13px] rounded-full"></span>
        </li>
            <li> <Moon size={16} color='#3E3F58' /></li>
         </ul>
      </div>
      
    </div>
  )
}

export default Header