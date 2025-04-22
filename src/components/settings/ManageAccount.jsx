import React, { useState } from "react";
import { X, Camera, Save } from "lucide-react";

const ManageAccount = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profile_pic") || "/default-profile.png"
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("user_id");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.match("image.*")) {
        setError("Please select an image file");
        return;
      }
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setError("Image size should be less than 2MB");
        return;
      }
      setError(null);
      setSelectedFile(file);
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Update user info
      const userResponse = await fetch("http://localhost:3000/backend/api/users/update_user.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, username, email }),
      });
      const userData = await userResponse.json();

      if (!userData.success) {
        throw new Error(userData.message || "Failed to update user info");
      }

      // Update profile pic if changed
      if (selectedFile) {
        const formData = new FormData();
        formData.append("profile_pic", selectedFile);
        formData.append("id", userId);

        const picResponse = await fetch("http://localhost:3000/backend/api/users/upload_profile_pic.php", {
          method: "POST",
          body: formData,
        });
        const picData = await picResponse.json();

        if (!picData.success) {
          throw new Error(picData.message || "Failed to update profile picture");
        }
        localStorage.setItem("profile_pic", picData.profile_pic);
      }

      // Update local storage and close modal
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      window.dispatchEvent(new Event("profilePicUpdated"));
      onClose();
    } catch (err) {
      console.error("Error updating account:", err);
      setError(err.message || "An error occurred while updating your account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg relative border border-gray-200 dark:border-gray-700 transition-all duration-300 my-2 sm:my-4">
        {/* Header with close button */}
        <div className="flex justify-between items-center p-3 sm:p-4 md:p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#053C5E] dark:text-gray-200">
            Account Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-2"
            disabled={isLoading}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 md:p-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-4 sm:mb-6">
            <div className="relative group mb-3">
              <img
                src={profilePic}
                alt="Profile"
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-2 border-[#A31621] dark:border-[#FF4757] object-cover shadow-sm"
                onError={(e) => {
                  e.target.src = "/default-profile.png";
                }}
              />
              <label className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 p-2 rounded-full border border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 shadow-md">
                <Camera size={16} className="text-[#A31621] dark:text-[#FF4757]" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={isLoading}
                />
              </label>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Click to change profile photo
            </span>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#053C5E] dark:text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 sm:py-2.5 rounded-lg border border-[#A9BFA8] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#053C5E] dark:text-gray-200 focus:ring-2 focus:ring-[#A9BFA8] focus:border-transparent transition-all duration-200 disabled:opacity-70 text-base"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#053C5E] dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 sm:py-2.5 rounded-lg border border-[#A9BFA8] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#053C5E] dark:text-gray-200 focus:ring-2 focus:ring-[#A9BFA8] focus:border-transparent transition-all duration-200 disabled:opacity-70 text-base"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-end gap-3">
            <button
              className="flex items-center justify-center gap-2 py-3 sm:py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-[#053C5E] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-medium disabled:opacity-70 text-base order-2 sm:order-1 w-full sm:w-auto"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className="flex items-center justify-center gap-2 py-3 sm:py-2.5 px-4 bg-[#A31621] dark:bg-[#FF4757] text-white rounded-lg hover:bg-[#8A1320] dark:hover:bg-[#E03E4E] transition-colors duration-200 font-medium disabled:opacity-70 text-base order-1 sm:order-2 w-full sm:w-auto mb-2 sm:mb-0"
              onClick={handleSaveChanges}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <Save size={18} className="hidden sm:block" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;