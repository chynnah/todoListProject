import { useState } from "react";

const ChangePassword = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
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
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(onClose, 2000); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

        {message && <p className="text-red-500">{message}</p>}

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        <button
          className="w-full bg-blue-500 text-white p-2 rounded mt-3"
          onClick={handleChangePassword}
        >
          Update Password
        </button>

        <button className="mt-2 text-gray-500" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
