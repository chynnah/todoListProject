import { useState } from "react";
import { X, MailCheck, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const ForgotPassword = ({ 
  isOpen, 
  onClose,
  initialEmail = ""
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resetLink, setResetLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState("request"); // request, verify

  const handleSendResetLink = async () => {
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:3000/backend/api/users/forgot_password.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(result.message);
        setResetLink(result.dev_link);
        setStage("verify");
      } else {
        setError(result.message || "Failed to send reset link");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setError("");
    setSuccess("");
    setResetLink("");
    setStage("request");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md relative border border-gray-200 dark:border-gray-700"
      >
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-[#053C5E] dark:text-gray-200">
            {stage === "request" ? "Forgot Password" : "Check Your Email"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            disabled={isLoading}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {stage === "request" ? (
            <>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Enter your email address to receive a password reset link.
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#053C5E] dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#A9BFA8] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#053C5E] dark:text-gray-200 focus:ring-2 focus:ring-[#A9BFA8] focus:border-transparent transition-all duration-200"
                  placeholder="your@email.com"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <motion.button
                  onClick={handleSendResetLink}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-[#A31621] dark:bg-[#FF4757] text-white rounded-lg hover:bg-[#8A1320] dark:hover:bg-[#E03E4E] transition-colors duration-200 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Send Reset Link"
                  )}
                </motion.button>
              </div>
            </>
          ) : (
            <div className="py-6 flex flex-col items-center justify-center text-center">
              <MailCheck className="h-12 w-12 text-green-600 dark:text-green-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Check Your Email
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We've sent a password reset link to <span className="font-medium">{email}</span>.
              </p>
              
              {/* Development-only reset link display */}
              <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg w-full">
                <p className="text-sm font-medium mb-1">Development Mode:</p>
                <a 
                  href={resetLink} 
                  className="text-blue-600 dark:text-blue-400 text-sm break-all hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resetLink}
                </a>
              </div>
              
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
                Didn't receive the email? Check your spam folder.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;