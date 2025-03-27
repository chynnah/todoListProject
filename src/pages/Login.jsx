import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate(); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3000/backend/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",  // Send cookies (sessions)
      });
  
      const data = await response.json();
  
      if (data.success) {
        localStorage.setItem("username", data.username); 
        navigate("/dashboard"); 
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    }
  };


  return (
    <div className="flex bg-[#FDFAF6] h-screen ">
      {/* Left Section */}
      <div className="bg-[#3E3F5B] h-full w-[45%] rounded-tr-[50px] rounded-br-[50px] flex flex-col justify-center px-10">
        <h3 className="text-[#FDFAF6] text-2xl">TODO LIST</h3>

        <div className="text-[#FDFAF6] flex flex-col">
          <h1 className="text-[70px] font-thin leading-none">Hello,</h1>
          <h1 className="text-[70px] font-bold leading-none">Welcome!</h1>
          <p className="mt-4 text-lg">Manage your tasks efficiently.</p>
        </div>
      </div>

      {/* Right Section (Login Form) */}
      <div className="flex flex-1 justify-center items-center">
        <form className="flex flex-col gap-5 w-[350px]" onSubmit={handleLogin}>
          <h2 className="text-[30px] text-[#3E3F5B] font-bold text-center">Login</h2>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Username */}
          <div className="flex flex-col">
            <label htmlFor="username" className="text-[#3E3F5B]">Username:</label>
            <input 
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-[8px] bg-[#EDEDED] h-10 px-3 w-full"
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
              className="rounded-[8px] bg-[#EDEDED] h-10 px-3 w-full pr-10"
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

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4" />
              <label htmlFor="remember" className="text-[#3E3F5B]">Remember Me</label>
            </div>
            <a href="#" className="text-[#3E3F5B] text-sm hover:underline">Forgot Password?</a>
          </div>

          {/* Login Button */}
          <button type="submit" className="bg-[#3E3F5B] text-[#FDFAF6] h-10 rounded-[8px] w-full">
            Login
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-[#3E3F5B]">
            Don’t have an account?{" "}
            <span 
              className="font-bold hover:underline cursor-pointer" 
              onClick={() => navigate("/signup")} 
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
