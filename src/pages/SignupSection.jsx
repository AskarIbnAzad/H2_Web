import React, { useEffect, useState } from "react";
import OtpPasswordModal from "../components/OtpPasswordModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup_service_auth } from "../store/services/authSlice";
import { asyncStatus } from "../utils/asyncStatus";
import { setIdleRegisterStatus } from "../store/slice/user_auth_slice";
import {
  FiUser,
  FiMail,
  FiLock,
  FiCalendar,
  FiAlertCircle,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiUsers,
} from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import { LiaIndustrySolid } from "react-icons/lia";
import { DatePicker } from "antd";
import "antd/dist/reset.css"; // Make sure Ant Design styles are imported
import dayjs from "dayjs";

const SignupSection = () => {
  // Forgot Password Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { signup_status } = useSelector((state) => state.userAuth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    company: "",
    agreeToTerms: false,
    role_id: 2, // Default to researcher
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    company: "",
    agreeToTerms: "",
    role_id: "",
  });

  const [formTouched, setFormTouched] = useState({
    name: false,
    email: false,
    password: false,
    dob: false,
    company: false,
    agreeToTerms: false,
    role_id: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
  });

  // Password strength criteria
  const hasLowerCase = /[a-z]/.test(formData.password);
  const hasUpperCase = /[A-Z]/.test(formData.password);
  const hasNumber = /[0-9]/.test(formData.password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
  const hasMinLength = formData.password.length >= 8;

  useEffect(() => {
    // Calculate password strength
    let score = 0;
    let feedback = "";

    if (formData.password.length > 0) {
      // Increment score based on criteria
      if (hasLowerCase) score += 1;
      if (hasUpperCase) score += 1;
      if (hasNumber) score += 1;
      if (hasSpecialChar) score += 1;
      if (hasMinLength) score += 1;

      // Set feedback based on score
      if (score <= 2) {
        feedback = "Weak password";
      } else if (score <= 4) {
        feedback = "Good password";
      } else {
        feedback = "Strong password";
      }
    }

    setPasswordStrength({ score, feedback });
  }, [formData.password]);

  // Field validation functions
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        }
        break;

      case "email":
        if (!value) {
          error = "Email address is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 8) {
          error = "Password must be at least 8 characters";
        } else if (passwordStrength.score < 3) {
          error = "Password is too weak";
        }
        break;

      case "company":
        if (value && value.trim().length > 0 && value.trim().length < 2) {
          error = "Company Name must be at least 2 characters";
        }
        break;

      case "dob":
        if (value) {
          const birthDate = new Date(value);
          const today = new Date();
          // Check if date is valid
          if (isNaN(birthDate.getTime())) {
            error = "Please enter a valid date";
          }
          // Check if birthdate is in the future
          else if (birthDate > today) {
            error = "Date of birth cannot be in the future";
          }
        }
        break;

      case "role_id":
        if (!value) {
          error = "Please select a role";
        } else if (![2].includes(parseInt(value))) {
          error = "Please select a valid role";
        }
        break;

      case "agreeToTerms":
        if (!value) {
          error = "You must agree to the terms and conditions";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Handle field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    // Mark field as touched
    setFormTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate field
    const error = validateField(name, newValue);
    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Handle field blur
  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    // Mark field as touched
    setFormTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate field
    const error = validateField(name, fieldValue);
    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      !formErrors.name &&
      !formErrors.email &&
      !formErrors.password &&
      !formErrors.dob &&
      !formErrors.company &&
      !formErrors.role_id &&
      !formErrors.agreeToTerms &&
      formData.name &&
      formData.email &&
      formData.password &&
      formData.role_id &&
      formData.agreeToTerms
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const touchedFields = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setFormTouched(touchedFields);

    // Validate all fields
    const errors = Object.keys(formData).reduce((acc, key) => {
      acc[key] = validateField(key, formData[key]);
      return acc;
    }, {});
    setFormErrors(errors);

    // Check if form is valid
    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (!hasErrors) {
      // Only hit API if role_id is researcher (2)
      // If premium-user is selected, handle differently (maybe redirect or show message)
      if (formData.role_id === 2) {
        dispatch(signup_service_auth(formData));
      } else if (formData.role_id === 3) {
        // Handle premium user signup differently
        // You can redirect to a different page or show a message
        // For now, I'll just prevent the API call
        // You might want to navigate to a different page or show a message
        // navigate("/premium-signup-success");
      }
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Calculate maximum date for date of birth (18 years ago)
  const calculateMaxDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    // Only navigate if it's a researcher signup that succeeded
    if (
      signup_status === asyncStatus.SUCCEEDED &&
      formData.role_id === 2
    ) {
      // Redirect to admin panel after successful signup
      window.open("https://stagging.h2research.org/admin/", "_self");

      dispatch(setIdleRegisterStatus());
    }
  }, [signup_status, navigate, dispatch, formData.role_id]);

  return (
    <div className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4">
      {/* Forgot Password Modal */}
      <OtpPasswordModal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
        emailLabel="Enter your email address to reset your password."
        emailPlaceholder="Email address"
        otpLength={6}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-xl overflow-hidden items-start my-10">
        {/* Left Section */}
        <div className="flex flex-col items-start p-8 lg:p-12">
          <h1 className="font-bold text-gray-900 mb-4 text-3xl">
            Activate Your Account
          </h1>
          <p className="text-[#767676] mb-8 text-lg">
            Welcome to the MHI Research Database – your hub for trusted hydrogen
            science. Whether you're a researcher, health professional, or
            curious learner, activating your account unlocks the tools and
            features designed for your journey. Please complete the form below
            and select the user role that best fits your goals.
          </p>

          <form className="w-full space-y-5" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">
                Full Name*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FiUser size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your full name"
                  className={`w-full pl-10 pr-4 py-3 border ${
                    formTouched.name && formErrors.name
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-100"
                  } rounded-lg focus:outline-none focus:ring-2 focus:border-[#346896] transition-colors`}
                />
              </div>
              {formTouched.name && formErrors.name && (
                <div className="mt-1 text-red-500 text-sm flex items-center">
                  <FiAlertCircle className="mr-1" size={14} />
                  <span>{formErrors.name}</span>
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">
                Email Address*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
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
                />
              </div>
              {formTouched.email && formErrors.email && (
                <div className="mt-1 text-red-500 text-sm flex items-center">
                  <FiAlertCircle className="mr-1" size={14} />
                  <span>{formErrors.email}</span>
                </div>
              )}
            </div>

            {/* Date of Birth Field */}
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">
                Date of Birth
              </label>
              <div className="relative flex items-center">
                {/* Calendar Icon on the left */}
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 z-10">
                  <FiCalendar size={18} />
                </span>
                <DatePicker
                  value={formData.dob ? dayjs(formData.dob) : null}
                  onChange={(date, dateString) => {
                    handleChange({
                      target: {
                        name: "dob",
                        value: dateString,
                        type: "date",
                      },
                    });
                  }}
                  onBlur={handleBlur}
                  format="YYYY-MM-DD"
                  disabledDate={(current) =>
                    current && current > dayjs().subtract(18, "year")
                  }
                  placeholder="Select your date of birth"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-[#346896] transition-colors bg-white text-gray-900"
                  style={{
                    fontSize: "16px",
                    letterSpacing: "0.01em",
                    boxShadow: "0 1px 2px rgba(52, 105, 150, 0.04)",
                  }}
                  inputReadOnly={false}
                />
              </div>
              {formTouched.dob && formErrors.dob && (
                <div className="mt-1 text-red-500 text-sm flex items-center">
                  <FiAlertCircle className="mr-1" size={14} />
                  <span>{formErrors.dob}</span>
                </div>
              )}
            </div>
            {/* Company Field */}
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">
                Company
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <LiaIndustrySolid size={18} />
                </div>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  placeholder="Enter your company name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-4 py-3 border ${
                    formTouched.company && formErrors.company
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-100"
                  } rounded-lg focus:outline-none focus:ring-2 focus:border-[#346896] transition-colors`}
                />
              </div>
              {formTouched.company && formErrors.company && (
                <div className="mt-1 text-red-500 text-sm flex items-center">
                  <FiAlertCircle className="mr-1" size={14} />
                  <span>{formErrors.company}</span>
                </div>
              )}
            </div>

            {/* Role Selection Field */}
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">
                User Role*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FiUsers size={18} />
                </div>
                <select
                  name="role_id"
                  value={formData.role_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-4 py-3 border ${
                    formTouched.role_id && formErrors.role_id
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-100"
                  } rounded-lg focus:outline-none focus:ring-2 focus:border-[#346896] transition-colors appearance-none bg-white`}
                >
                  <option value="">Select your role</option>
                  <option value={2}>Researcher</option>
                  {/* <option value={3}>Premium User</option> */}
                </select>
                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {formTouched.role_id && formErrors.role_id && (
                <div className="mt-1 text-red-500 text-sm flex items-center">
                  <FiAlertCircle className="mr-1" size={14} />
                  <span>{formErrors.role_id}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">
                Password*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FiLock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Create a strong password"
                  className={`w-full pl-10 pr-12 py-3 border ${
                    formTouched.password && formErrors.password
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-100"
                  } rounded-lg focus:outline-none focus:ring-2 focus:border-[#346896] transition-colors`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-900"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              {formData.password && (
                <div className="mt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Password Strength
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        passwordStrength.score <= 2
                          ? "text-red-500"
                          : passwordStrength.score <= 4
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {passwordStrength.feedback}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        passwordStrength.score <= 2
                          ? "bg-red-500"
                          : passwordStrength.score <= 4
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${(passwordStrength.score / 5) * 100}%`,
                      }}
                    ></div>
                  </div>

                  <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <li
                      className={`flex items-center ${
                        hasMinLength ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {hasMinLength ? (
                        <FiCheckCircle className="mr-1" size={14} />
                      ) : (
                        <FiAlertCircle className="mr-1" size={14} />
                      )}
                      <span>At least 8 characters</span>
                    </li>
                    <li
                      className={`flex items-center ${
                        hasUpperCase ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {hasUpperCase ? (
                        <FiCheckCircle className="mr-1" size={14} />
                      ) : (
                        <FiAlertCircle className="mr-1" size={14} />
                      )}
                      <span>Uppercase letter</span>
                    </li>
                    <li
                      className={`flex items-center ${
                        hasLowerCase ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {hasLowerCase ? (
                        <FiCheckCircle className="mr-1" size={14} />
                      ) : (
                        <FiAlertCircle className="mr-1" size={14} />
                      )}
                      <span>Lowercase letter</span>
                    </li>
                    <li
                      className={`flex items-center ${
                        hasNumber ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {hasNumber ? (
                        <FiCheckCircle className="mr-1" size={14} />
                      ) : (
                        <FiAlertCircle className="mr-1" size={14} />
                      )}
                      <span>Number</span>
                    </li>
                    <li
                      className={`flex items-center ${
                        hasSpecialChar ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {hasSpecialChar ? (
                        <FiCheckCircle className="mr-1" size={14} />
                      ) : (
                        <FiAlertCircle className="mr-1" size={14} />
                      )}
                      <span>Special character</span>
                    </li>
                  </ul>
                </div>
              )}

              {formTouched.password && formErrors.password && (
                <div className="mt-1 text-red-500 text-sm flex items-center">
                  <FiAlertCircle className="mr-1" size={14} />
                  <span>{formErrors.password}</span>
                </div>
              )}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div>
              <div className="flex items-start mt-2">
                <div className="flex items-center h-5">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-4 h-4 text-[#346896] border-gray-300 rounded focus:ring-[#346896]"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeToTerms" className="text-gray-700">
                    I agree to the{" "}
                    <a
                      target="_blank"
                      href="https://molecularhydrogeninstitute.org/terms-conditions/"
                      className="text-[#346896] hover:underline"
                    >
                      Terms & Conditions
                    </a>
                    ,{" "}
                    <a
                      target="_blank"
                      href="https://molecularhydrogeninstitute.org/privacy-policy/"
                      className="text-[#346896] hover:underline"
                    >
                      Privacy Policy
                    </a>{" "}
                    &{" "}
                    <a
                      target="_blank"
                      href="https://molecularhydrogeninstitute.org/disclaimer/"
                      className="text-[#346896] hover:underline"
                    >
                      Disclaimer
                    </a>
                  </label>
                </div>
              </div>
              {formTouched.agreeToTerms && formErrors.agreeToTerms && (
                <div className="mt-1 text-red-500 text-sm flex items-center">
                  <FiAlertCircle className="mr-1" size={14} />
                  <span>{formErrors.agreeToTerms}</span>
                </div>
              )}
            </div>

            {/* Signup Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={
                  signup_status === asyncStatus.LOADING || !isFormValid()
                }
                className={`w-full flex justify-center items-center gap-2 py-3 rounded-lg text-white font-medium text-base transition duration-200 ${
                  isFormValid()
                    ? "bg-[#346896] hover:bg-[#285172]"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {signup_status === asyncStatus.LOADING ? (
                  <>
                    <FaSpinner className="animate-spin" size={18} />
                    <span>Creating account...</span>
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

            {/* Error Message */}
            {signup_status === asyncStatus.FAILED && (
              <div className="mt-3 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-start">
                <FiAlertCircle
                  className="mr-2 mt-0.5 flex-shrink-0"
                  size={16}
                />
                <span>
                  Account creation failed. This email may already be registered
                  or there was a server error.
                </span>
              </div>
            )}
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center w-full">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/signin")}
                className="text-[#346896] font-medium hover:underline transition-all"
              >
                Sign In
              </button>
              <span className="mx-2">|</span>
              <button
                type="button"
                className="text-[#346896] font-medium hover:underline transition-all"
                onClick={() => setShowForgotModal(true)}
              >
                Forgot Password?
              </button>
            </p>
          </div>
        </div>

        {/* Right Section - User Roles */}
        <div className="hidden lg:flex flex-col items-start p-8 lg:p-12">
          <h1 className="font-bold text-gray-900 mb-4 text-3xl">
            User Roles & Capabilities
          </h1>
          <p className="text-[#767676] mb-8 text-lg">
            Choose the role that matches how you plan to engage with the
            database:
          </p>

          <div className="w-full space-y-5">
            {/* Public Researcher Section */}
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">
                🔬 Research Contributor (Public Researcher)
              </label>
              <div className="relative border border-gray-300 rounded-lg p-4 bg-white hover:border-[#346896] transition-colors">
                <p className="text-sm text-gray-600 mb-3">
                  Designed for researchers who want to actively contribute to
                  and shape the database.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center text-sm">
                    <FiCheckCircle className="mr-2 text-[#346896]" size={16} />
                    Add and submit articles
                  </li>
                  <li className="flex items-center text-sm">
                    <FiCheckCircle className="mr-2 text-[#346896]" size={16} />
                    Review assigned submissions
                  </li>
                  <li className="flex items-center text-sm">
                    <FiCheckCircle className="mr-2 text-[#346896]" size={16} />
                    Edit and update article content
                  </li>
                  <li className="flex items-center text-sm">
                    <FiCheckCircle className="mr-2 text-[#346896]" size={16} />
                    Track article status and revisions
                  </li>
                  <li className="flex items-center text-sm">
                    <FiCheckCircle className="mr-2 text-[#346896]" size={16} />
                    View peer/editorial feedback
                  </li>
                </ul>
              </div>
            </div>

            {/* Premium User Section */}
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">
                🌐 Premium Membership (Coming Soon)
              </label>
              <div className="relative border border-gray-300 rounded-lg p-4 bg-white hover:border-[#346896] transition-colors">
                <p className="text-sm text-gray-600 mb-3">
                  Ideal for professionals and members seeking full access to
                  curated research tools.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center text-sm">
                    <FiCheckCircle className="mr-2 text-[#285172]" size={16} />
                    View full-text articles
                  </li>
                  <li className="flex items-center text-sm">
                    <FiCheckCircle className="mr-2 text-[#285172]" size={16} />
                    Unlock premium features
                  </li>
                  <li className="flex items-center text-sm">
                    <FiCheckCircle className="mr-2 text-[#285172]" size={16} />
                    Use advanced filters and search tools
                  </li>
                  <li className="flex items-center text-sm">
                    <FiCheckCircle className="mr-2 text-[#285172]" size={16} />
                    Export data (e.g., EndNote)
                  </li>
                  <li className="flex items-center text-sm">
                    <FiCheckCircle className="mr-2 text-[#285172]" size={16} />
                    Access priority support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupSection;
