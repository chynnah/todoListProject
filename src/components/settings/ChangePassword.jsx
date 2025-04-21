import React, { useState } from "react";
import { X, Lock, CheckCircle, AlertCircle, Save } from "lucide-react";

const ChangePassword = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userId = localStorage.getItem("user_id");

  const handleChangePassword = async () => {
    setIsLoading(true);
    setMessage("");

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setMessage("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/backend/api/users/change_password.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Password changed successfully!");
        setIsSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(onClose, 2000);
      } else {
        setMessage(result.message || "Failed to change password");
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-1 sm:p-2 md:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md relative border border-gray-200 dark:border-gray-700 transition-all duration-300 my-1 sm:my-2 md:my-4">
        {/* Header with close button */}
        <div className="flex justify-between items-center p-2 sm:p-3 md:p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#053C5E] dark:text-gray-200">
            Change Password
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-1"
            disabled={isLoading}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 md:p-6">
          {/* Icon */}
          <div className="flex justify-center mb-3 sm:mb-4 md:mb-5">
            <div className="p-2 sm:p-2.5 md:p-3 bg-[#A31621]/10 dark:bg-[#FF4757]/20 rounded-full">
              <Lock className="text-[#A31621] dark:text-[#FF4757]" size={24} />
            </div>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-3.5 md:mb-4 p-2 sm:p-2.5 md:p-3 rounded-md md:rounded-lg ${
                isSuccess
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
              }`}
            >
              {isSuccess ? (
                <CheckCircle size={16} />
              ) : (
                <AlertCircle size={16} />
              )}
              <span className="text-xs sm:text-sm">{message}</span>
            </div>
          )}

          {/* Input Fields */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#053C5E] dark:text-gray-300 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 rounded-md md:rounded-lg border border-[#A9BFA8] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#053C5E] dark:text-gray-200 focus:ring-2 focus:ring-[#A9BFA8] focus:border-transparent transition-all duration-200 disabled:opacity-70 text-xs sm:text-sm md:text-base"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#053C5E] dark:text-gray-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 rounded-md md:rounded-lg border border-[#A9BFA8] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#053C5E] dark:text-gray-200 focus:ring-2 focus:ring-[#A9BFA8] focus:border-transparent transition-all duration-200 disabled:opacity-70 text-xs sm:text-sm md:text-base"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#053C5E] dark:text-gray-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 rounded-md md:rounded-lg border border-[#A9BFA8] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#053C5E] dark:text-gray-200 focus:ring-2 focus:ring-[#A9BFA8] focus:border-transparent transition-all duration-200 disabled:opacity-70 text-xs sm:text-sm md:text-base"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 sm:mt-6 md:mt-8 flex flex-col sm:flex-row justify-end gap-1.5 sm:gap-2 md:gap-3">
            <button
              className="flex items-center justify-center gap-1 px-3 py-1.5 sm:px-3.5 sm:py-2 md:px-4 md:py-2.5 border border-gray-300 dark:border-gray-600 rounded-md md:rounded-lg text-[#053C5E] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-medium disabled:opacity-70 text-xs sm:text-sm md:text-base order-2 sm:order-1 w-full sm:w-auto"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className="flex items-center justify-center gap-1 px-3 py-1.5 sm:px-3.5 sm:py-2 md:px-4 md:py-2.5 bg-[#A31621] dark:bg-[#FF4757] text-white rounded-md md:rounded-lg hover:bg-[#8A1320] dark:hover:bg-[#E03E4E] transition-colors duration-200 font-medium disabled:opacity-70 text-xs sm:text-sm md:text-base order-1 sm:order-2 w-full sm:w-auto mb-1.5 sm:mb-0"
              onClick={handleChangePassword}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="inline-block h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <Save size={14} className="hidden sm:block" />
                  Update Password
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;