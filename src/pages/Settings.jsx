import { React, useState } from "react"; 
import ManageAccount from "../components/settings/ManageAccount";
import ChangePassword from "../components/settings/ChangePassword";

const Settings = () => {

  const [isManageAccountOpen, setIsManageAccountOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-2xl p-8 rounded-xl flex flex-col">
        <h2 className="text-2xl font-semibold text-[#283D3B]">Settings</h2>
        <p className="text-[#283D3B] text-sm mb-6">Manage your preferences and account settings.</p>

        <div className="space-y-[10px]">
          {/* Manage Account */}
          <div className="w-full border border-[#DDD9D9] rounded-tr-[8px] rounded-tl-[50px] rounded-bl-[8px] rounded-br-[8px] p-6 flex justify-between items-center">
            <div>
              <h3 className="text-[#283D3B] font-medium text-lg">Manage Account</h3>
              <p className="text-[#283D3B] text-sm">Update your profile details and preferences.</p>
            </div>
            <button className="px-5 py-2 bg-[#FF1654] text-white text-sm rounded-md cursor-pointer hover:bg-[#FF1654] transition" onClick={() => setIsManageAccountOpen(true)}>Edit</button>
          </div>

          {/* Change Password */}
          <div className="w-full  border border-[#DDD9D9] rounded-tr-[8px] rounded-tl-[50px] rounded-bl-[8px] rounded-br-[8px] p-6 flex justify-between items-center">
            <div>
              <h3 className="text-[#283D3B] font-medium text-lg">Change Password</h3>
              <p className="text-[#283D3B] text-sm">Update your login credentials.</p>
            </div>
            <button className="px-5 py-2 bg-[#FF1654] text-white text-sm rounded-md cursor-pointer hover:bg-[#FF1654] transition" onClick={() => setIsChangePasswordOpen(true)}>Change</button>
          </div>

          {/* Task Notifications */}
          <div className="w-full  border border-[#DDD9D9] rounded-tr-[8px] rounded-tl-[50px] rounded-bl-[8px] rounded-br-[8px] p-6 flex justify-between items-center">
            <div>
              <h3 className="text-[#283D3B] font-medium text-lg">Task Notifications</h3>
              <p className="text-[#283D3B] text-sm">Enable or disable task reminders.</p>
            </div>
            <span className="px-5 py-2 bg-green-500 text-white text-sm rounded-md">On</span>
          </div>
        </div>
      </div>

      {/* Manage Account Modal */}
      <ManageAccount isOpen={isManageAccountOpen} onClose={() => setIsManageAccountOpen(false)} />
      {/* Change Password Modal */}
      <ChangePassword isOpen={isChangePasswordOpen} onClose={() => setIsChangePasswordOpen(false)} />
    </div>
  );
};

export default Settings;
