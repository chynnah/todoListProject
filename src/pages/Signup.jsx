import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  
const handleSignup = async (e) => {
  e.preventDefault();

  if (password !== rePassword) {
    setError("Passwords do not match!");
    return;
  }

  try {
    const response = await axios.post('http://localhost:3000/backend/api/signup.php', {
      username,
      email,
      password,
    });

    console.log(response.data);

    if (response.data.status === "success") {
      navigate("/login"); // Redirect to login page after success
    } else {
      setError(response.data.message);
    }
  } catch (error) {
    setError("Signup failed. Please try again.");
  }
};

  return (
    <div className="flex bg-[#FDFAF6] h-screen">
      <div className="bg-[#3E3F5B] h-full w-[45%] rounded-tr-[50px] rounded-br-[50px] flex flex-col justify-center px-10">
        <h3 className="text-[#FDFAF6] text-2xl">TODO LIST</h3>
        <h1 className="text-[70px] font-thin leading-none text-[#FDFAF6]">Welcome,</h1>
        <h1 className="text-[70px] font-bold leading-none text-[#FDFAF6]">Join Us!</h1>
        <p className="mt-4 text-lg text-[#FDFAF6]">Create an account to manage tasks better.</p>
      </div>

      <div className="flex flex-1 justify-center items-center">
        <form className="flex flex-col gap-5 w-[350px]" onSubmit={handleSignup}>
          <h2 className="text-[30px] text-[#3E3F5B] font-bold text-center">Sign Up</h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex flex-col">
            <label htmlFor="username" className="text-[#3E3F5B]">Username:</label>
            <input 
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-[8px] bg-[#EDEDED] h-10 px-3 w-full"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-[#3E3F5B]">Email:</label>
            <input 
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-[8px] bg-[#EDEDED] h-10 px-3 w-full"
              required
            />
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-[#3E3F5B]">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-[8px] bg-[#EDEDED] h-10 px-3 w-full pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-[70%] transform -translate-y-1/2 text-[#3E3F5B]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="rePassword" className="text-[#3E3F5B]">Re-enter Password:</label>
            <input
              type={showRePassword ? "text" : "password"}
              id="rePassword"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              className="rounded-[8px] bg-[#EDEDED] h-10 px-3 w-full pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-[70%] transform -translate-y-1/2 text-[#3E3F5B]"
              onClick={() => setShowRePassword(!showRePassword)}
            >
              {showRePassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="bg-[#3E3F5B] text-[#FDFAF6] h-10 rounded-[8px] w-full">
            Sign Up
          </button>

          <p className="text-center text-[#3E3F5B]">
            Already have an account?{" "}
            <span className="font-bold hover:underline cursor-pointer" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
