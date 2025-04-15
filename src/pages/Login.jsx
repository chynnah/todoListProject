import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../lib/theme";

const Login = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/backend/api/auth/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("profile_pic", data.profile_pic || "/default-profile.png");

        if (data.notifications) {
          localStorage.setItem("notifications", JSON.stringify(data.notifications));
        }
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen p-5 sm:p-10 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="flex flex-col md:flex-row justify-evenly w-full max-w-4xl h-[500px] border border-[#A9BFA8] dark:border-gray-700 shadow-[0px_4px_8px_rgba(0,0,0,0.1)] dark:shadow-[0px_4px_16px_rgba(0,0,0,0.4)] rounded-[25px] bg-white dark:bg-gray-800 overflow-hidden transition-colors duration-300">
        {/* Left Section */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-[#A31621] dark:bg-gray-900 rounded-tr-[50px] rounded-br-[50px] flex flex-col justify-center items-center px-5 py-12 sm:px-20 sm:py-20 w-full md:w-1/2 transition-colors duration-300"
        >
          <div className="text-white dark:text-gray-200 flex flex-col justify-center items-center text-center">
            <h1 className="text-3xl sm:text-5xl font-thin leading-none">Hello,</h1>
            <h1 className="text-3xl sm:text-5xl font-bold leading-none">Welcome!</h1>
            <p className="mt-4 text-base sm:text-lg">Manage your tasks efficiently.</p>
          </div>
        </motion.div>

        {/* Right Section (Login Form) */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-1 justify-center items-center p-5 sm:p-10 w-full md:w-1/2"
        >
          <form 
            onSubmit={handleLogin}
            className="flex flex-col gap-5 w-full sm:w-[350px]"
          >
            {error && (
              <motion.p 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-red-500 text-sm text-center p-2 bg-red-50 dark:bg-red-900/30 rounded border border-red-200 dark:border-red-800"
              >
                {error}
              </motion.p>
            )}

            {/* Username */}
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-[#053C5E] dark:text-gray-300 text-sm font-medium">
                Username
              </label>
              <input 
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="rounded-lg bg-[#F8FAFC] dark:bg-gray-700 h-10 px-4 w-full border border-[#A9BFA8] dark:border-gray-600 focus:border-[#3A3960] dark:focus:border-gray-500 focus:outline-none transition-all dark:text-white"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="password" className="text-[#053C5E] dark:text-gray-300 text-sm font-medium">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="rounded-lg bg-[#F8FAFC] dark:bg-gray-700 h-10 px-4 w-full pr-10 border border-[#A9BFA8] dark:border-gray-600 focus:border-[#3A3960] dark:focus:border-gray-500 focus:outline-none transition-all dark:text-white"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-[#053C5E] dark:text-gray-400 hover:text-[#3A3960] dark:hover:text-gray-200 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-4 h-4 accent-[#3A3960] dark:accent-blue-500 cursor-pointer" 
                />
                <label htmlFor="remember" className="text-[#053C5E] dark:text-gray-300 cursor-pointer">
                  Remember Me
                </label>
              </div>
              <a 
                href="#" 
                className="text-[#053C5E] dark:text-gray-300 hover:text-[#3A3960] dark:hover:text-gray-100 hover:underline transition-colors"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <motion.button 
              type="submit" 
              className="bg-[#A31621] dark:bg-[#FF4757]  text-white dark:text-white h-10 rounded-[50px] w-full font-medium relative overflow-hidden transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="inline-block h-4 w-4 border-2 border-[#FAFFC5] dark:border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Sign in"
              )}
            </motion.button>

            {/* Sign Up Link */}
            <p className="text-center text-[#053C5E] dark:text-gray-300 text-sm">
              Don't have an account?{" "}
              <span 
                className="font-bold text-[#A31621] dark:text-[#FF4757]  hover:underline cursor-pointer transition-colors"
                onClick={() => navigate("/signup")} 
              >
                Sign Up
              </span>
            </p>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;