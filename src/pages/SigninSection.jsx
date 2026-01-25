import React, { useEffect, useState } from "react";
import OtpPasswordModal from "../components/OtpPasswordModal";
import sideImage from "../assets/images/signin.webp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncStatus } from "../utils/asyncStatus";
import { login_service_auth } from "../store/services/authSlice";
import { setIdleStatus } from "../store/slice/user_auth_slice";
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";

const SigninSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { login_status } = useSelector((state) => state.userAuth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [formTouched, setFormTouched] = useState({
    email: false,
    password: false,
  });

  // Forgot Password Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate form fields
  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "email":
        if (!value) {
          error = "Email address is required";
        } else if (!validateEmail(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
    
    // Mark field as touched
    setFormTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate field on change
    const error = validateField(name, newValue);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setFormTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate field on blur
    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const isFormValid = () => {
    return !formErrors.email && !formErrors.password && formData.email && formData.password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setFormTouched({
      email: true,
      password: true,
    });
    
    // Validate all fields
    const emailError = validateField("email", formData.email);
    const passwordError = validateField("password", formData.password);
    
    setFormErrors({
      email: emailError,
      password: passwordError,
    });
    
    // Only submit if form is valid
    if (!emailError && !passwordError) {
      const payload = {
        ...formData,
        rememberMe
      };
      dispatch(login_service_auth(payload));
    }
  };

  useEffect(() => {
    if (login_status === asyncStatus.SUCCEEDED) {
      // Check if there's a return URL in the query parameters
      const urlParams = new URLSearchParams(window.location.search);
      const returnUrl = urlParams.get('returnUrl');
      
      if (returnUrl) {
        // Redirect back to the original page (decode the URL)
        window.location.href = decodeURIComponent(returnUrl);
      } else {
        // Default redirect to admin panel
        window.open("https://stagging.h2research.org/admin/", "_self");
      }
      
      dispatch(setIdleStatus());
    }
  }, [login_status, navigate, dispatch]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div  className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4">
      <OtpPasswordModal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
        emailLabel="Enter your email address to receive an OTP."
        emailPlaceholder="Email address"
        otpLength={6}
      />
      <div  className="grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-xl overflow-hidden items-center my-10">
        {/* Left Section */}
        <div  className="flex flex-col items-start p-8 lg:p-12">
          <h1  className="font-bold text-gray-900 mb-4 text-3xl md:text-[36px] sm:text-[30px] xs:text-[24px]">
            Welcome Back
          </h1>

          <p  className="text-[#767676] mb-8 text-lg">
            Sign in to your MHI account to access the world’s most comprehensive hydrogen for health research database.
          </p>

          <form  className="w-full space-y-5" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div  className="relative">
              <label  className="block text-gray-700 font-medium mb-2">Email Address*</label>
              <div  className="relative">
                <div  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FiMail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email address"
                   className={`w-full pl-10 pr-4 py-3 border ${
                    formTouched.email && formErrors.email 
                      ? "border-red-500 focus:ring-red-200" 
                      : "border-gray-300 focus:ring-blue-100"
                  } rounded-lg focus:outline-none focus:ring-2 focus:border-[#346896] transition-colors`}
                  aria-invalid={!!formErrors.email}
                />
              </div>
              {formTouched.email && formErrors.email && (
                <div  className="mt-1 text-red-500 text-sm flex items-center">
                  <FiAlertCircle  className="mr-1" size={14} />
                  <span>{formErrors.email}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div  className="relative">
              <label  className="block text-gray-700 font-medium mb-2">Password*</label>
              <div  className="relative">
                <div  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FiLock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                   className={`w-full pl-10 pr-12 py-3 border ${
                    formTouched.password && formErrors.password 
                      ? "border-red-500 focus:ring-red-200" 
                      : "border-gray-300 focus:ring-blue-100"
                  } rounded-lg focus:outline-none focus:ring-2 focus:border-[#346896] transition-colors`}
                  aria-invalid={!!formErrors.password}
                />
                <button
                  type="button"
                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-900"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {formTouched.password && formErrors.password && (
                <div  className="mt-1 text-red-500 text-sm flex items-center">
                  <FiAlertCircle  className="mr-1" size={14} />
                  <span>{formErrors.password}</span>
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div  className="flex justify-between items-center pt-2">
              <div  className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                   className="w-4 h-4 text-[#346896] border-gray-300 rounded focus:ring-[#346896]"
                />
                <label htmlFor="rememberMe"  className="ml-2 text-sm text-gray-700 cursor-pointer">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-[#346896] hover:underline focus:outline-none"
                onClick={() => setShowForgotModal(true)}
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <div  className="pt-4">
              <button
                type="submit"
                disabled={login_status === asyncStatus.LOADING || !isFormValid()}
                 className={`w-full flex justify-center items-center gap-2 py-3 rounded-lg text-white font-medium text-base transition duration-200 ${
                  isFormValid() 
                    ? "bg-[#346896] hover:bg-[#285172]" 
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {login_status === asyncStatus.LOADING ? (
                  <>
                    <FaSpinner  className="animate-spin" size={18} />
                    <span>Signing in...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>

            {/* Error Message */}
            {login_status === asyncStatus.FAILED && (
              <div  className="mt-3 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-start">
                <FiAlertCircle  className="mr-2 mt-0.5 flex-shrink-0" size={16} />
                <span>Invalid email or password. Please check your credentials and try again.</span>
              </div>
            )}
          </form>

          {/* Create Account Link */}
          <div  className="mt-6 text-center w-full">
            <p  className="text-gray-600">
              New to MHI?{" "}
              <button 
                onClick={() => navigate("/signup")}
                 className="text-[#346896] font-medium hover:underline transition-all"
              >
                Create an Account
              </button>
            </p>
          </div>
        </div>

        {/* Right Section - Image */}
        <div  className="hidden lg:block h-full">
          <img 
            src={sideImage} 
            alt="MHI Sign In" 
             className="w-full h-full object-contain" 
          />
        </div>
      </div>
    </div>
  );
};

export default SigninSection;