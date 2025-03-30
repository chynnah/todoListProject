import React, { useState } from "react";


const ManageAccount = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profile_pic") || "https://picsum.photos/80"
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const userId = localStorage.getItem("user_id"); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProfilePic(URL.createObjectURL(file)); 
    }
  };

  const handleSaveChanges = () => {
    fetch("http://localhost:3000/backend/api/users/update_user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId, username, email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("username", username);
          localStorage.setItem("email", email);
          onClose();
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error("Error updating user:", error));
  
    if (selectedFile) {
      const formData = new FormData();
      formData.append("profile_pic", selectedFile);
      formData.append("id", userId);
  
      fetch("http://localhost:3000/backend/api/upload_profile_pic.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            const imageUrl = `http://localhost:3000/backend/uploads/${data.profile_pic}`; // Ensure full URL
            setProfilePic(imageUrl);
            localStorage.setItem("profile_pic", imageUrl); // Save to local storage
          } else {
            alert(data.message);
          }
        })
        .catch((error) => console.error("Error uploading profile picture:", error));
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-[#FDFAF6] rounded-tl-[50px] rounded-tr-[8px] rounded-b-[8px] p-6 w-[500px] shadow-lg relative">
        <div className="relative bg-[#3E3F5B] w-60 text-white pt-3 pb-3 rounded-tl-[50px] rounded-tr-[50px] rounded-br-[50px] rounded-bl-[8px]">
          <h2 className="text-lg font-medium text-center">Manage your account!</h2>
        </div>

        <div className="flex justify-center mt-4">
          <div className="relative">
            <img src={profilePic} alt="Profile" className="w-20 h-20 rounded-full border border-[#DDD9D9]" />
            <label className="absolute bottom-1 right-0 bg-white p-1 rounded-full border border-gray-300 cursor-pointer h-8 w-8 text-center">
              ✎
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
            </label>
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-600">Current Username:</label>
          <input type="text" name="username" value={username} onChange={handleInputChange} className="w-full mt-1 p-3 rounded-[8px] bg-[#EDEDED] text-gray-600" />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-600">Current Email:</label>
          <input type="text" name="email" value={email} onChange={handleInputChange} className="w-full mt-1 p-3 rounded-[8px] bg-[#EDEDED] text-gray-600" />
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button className="bg-[#3E3F5B] text-white px-4 py-2 rounded-md cursor-pointer" onClick={handleSaveChanges}>
            Save Changes
          </button>
          <button className="px-4 py-2 rounded-md border border-[#DDD9D9] cursor-pointer" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;
