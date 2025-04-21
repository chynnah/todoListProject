import { useState } from "react";
import ManageAccount from "../components/settings/ManageAccount";
import ChangePassword from "../components/settings/ChangePassword";
import DeleteAccount from "../components/settings/DeleteAccount";

const Settings = () => {
  const [isManageAccountOpen, setIsManageAccountOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 px-4 py-6 sm:px-6 md:px-8">
      <div className="w-full max-w-2xl p-4 sm:p-6 md:p-8 rounded-xl shadow-lg bg-white dark:bg-gray-800 flex flex-col transition-colors duration-200">
        <div className="mb-6 sm:mb-8 border-l-4 border-[#FF1654] dark:border-[#FF4757] pl-3 sm:pl-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">Settings</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">Manage your preferences and account settings.</p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {/* Manage Account */}
          <div className="w-full border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow transition p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 bg-white dark:bg-gray-700/30">
            <div>
              <h3 className="text-gray-800 dark:text-gray-200 font-semibold text-base sm:text-lg">Manage Account</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1">Update your profile details and preferences.</p>
            </div>
            <button 
              className="w-full sm:w-auto px-4 sm:px-5 py-2 bg-[#FF1654] dark:bg-[#FF4757] text-white font-medium rounded-md hover:bg-opacity-90 transition focus:outline-none focus:ring-2 focus:ring-[#FF1654] focus:ring-opacity-50 dark:focus:ring-[#FF4757]"
              onClick={() => setIsManageAccountOpen(true)}
            >
              Edit
            </button>
          </div>

          {/* Change Password */}
          <div className="w-full border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow transition p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 bg-white dark:bg-gray-700/30">
            <div>
              <h3 className="text-gray-800 dark:text-gray-200 font-semibold text-base sm:text-lg">Change Password</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1">Update your login credentials.</p>
            </div>
            <button 
              className="w-full sm:w-auto px-4 sm:px-5 py-2 bg-[#FF1654] dark:bg-[#FF4757] text-white font-medium rounded-md hover:bg-opacity-90 transition focus:outline-none focus:ring-2 focus:ring-[#FF1654] focus:ring-opacity-50 dark:focus:ring-[#FF4757]"
              onClick={() => setIsChangePasswordOpen(true)}
            >
              Change
            </button>
          </div>

          {/* Delete Account */}
          <div className="w-full border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow transition p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 bg-white dark:bg-gray-700/30">
            <div>
              <h3 className="text-gray-800 dark:text-gray-200 font-semibold text-base sm:text-lg">Delete Account</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1">Permanently remove your account and all data.</p>
            </div>
            <button 
              className="w-full sm:w-auto px-4 sm:px-5 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 dark:focus:ring-gray-500"
              onClick={() => setIsDeleteAccountOpen(true)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ManageAccount isOpen={isManageAccountOpen} onClose={() => setIsManageAccountOpen(false)} />
      <ChangePassword isOpen={isChangePasswordOpen} onClose={() => setIsChangePasswordOpen(false)} />
      <DeleteAccount isOpen={isDeleteAccountOpen} onClose={() => setIsDeleteAccountOpen(false)} />
    </div>
  );
};

export default Settings;