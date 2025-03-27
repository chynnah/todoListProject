import Header from '../components/Header'
import Tabs from '../components/Tabs';
import { Plus } from 'lucide-react';


const Dashboard = () => {
  
  const username = localStorage.getItem('username');

  return (
    <div >
      <Header />

      <div className='flex mt-9 mr-10 justify-end'> 
        <div className='bg-[#3E3F5B] h-10 w-70 rounded-tl-[50px] rounded-bl-[50px] rounded-tr-[50px] flex justify-center items-center'>
            <h1 className='text-[#FDFAF6] font-medium'>Welcome back, {username}!</h1>
        </div>
      </div>

      <div className='ml-4'> 
        <button className='h-10 w-50 flex justify-center items-center gap-2 cursor-pointer'>
          <Plus color='#3E3F5B' size={16} className='mt-[-3px]'/>
          <h4 className='text-[#3E3F5B]'>Add New Task</h4>
        </button>
      </div>

      <Tabs />

    </div>
  );
};

export default Dashboard;
