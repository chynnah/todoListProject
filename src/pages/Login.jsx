import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../lib/theme";
import ForgotPassword from "../components/auth/ForgotPassword";

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
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  // Background animation elements
  const [floatingElements, setFloatingElements] = useState([]);
  
  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      navigate("/dashboard", { replace: true });
    }
    
    const elements = [];
    const shapes = ["circle", "square", "triangle"];
    const colors = ["#FFC0CB", "#A31621", "#053C5E", "#A9BFA8", "#3A3960"];
    
    for (let i = 0; i < 15; i++) {
      elements.push({
        id: i,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 60 + 20,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5
      });
    }
    
    setFloatingElements(elements);
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

  const renderShape = (element) => {
    switch (element.shape) {
      case "circle":
        return (
          <motion.div
            key={element.id}
            className="absolute rounded-full opacity-20 dark:opacity-10"
            style={{ 
              width: element.size, 
              height: element.size, 
              backgroundColor: element.color,
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              rotate: [0, Math.random() * 360, 0],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: element.delay,
            }}
          />
        );
      case "square":
        return (
          <motion.div
            key={element.id}
            className="absolute opacity-20 dark:opacity-10"
            style={{ 
              width: element.size, 
              height: element.size, 
              backgroundColor: element.color,
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              rotate: [0, Math.random() * 360, 0],
              borderRadius: ["0%", "20%", "0%"],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: element.delay,
            }}
          />
        );
      case "triangle":
        return (
          <motion.div
            key={element.id}
            className="absolute opacity-20 dark:opacity-10"
            style={{ 
              width: 0,
              height: 0,
              borderLeft: `${element.size/2}px solid transparent`,
              borderRight: `${element.size/2}px solid transparent`,
              borderBottom: `${element.size}px solid ${element.color}`,
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              rotate: [0, Math.random() * 360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: element.delay,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen p-5 sm:p-10 bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden relative"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map(element => renderShape(element))}
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/90 dark:from-gray-900/80 dark:to-gray-900/90"></div>
      
      <div className="flex flex-col md:flex-row justify-evenly w-full max-w-4xl h-[500px] border border-[#A9BFA8] dark:border-gray-700 shadow-[0px_4px_16px_rgba(0,0,0,0.15)] dark:shadow-[0px_4px_24px_rgba(0,0,0,0.5)] rounded-[25px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm overflow-hidden transition-colors duration-300 z-10">
        {/* Left Section */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-[#A31621] dark:bg-gray-900 rounded-tr-[50px] rounded-br-[50px] relative flex flex-col justify-center items-center px-5 py-12 sm:px-20 sm:py-20 w-full md:w-1/2 transition-colors duration-300 overflow-hidden"
        >
          {/* Left Panel Background Effect */}
          <div className="absolute inset-0">
            <motion.div 
              className="absolute w-64 h-64 rounded-full bg-[#FF4757]/30 blur-xl"
              animate={{
                x: [0, 30, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ left: '-20%', top: '10%' }}
            />
            <motion.div 
              className="absolute w-72 h-72 rounded-full bg-[#053C5E]/30 blur-xl"
              animate={{
                x: [0, -40, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ right: '-30%', bottom: '5%' }}
            />
          </div>
          
          <div className="text-white dark:text-gray-200 flex flex-col justify-center items-center text-center relative z-10">
            <motion.h1 
              className="text-3xl sm:text-5xl font-thin leading-none"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Hello,
            </motion.h1>
            <motion.h1 
              className="text-3xl sm:text-5xl font-bold leading-none"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Welcome!
            </motion.h1>
            <motion.p 
              className="mt-4 text-base sm:text-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Manage your tasks efficiently.
            </motion.p>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute w-24 h-24 border-4 border-white/20 rounded-full -bottom-12 -left-12"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute w-16 h-16 border-2 border-white/20 rounded-full top-12 right-2"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Right Section (Login Form) */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-1 justify-center items-center p-5 sm:p-10 w-full md:w-1/2 relative"
        >
          <form 
            onSubmit={handleLogin}
            className="flex flex-col gap-5 w-full sm:w-[350px] relative z-10"
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
            <motion.div 
              className="flex flex-col gap-1"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <label htmlFor="username" className="text-[#053C5E] dark:text-gray-300 text-sm font-medium">
                Username
              </label>
              <input 
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="rounded-lg bg-[#F8FAFC]/80 dark:bg-gray-700/80 h-10 px-4 w-full border border-[#A9BFA8] dark:border-gray-600 focus:border-[#3A3960] dark:focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3A3960]/20 dark:focus:ring-blue-500/30 transition-all dark:text-white backdrop-blur-sm"
                required
              />
            </motion.div>

            {/* Password */}
            <motion.div 
              className="flex flex-col gap-1 relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <label htmlFor="password" className="text-[#053C5E] dark:text-gray-300 text-sm font-medium">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="rounded-lg bg-[#F8FAFC]/80 dark:bg-gray-700/80 h-10 px-4 w-full pr-10 border border-[#A9BFA8] dark:border-gray-600 focus:border-[#3A3960] dark:focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3A3960]/20 dark:focus:ring-blue-500/30 transition-all dark:text-white backdrop-blur-sm"
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
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div 
              className="flex items-center justify-between text-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
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
              <button 
                type="button"
                className="text-[#053C5E] dark:text-gray-300 hover:text-[#3A3960] dark:hover:text-gray-100 hover:underline transition-colors"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </button>
            </motion.div>

            {/* Login Button */}
            <motion.button 
              type="submit" 
              className="bg-[#A31621] dark:bg-[#FF4757] text-white dark:text-white h-12 rounded-[50px] w-full font-medium relative overflow-hidden transition-colors duration-300 shadow-lg hover:shadow-xl dark:shadow-[#FF4757]/20"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(163, 22, 33, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="inline-block h-5 w-5 border-2 border-[#FAFFC5] dark:border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Sign in"
              )}
              
              {/* Button effect */}
              <motion.span 
                className="absolute inset-0 bg-white/20 dark:bg-white/10 rounded-[50px]"
                animate={{ 
                  x: ["100%", "-100%"],
                }} 
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "mirror",
                }}
              />
            </motion.button>

            {/* Sign Up Link */}
            <motion.p 
              className="text-center text-[#053C5E] dark:text-gray-300 text-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              Don't have an account?{" "}
              <span 
                className="font-bold text-[#A31621] dark:text-[#FF4757] hover:underline cursor-pointer transition-colors"
                onClick={() => navigate("/signup")} 
              >
                Sign Up
              </span>
            </motion.p>
          </form>
          
          {/* Right side decorative elements */}
          <motion.div 
            className="absolute top-10 right-10 w-8 h-8 rounded-full bg-[#A31621]/20 dark:bg-[#FF4757]/20"
            animate={{ 
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-20 right-24 w-4 h-4 rounded-sm bg-[#3A3960]/20 dark:bg-blue-500/20"
            animate={{ 
              y: [0, 10, 0],
              rotate: [0, 45, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />
        </motion.div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPassword 
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        initialEmail={formData.email}
      />
    </motion.div>
  );
};

export default Login;