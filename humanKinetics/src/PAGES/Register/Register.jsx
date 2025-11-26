import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  X,
  CheckCircle,
  AlertTriangle,
  Loader,
} from "lucide-react";

// ... (PasswordInputWithToggle and StatusMessage components remain the same) ...
const PasswordInputWithToggle = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  disabled,
}) => {
  // Local state for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="mt-1 relative">
        <input
          // Dynamically set the type based on the state
          type={showPassword ? "text" : "password"}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          disabled={disabled}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-700 focus:border-green-700 transition duration-150 shadow-sm text-sm pr-10 disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
        <button
          type="button"
          onClick={toggleVisibility}
          disabled={disabled}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-green-700 transition duration-150 disabled:opacity-50"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {/* Dynamically show the Eye or EyeOff icon */}
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};

/**
 * Custom component for displaying API feedback (Success/Error).
 */
const StatusMessage = ({ type, message, onClose }) => {
  if (!message) return null;

  let bgColor = "";
  let textColor = "";
  let Icon = AlertTriangle; // Default to error icon

  if (type === "success") {
    bgColor = "bg-green-100 border-green-400";
    textColor = "text-green-700";
    Icon = CheckCircle;
  } else if (type === "error") {
    bgColor = "bg-red-100 border-red-400";
    textColor = "text-red-700";
    Icon = AlertTriangle;
  }

  return (
    <div
      className={`relative p-4 mb-4 text-sm border rounded-lg ${bgColor} ${textColor} transition-all duration-300 ease-in-out`}
      role={type === "error" ? "alert" : "status"}
    >
      <div className="flex items-start">
        <Icon className="h-5 w-5 mr-3 shrink-0 mt-0.5" />
        <p className="font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 p-1 rounded-full text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const SuccessModal = ({ isOpen, onClose, onLoginRedirect, onOpenGmail }) => {
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onLoginRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onLoginRedirect]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Registration Successful!</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition duration-150"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-2">
          Your account has been created successfully.
        </p>
        <p className="text-gray-600 mb-2">
          Please check your email for verification.
        </p>
        <p className="text-gray-600 mb-6">
          Redirecting to login in <span className="font-semibold text-green-700">{countdown}</span> seconds...
        </p>

        <div className="flex gap-3">
          <button
            onClick={onLoginRedirect}
            className="flex-1 bg-green-900 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-green-800 transition duration-150 focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
          >
            Go to Login
          </button>
          <button
            onClick={onOpenGmail}
            className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-150 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Open Gmail
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Registerlication Component ---

const Register = () => {
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_BBACKEND_URL;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    studentNumber: "",
    email: "",
    course: "",
    yearLevel: "",
    sport: "",
    password: "",
    confirmPassword: "",
    bDay: "",
    agreedToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: null });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Generic handler for all input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear status message on new input
    setStatus({ type: null, message: null });
  };

  const handleStatusClose = () => {
    setStatus({ type: null, message: null });
  };

  const handleLoginRedirect = () => {
    setShowSuccessModal(false);
    Navigate("/login");
  };

  const handleOpenGmail = () => {
    setShowSuccessModal(false);
    window.open("https://mail.google.com", "_blank");
    Navigate("/login");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, message: null }); // Clear previous messages

    if (formData.password !== formData.confirmPassword) {
      setStatus({
        type: "error",
        message: "Password and Confirm Password must match.",
      });
      return;
    }

    if (!formData.agreedToTerms) {
      setStatus({
        type: "error",
        message: "You must agree to the Terms of Service and Privacy Policy.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Prepare data for the API call
      const dataToSend = { ...formData };

      // 2. Make the API request
      const response = await fetch(
        `${API}/userAccounts/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      // 3. Process the response defensively
      let result = {};
      try {
        // Attempt to parse the body as JSON (works for 201 success and 409/400 errors with JSON bodies)
        result = await response.json();
      } catch (parseError) {
        // Catch the SyntaxError: Unexpected end of JSON input here.
        console.error(
          "JSON Parsing Error (Server returned non-JSON/empty body):",
          parseError
        );

        // If the parsing failed, try to determine what went wrong based on the status.
        if (response.ok) {
          // Success status (200-299) but no JSON body. This is unexpected but treat as success.
          result.message =
            "Registration successful, but the server response was malformed.";
        } else {
          // Error status (4xx, 5xx) and no JSON error message.
          const errorText = await response.text();
          console.error("Server Error Response Text:", errorText);
          result.message =
            "A server error occurred, and the response was unreadable. Check your console for details.";
        }
      }

      // 4. Handle Success or Explicit Error Message
      if (response.ok) {
        // HTTP Status 201 Created (Success)
        setStatus({
          type: "success",
          message:
            result.message || "Registration successful! You can now sign in.",
        });
        // Optionally reset form data on success
        setFormData({
          firstName: "",
          lastName: "",
          studentNumber: "",
          email: "",
          course: "",
          yearLevel: "",
          sport: "",
          bDay: "",
          password: "",
          confirmPassword: "",
          agreedToTerms: false,
        });
        setShowSuccessModal(true);
      } else {
        // HTTP Status 400, 409, 500 (Error)
        // Use the message parsed from the JSON result (or the fallback message if parsing failed)
        setStatus({
          type: "error",
          message:
            result.message ||
            "An unexpected error occurred. Please try again later.",
        });
      }
    } catch (error) {
      // This catch handles network errors (e.g., server offline)
      console.error("Fetch Error:", error);
      setStatus({
        type: "error",
        message:
          "Network error: Could not connect to the registration service.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Define shared disabled state
  const isDisabled = isSubmitting || status.type === "success";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-inter p-4 md:p-8">
      <div className="flex flex-col md:flex-row w-full max-w-7xl h-auto md:h-[90vh] overflow-hidden rounded-xl shadow-2xl">
        {/* Left Side: Marketing/Info Panel (Dark Green) */}
        <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-between bg-green-900 text-white">
          <div>
            {/* Mock Header/Logo */}
            <div className="flex items-center text-sm font-semibold mb-8 md:mb-12">
              <span className="text-xl mr-2">🏃</span>
              Pamantasan ng Lungsod ng San Pablo
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Join E-Athleta
            </h1>
            <p className="text-gray-300 mb-8">
              Your gateway to athletic excellence at PLSP
            </p>

            <ul className="space-y-4 text-sm">
              {[
                "Access to training schedules and events",
                "Track your athletic progress",
                "Connect with coaches and teammates",
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="bg-green-700 p-1 rounded-full mr-3 shrink-0">
                    <svg
                      className="w-4 h-4 text-green-100"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats Section */}
          <div className="flex justify-start space-x-6 md:space-x-8 mt-12 pt-8 border-t border-green-700">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-green-300">
                500+
              </p>
              <p className="text-xs md:text-sm text-gray-400">
                Active Athletes
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-green-300">
                50+
              </p>
              <p className="text-xs md:text-sm text-gray-400">Expert Coaches</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-green-300">4</p>
              <p className="text-xs md:text-sm text-gray-400">
                Sports Programs
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Registration Form (White/Light) */}
        <div className="w-full md:w-2/3 bg-white p-8 md:p-12 overflow-y-auto">
          {/* Close Button / Header Icon */}
          <div className="flex justify-end mb-4">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-700"
              onClick={() => Navigate("/login")}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900">
              Create Your Account
            </h2>
            <p className="mt-2 text-sm text-gray-500 mb-6">
              Fill in your details to get started
            </p>

            {/* Status Message Display */}
            <StatusMessage
              type={status.type}
              message={status.message}
              onClose={handleStatusClose}
            />

            {/* FORM START */}
            <form className="space-y-4" onSubmit={onSubmit}>
              {/* Row 1: First Name & Last Name */}
              <div className="flex space-x-4">
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-700"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="e.g., Juan"
                      required
                      disabled={isDisabled}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-700 focus:border-green-700 transition duration-150 shadow-sm text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="e.g., Dela Cruz"
                      required
                      disabled={isDisabled}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-700 focus:border-green-700 transition duration-150 shadow-sm text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Student Number */}
              <div className="flex flex-col">
                <label
                  htmlFor="studentNumber"
                  className="text-sm font-medium text-gray-700"
                >
                  Student Number <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    id="studentNumber"
                    name="studentNumber"
                    value={formData.studentNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., 2024-0001"
                    required
                    disabled={isDisabled}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-700 focus:border-green-700 transition duration-150 shadow-sm text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex flex-col mt-4">
                <label
                  htmlFor="bDay"
                  className="text-sm font-medium text-gray-700"
                >
                  Birthday <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative">
                  <input
                    type="date"
                    id="bDay"
                    name="bDay"
                    value={formData.bDay}
                    onChange={handleInputChange}
                    required
                    disabled={isDisabled}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-700 focus:border-green-700 transition duration-150 shadow-sm text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Row 3: Email Address */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address (PLSP Email){" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g., student.juan@plsp.edu.ph"
                    required
                    disabled={isDisabled}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-700 focus:border-green-700 transition duration-150 shadow-sm text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Row 4: Course & Year Level (Selects) */}
              <div className="flex space-x-4">
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="course"
                    className="text-sm font-medium text-gray-700"
                  >
                    Course <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <select
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      required
                      disabled={isDisabled}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-700 focus:border-green-700 transition duration-150 shadow-sm text-sm appearance-none bg-white cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed"
                    >
                      <option value="" disabled>
                        Select your course
                      </option>
                      <option value="BSCK">BS Human Kinetics</option>
                      <option value="BSIT">BS Information Technology</option>
                      <option value="BSED">BS Secondary Education</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="yearLevel"
                    className="text-sm font-medium text-gray-700"
                  >
                    Year Level <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <select
                      id="yearLevel"
                      name="yearLevel"
                      value={formData.yearLevel}
                      onChange={handleInputChange}
                      required
                      disabled={isDisabled}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-700 focus:border-green-700 transition duration-150 shadow-sm text-sm appearance-none bg-white cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed"
                    >
                      <option value="" disabled>
                        Select Year Level
                      </option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 5: Sport (Select) */}
              <div className="flex flex-col">
                <label
                  htmlFor="sport"
                  className="text-sm font-medium text-gray-700"
                >
                  Preferred Sport <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative">
                  <select
                    id="sport"
                    name="sport"
                    value={formData.sport}
                    onChange={handleInputChange}
                    required
                    disabled={isDisabled}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-700 focus:border-green-700 transition duration-150 shadow-sm text-sm appearance-none bg-white cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed"
                  >
                    <option value="" disabled>
                      Select Sport
                    </option>
                    <option value="basketball">Basketball</option>
                    <option value="volleyball">Volleyball</option>
                    <option value="chess">Futsal</option>
                    <option value="track">Sepak Takraw</option>
                    <option value="badminton">Table Tennis</option>
                    <option value="basketball">Badminton</option>
                    <option value="volleyball">Taekwondo</option>
                    <option value="chess">Arnis</option>
                    <option value="track">Karate-Do</option>
                  </select>
                </div>
              </div>

              {/* Row 6: Password */}
              <PasswordInputWithToggle
                id="password"
                name="password"
                label="Password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isDisabled}
              />

              {/* Row 7: Confirm Password */}
              <PasswordInputWithToggle
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={isDisabled}
              />

              {/* Row 8: Terms Checkbox */}
              <div className="flex items-start pt-2">
                <input
                  id="agreedToTerms"
                  name="agreedToTerms"
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={handleInputChange}
                  disabled={isDisabled}
                  className="h-4 w-4 text-green-900 border-gray-300 rounded focus:ring-green-900 mt-1 cursor-pointer disabled:opacity-50"
                  required
                />
                <label
                  htmlFor="agreedToTerms"
                  className="ml-3 text-sm text-gray-600 select-none"
                >
                  I agree to the
                  <a
                    href="#"
                    className="font-medium text-green-700 hover:text-green-800 ml-1"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Terms clicked");
                    }}
                  >
                    Terms of Service
                  </a>
                  and
                  <a
                    href="#"
                    className="font-medium text-green-700 hover:text-green-800 ml-1"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Privacy clicked");
                    }}
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Row 9: Register Button */}
              <button
                type="submit"
                disabled={isSubmitting || !formData.agreedToTerms}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-green-900 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition duration-150 ease-in-out disabled:opacity-50 mt-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="h-5 w-5 mr-2 animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </button>

              {/* Login Link */}
              <p className="mt-4 text-center text-sm text-gray-500">
                Already have an account?
                <a
                  href="#"
                  className="font-medium text-green-700 hover:text-green-800 ml-1"
                >
                  Sign In
                </a>
              </p>
            </form>
            {/* FORM END */}
          </div>

          {/* Footer */}
          <div className="pt-10 text-center text-xs text-gray-400">
            &copy; 2024 Pamantasan ng Lungsod ng San Pablo - College of Human
            Kinetics. All rights reserved.
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onLoginRedirect={handleLoginRedirect}
        onOpenGmail={handleOpenGmail}
      />
    </div>
  );
};

export default Register;