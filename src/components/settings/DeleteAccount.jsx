import { useState } from "react";
import { X, AlertTriangle, Loader2 } from "lucide-react";

const DeleteAccount = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [stage, setStage] = useState("confirm"); // confirm, password, processing

  const handleClose = () => {
    setPassword("");
    setError("");
    setStage("confirm");
    onClose();
  };

  const handleDeleteAccount = async () => {
    if (stage === "confirm") {
      setStage("password");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password to continue.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/backend/api/users/delete_account.php", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (result.success) {
        setStage("processing");
        // Clear any stored user data from localStorage/state
        localStorage.removeItem("user");
        // Redirect to home page after a short delay
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setError(result.message || "Failed to delete account. Please try again.");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md relative border border-gray-200 dark:border-gray-700 transition-all duration-300">
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-[#053C5E] dark:text-gray-200">
            {stage === "processing" ? "Account Deletion" : "Delete Account"}
          </h2>
          {stage !== "processing" && (
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              disabled={isLoading}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {stage === "confirm" && (
            <>
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
                      Warning: This action cannot be undone
                    </h3>
                    <div className="mt-2 text-sm text-red-700 dark:text-red-400">
                      <p>
                        Deleting your account will permanently remove all your data, including:
                      </p>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Profile information</li>
                        <li>Activity history</li>
                        <li>All associated content</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleClose}
                  className="flex items-center gap-1.5 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-[#053C5E] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800 transition-colors duration-200 font-medium"
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {stage === "password" && (
            <>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                For security, please enter your current password to confirm account deletion.
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#053C5E] dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#A9BFA8] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#053C5E] dark:text-gray-200 focus:ring-2 focus:ring-[#A9BFA8] focus:border-transparent transition-all duration-200 disabled:opacity-70"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={handleClose}
                  className="flex items-center gap-1.5 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-[#053C5E] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-medium disabled:opacity-70"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800 transition-colors duration-200 font-medium disabled:opacity-70"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Delete Account"
                  )}
                </button>
              </div>
            </>
          )}

          {stage === "processing" && (
            <div className="py-6 flex flex-col items-center justify-center">
              <Loader2 className="h-10 w-10 text-red-600 dark:text-red-500 animate-spin mb-4" />
              <p className="text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Deleting your account...
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                You will be redirected shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;