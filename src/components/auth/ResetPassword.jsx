import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, CheckCircle2 } from "lucide-react";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(null); // null = not checked yet

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch("http://localhost:3000/backend/api/users/verify_token.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        
        const data = await response.json();
        setTokenValid(data.valid);
        
        if (!data.valid) {
          setTimeout(() => navigate("/login"), 3000); // Redirect after showing message
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        setTokenValid(false);
      }
    };

    verifyToken();
  }, [token, navigate]);

  const handleReset = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/backend/api/users/reset_password.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError(data.message || "Failed to reset password");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (tokenValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12" />
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-md w-full text-center">
          <h2 className="text-xl font-bold mb-4">Invalid or Expired Link</h2>
          <p>This password reset link is no longer valid. Please request a new one.</p>
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-md w-full text-center">
          <CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} />
          <h2 className="text-xl font-bold mb-4">Password Reset Successful</h2>
          <p>You can now log in with your new password.</p>
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-6">Reset Your Password</h2>
        
        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block mb-2">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
              minLength={8}
            />
          </div>
          
          <div>
            <label className="block mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
              minLength={8}
            />
          </div>
          
          {error && <p className="text-red-500">{error}</p>}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-2 rounded flex justify-center items-center"
          >
            {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;