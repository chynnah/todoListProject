import { useState } from "react";

const ChangePassword = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("text-red-500"); 

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageColor("text-red-500"); 
      return;
    }

    const response = await fetch("http://localhost:3000/backend/api/users/change_password.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: 1, 
        current_password: currentPassword,
        new_password: newPassword,
      }),
    });

    const result = await response.json();
    setMessage(result.message);

    if (result.status === "success") {
      setMessageColor("text-green-500"); 
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(onClose, 2000); 
    } else {
      setMessageColor("text-red-500"); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-[#FDFAF6] rounded-tl-[50px] rounded-tr-[8px] rounded-b-[8px] p-6 w-[500px] shadow-lg relative">
        {/* Title */}
        <div className="relative bg-[#3E3F5B] w-60 text-white pt-3 pb-3 rounded-tl-[50px] rounded-tr-[50px] rounded-br-[50px] rounded-bl-[8px] mb-8">
          <h2 className="text-lg font-medium text-center">Change your password</h2>
        </div>

        {/* Lock Icon */}
        <div className="flex justify-center mb-5">
          <span className="text-6xl">🔐</span>
        </div>

        {/* Message */}
        {message && <p className={`text-sm text-center mb-3 ${messageColor}`}>{message}</p>}

        {/* Input Fields */}
        <div className="space-y-3">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-3 bg-[#EDEDED] text-sm font-medium rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 bg-[#EDEDED] text-sm font-medium rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 bg-[#EDEDED] text-sm font-medium rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            className="bg-[#3E3F5B] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#6B6DA6] transition"
            onClick={handleChangePassword}
          >
            Update Password
          </button>

          <button 
            className="px-4 py-2 rounded-md border border-[#DDD9D9] cursor-pointer" 
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
