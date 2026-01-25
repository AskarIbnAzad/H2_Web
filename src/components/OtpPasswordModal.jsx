import React, { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";

const OtpPasswordModal = ({
  isOpen,
  onClose,
  emailLabel = "Email address",
  emailPlaceholder = "Enter your email address",
  otpLength = 6,
  onSendOtp,
  onVerifyOtp,
  onChangePassword,
  initialStep = 1,
  successMessage,
  errorMessage,
}) => {
  const [step, setStep] = useState(initialStep);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [verifyToken, setVerifyToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = "https://api.h2research.org/api";
  // Cooldown timer for resend OTP
  React.useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const resetState = () => {
    setStep(initialStep);
    setEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
    setResendCooldown(0);
    setIsResending(false);
    setVerifyToken("");
    setIsLoading(false);
  };

  const handleClose = () => {
    resetState();
    onClose && onClose();
  };

  const handleSendOtp = async () => {
    if (!email) {
      setError("Email address is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setError("");
    setSuccess("");
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 422) {
          setError(data?.message || data?.errors?.[Object.keys(data.errors)[0]]?.[0] || "Validation error");
        } else {
          setError(data?.message || "Failed to send OTP");
        }
        return;
      }
      
      setSuccess(data?.message || "OTP sent to your email address.");
      setResendCooldown(30); // Start cooldown
      setTimeout(() => {
        setStep(2);
        setSuccess("");
      }, 1200);
      
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== otpLength) {
      setError(`Please enter the ${otpLength}-digit OTP.`);
      return;
    }
    
    setError("");
    setSuccess("");
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/password/otp/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 422) {
          setError(data?.message || data?.errors?.[Object.keys(data.errors)[0]]?.[0] || "Invalid OTP");
        } else {
          setError(data?.message || "OTP verification failed");
        }
        return;
      }

      console.log("OTP verified successfully:", data);
      
      setVerifyToken(data?.verify_token ||data?.data?.verify_token || "");
      setSuccess(data?.message || "OTP verified. You can now set a new password.");
      setTimeout(() => {
        setStep(3);
        setSuccess("");
      }, 1200);
      
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    setError("");
    setSuccess("");
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/password/otp/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          verify_token: verifyToken,
          password: newPassword,
          password_confirmation: confirmPassword,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 422) {
          const errors = data?.errors;
          if (errors) {
            const firstError = Object.keys(errors)[0];
            setError(errors[firstError][0]);
          } else {
            setError(data?.message || "Password reset failed");
          }
        } else {
          setError(data?.message || "Password reset failed");
        }
        return;
      }
      
      setSuccess(data?.message || "Password changed successfully! Redirecting to login...");
      setTimeout(() => {
        handleClose();
        // Redirect to login page
        if (typeof window !== 'undefined') {
          window.location.href = "/signin";
        }
      }, 2000);
      
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg relative transform transition-all duration-300 scale-100">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-2xl"
          onClick={handleClose}
          aria-label="Close"
        >
          ×
        </button>
        
        {/* Header with icon */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-[#346896]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
          <p className="text-gray-500 text-sm">
            {step === 1 && "Enter your email to receive an OTP"}
            {step === 2 && "Enter the verification code sent to your email"}
            {step === 3 && "Create your new password"}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 1 ? 'bg-[#346896] text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <div className={`w-8 h-1 ${step >= 2 ? 'bg-[#346896]' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 2 ? 'bg-[#346896] text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
            <div className={`w-8 h-1 ${step >= 3 ? 'bg-[#346896]' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 3 ? 'bg-[#346896] text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              3
            </div>
          </div>
        </div>
        {/* Step 1: Enter Email */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {emailLabel}
              </label>
              <input
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setError("");
                  setSuccess("");
                }}
                placeholder={emailPlaceholder}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#346896] focus:border-transparent transition-all"
                disabled={isLoading}
              />
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center text-red-700">
                <FiAlertCircle className="mr-2 flex-shrink-0" size={16} />
                <span className="text-sm">{error}</span>
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700">
                <span className="text-sm">{success}</span>
              </div>
            )}
            
            <button
              className="w-full bg-[#346896] hover:bg-[#285172] text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              onClick={handleSendOtp}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </button>
          </div>
        )}
        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                maxLength={otpLength}
                pattern="[0-9]*"
                inputMode="numeric"
                value={otp}
                onChange={e => {
                  const val = e.target.value.replace(/[^0-9]/g, "");
                  setOtp(val);
                  setError("");
                  setSuccess("");
                }}
                placeholder={`Enter ${otpLength}-digit OTP`}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base text-center tracking-wider focus:outline-none focus:ring-2 focus:ring-[#346896] focus:border-transparent transition-all"
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 mt-1 text-center">
                Enter the {otpLength}-digit code sent to {email}
              </p>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center text-red-700">
                <FiAlertCircle className="mr-2 flex-shrink-0" size={16} />
                <span className="text-sm">{error}</span>
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700">
                <span className="text-sm">{success}</span>
              </div>
            )}
            
            <div className="space-y-3">
              <button
                className="w-full bg-[#346896] hover:bg-[#285172] text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                onClick={handleVerifyOtp}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </button>
              
              <button
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={async () => {
                  if (resendCooldown > 0 || isResending) return;
                  setIsResending(true);
                  setError("");
                  setSuccess("");
                  try {
                    const res = await fetch(`${API_BASE_URL}/auth/password/otp/request`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email }),
                    });
                    const result = await res.json();
                    if (res.ok && result.status) {
                      setSuccess(result.message || "OTP resent to your email.");
                      setResendCooldown(30);
                    } else {
                      setError(result.message || "Failed to resend OTP");
                    }
                  } catch (err) {
                    setError("Network error. Please try again.");
                  }
                  setIsResending(false);
                }}
                disabled={resendCooldown > 0 || isResending}
              >
                {resendCooldown > 0 ? `Resend OTP (${resendCooldown}s)` : (isResending ? "Resending..." : "Resend OTP")}
              </button>
            </div>
          </div>
        )}
        {/* Step 3: Enter New Password */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={e => {
                  setNewPassword(e.target.value);
                  setError("");
                  setSuccess("");
                }}
                placeholder="Enter new password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#346896] focus:border-transparent transition-all"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => {
                  setConfirmPassword(e.target.value);
                  setError("");
                  setSuccess("");
                }}
                placeholder="Confirm new password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#346896] focus:border-transparent transition-all"
                disabled={isLoading}
              />
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-700">
                Password must be at least 6 characters long
              </p>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center text-red-700">
                <FiAlertCircle className="mr-2 flex-shrink-0" size={16} />
                <span className="text-sm">{error}</span>
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700">
                <span className="text-sm">{success}</span>
              </div>
            )}
            
            <button
              className="w-full bg-[#346896] hover:bg-[#285172] text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              onClick={handleChangePassword}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Changing Password...
                </>
              ) : (
                "Change Password"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtpPasswordModal;
