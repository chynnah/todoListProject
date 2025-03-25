import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex bg-[#FDFAF6] h-screen">
      {/* Left Section */}
      <div className="bg-[#3E3F5B] h-full w-[45%] rounded-tr-[50px] rounded-br-[50px] flex flex-col justify-center items-center text-center px-10">
        <h3 className="text-[#FDFAF6] text-2xl mb-10">TODO LIST</h3>

        <div className="text-[#FDFAF6]">
          <h1 className="text-[70px] font-thin leading-none">Join Us,</h1>
          <h1 className="text-[70px] font-bold leading-none">Sign Up!</h1>
          <p className="mt-4 text-lg">
            Create an account to start managing your tasks efficiently.
          </p>
        </div>
      </div>

      {/* Right Section (Sign Up Form) */}
      <div className="flex flex-1 justify-center items-center">
        <form className="flex flex-col gap-5 w-[350px]">
          <h2 className="text-[30px] text-[#3E3F5B] font-bold text-center">Sign Up</h2>

          {/* Username */}
          <div className="flex flex-col">
            <label htmlFor="username" className="text-[#3E3F5B]">Username:</label>
            <input 
              type="text"
              id="username"
              className="rounded-[8px] bg-[#EDEDED] h-10 px-3 w-full"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-[#3E3F5B]">Email:</label>
            <input 
              type="email"
              id="email"
              className="rounded-[8px] bg-[#EDEDED] h-10 px-3 w-full"
            />
          </div>

          {/* Password with Eye Icon */}
          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-[#3E3F5B]">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="rounded-[8px] bg-[#EDEDED] h-10 px-3 w-full pr-10"
            />
            {/* Eye Toggle Button */}
            <button
                type="button"
                className="absolute right-3 top-11 transform -translate-y-1/2 text-[#3E3F5B]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {/* Confirm Password with Eye Icon */}
          <div className="flex flex-col relative">
            <label htmlFor="confirm-password" className="text-[#3E3F5B]">Re-enter Password:</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              className="rounded-[8px] bg-[#EDEDED] h-10 px-3 w-full pr-10"
            />
            {/* Eye Toggle Button */}
            <button
              type="button"
              className="absolute right-3 top-11 transform -translate-y-1/2 text-[#3E3F5B]"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>

          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="w-4 h-4" />
            <label htmlFor="remember" className="text-[#3E3F5B]">Remember Me</label>
          </div>

          {/* Sign Up Button */}
          <button className="bg-[#3E3F5B] text-[#FDFAF6] h-10 rounded-[8px] w-full">
            Sign Up
          </button>

          {/* Login Link */}
          <p className="text-center text-[#3E3F5B]">
            Already have an account? <a href="#" className="font-bold hover:underline">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
