import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); 
  
    if (password !== rePassword) {
      setError("Passwords do not match!");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/backend/api/auth/signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (data.status === "success") {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000); 
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Signup failed. Please try again.");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex justify-evenly h-[600px] w-full max-w-4xl border border-[#DDD9D9] shadow-[0px_4px_8px_rgba(0,0,0,0.1)] rounded-[25px]">
        {/* Left Section */}
        <div className="bg-[#FF1654] rounded-tr-[50px] rounded-br-[50px] flex flex-col justify-center items-center px-10 py-12 relative">
          <div className="text-[#FDFAF6] flex flex-col justify-center items-center">
            <h1 className="text-[50px] font-thin leading-none">Hello,</h1>
            <h1 className="text-[50px] font-bold leading-none">Join Us!</h1>
            <p className="mt-4 text-lg">Create an account to manage tasks better.</p>
          </div>
        </div>

        {/* Right Section (Sign Up Form) */}
        <div className="flex flex-1 justify-center items-center h-[600px] w-full max-w-4xl">
          <form className="flex flex-col gap-5 w-[350px]" onSubmit={handleSignup}>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {success && <p className="text-green-500 text-sm text-center">{success}</p>}

            {/* Username */}
            <div className="flex flex-col">
              <label htmlFor="username" className="text-[#3E3F5B]">Username:</label>
              <input 
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-[8px] bg-[#F4F4F4] h-10 px-3 w-full"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-[#3E3F5B]">Email:</label>
              <input 
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-[8px] bg-[#F4F4F4] h-10 px-3 w-full"
                required
              />
            </div>

            {/* Password with Eye Icon */}
            <div className="flex flex-col relative">
              <label htmlFor="password" className="text-[#3E3F5B]">Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-[8px] bg-[#F4F4F4] h-10 px-3 w-full pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-11 transform -translate-y-1/2 text-[#3E3F5B]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Re-enter Password with Eye Icon */}
            <div className="flex flex-col relative">
              <label htmlFor="rePassword" className="text-[#3E3F5B]">Re-enter Password:</label>
              <input
                type={showRePassword ? "text" : "password"}
                id="rePassword"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                className="rounded-[8px] bg-[#F4F4F4] h-10 px-3 w-full pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-11 transform -translate-y-1/2 text-[#3E3F5B]"
                onClick={() => setShowRePassword(!showRePassword)}
              >
                {showRePassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Sign Up Button */}
            <button type="submit" className="bg-[#FF1654] text-[#FDFAF6] h-10 rounded-[50px] w-full">
              Sign Up
            </button>

            {/* Login Link */}
            <p className="text-center text-[#3E3F5B]">
              Already have an account?{" "}
              <span 
                className="font-bold hover:underline cursor-pointer" 
                onClick={() => navigate("/login")} 
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
