import React from 'react'
import Card from './Card';
import { ListChecks, Hourglass, CheckCircle, Star } from 'lucide-react';

const Tabs = () => {

  const tabs = [
    { name: "All Tasks", icon: <ListChecks size={15}/>, count: 0, badgeColor: "bg-gray-400" },
    { name: "Pending", icon: <Hourglass size={15}/>, count: 0, badgeColor: "bg-yellow-400"},
    { name: "Completed", icon: <CheckCircle size={15}/>, count: 0, badgeColor: "bg-green-400"},
    { name: "Favorites", icon: <Star size={15}/>, count: 0, badgeColor: "bg-cyan-400" },
  ];

  return (
    <div className='flex gap-2 m-auto justify-center mt-5 gap-3'>
      {tabs.map((tab, index) => (
        <div key={index} className='border border-[#DDD9D9] h-[70vh] w-[23%] flex justify-between pt-5 rounded-tl-[50px] rounded-tr-[8px] rounded-b-[8px] text-[#3E3F5B]'>
          <div className='flex gap-2 ml-8 mt-2'>
            <span className='mt-[2.5px]'>{tab.icon}</span>
            <span>{tab.name}</span>
          </div>

          <span 
  className={`flex justify-center items-center mr-5 mt-2 text-white w-6 h-6 rounded-full text-sm ${tab.badgeColor}`}>
  {tab.count}
</span>

          
        </div>
      ))}

      <Card />

    </div>
  )
}

export default Tabs