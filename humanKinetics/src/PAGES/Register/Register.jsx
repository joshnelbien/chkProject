import React, { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react"; // Using lucide-react for icons

// Mock function for form submission
const handleSubmit = (formData) => {
  console.log("Form Data Submitted:", formData);
  // NOTE: Using console.log instead of alert for success message
  console.log(
    "Registration attempt logged to console. Check network tab for actual API call details."
  );
  // In a real application, you would make your API call here
  // e.g., fetch('/api/register', { method: 'POST', body: JSON.stringify(formData) })
};

const Register = () => {
  // 1. STATE MANAGEMENT (State is kept but no longer linked to inputs)
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
    agreedToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to update parent formData state (kept, but no longer called by InputField)
  const updateFormData = (name, value, type, checked) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handles form submission (still uses the potentially empty formData)
  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      // NOTE: Replaced alert() with console.error()
      console.error("Error: Passwords do not match!");
      return;
    }
    if (!formData.agreedToTerms) {
      // NOTE: Replaced alert() with console.error()
      console.error(
        "Error: You must agree to the Terms of Service and Privacy Policy."
      );
      return;
    }

    setIsSubmitting(true);
    // Simulate API call delay
    setTimeout(() => {
      handleSubmit(formData);
      setIsSubmitting(false);
    }, 1500);
  };

  // 2. FORM INPUT COMPONENT (Reusable) - 'update' prop is still received, but inputs below don't pass it.
  const InputField = ({
    label,
    name,
    value, // Value is received but might be undefined
    type = "text",
    placeholder,
    className = "",
    required = false,
    children,
    update, // Prop is received but is now always undefined from the parent component calls
  }) => {
    // Determine input type behavior
    const isPassword = name === "password" || name === "confirmPassword";
    const isSelect = type === "select";

    // Password fields leverage closure access to parent state (showPassword/showConfirmPassword)
    const isShown = name === "password" ? showPassword : showConfirmPassword;
    const toggleVisibility = () => {
      name === "password"
        ? setShowPassword(!showPassword)
        : setShowConfirmPassword(!showConfirmPassword);
    };

    // Determine the actual type attribute for the <input> element
    const inputType = isPassword ? (isShown ? "text" : "password") : type;

    // Local handler is defined but 'update' is undefined in all consumer calls
    const localHandleChange = (e) => {
      const { name, value, type, checked } = e.target;
      // This line will cause an error if 'update' is not passed/defined.
      // Since we are deleting 'update' below, this will break functionality.
      if (update) {
        update(name, value, type, checked);
      }
    };

    return (
      <div className={`flex flex-col ${className}`}>
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="mt-1 relative">
          {isSelect ? (
            /* Renders <select> element */
            <select
              id={name}
              name={name}
              // WARNING: value is removed, making this an uncontrolled input
              // value={value}
              // WARNING: onChange is removed, preventing state update
              // onChange={localHandleChange}
              required={required}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-700 focus:border-green-700 transition duration-150 shadow-sm text-sm appearance-none bg-white cursor-pointer"
            >
              {children}
            </select>
          ) : (
            /* Renders <input> element (Standard or Password) */
            <>
              <input
                type={inputType}
                id={name}
                name={name}
                // WARNING: value is removed, making this an uncontrolled input
                // value={value}
                // WARNING: onChange is removed, preventing state update
                // onChange={localHandleChange}
                placeholder={placeholder}
                required={required}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-700 focus:border-green-700 transition duration-150 shadow-sm text-sm ${
                  isPassword ? "pr-10" : ""
                }`} // pr-10 makes room for the icon
              />
              {isPassword && (
                /* Password Visibility Toggle Button */
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-green-700"
                  onClick={toggleVisibility}
                  aria-label={isShown ? "Hide password" : "Show password"}
                >
                  {isShown ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  // 3. MAIN COMPONENT RENDER
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-inter">
      {/* The main container matching the image's structure */}
      <div className="flex w-full max-w-7xl h-[80vh] overflow-hidden rounded-xl shadow-2xl">
        {/* Left Side: Marketing/Info Panel (Dark Green) */}
        <div className="w-full md:w-1/3 p-12 flex flex-col justify-between bg-green-900 text-white">
          <div>
            {/* Mock Header/Logo */}
            <div className="flex items-center text-sm font-semibold mb-12">
              {/* Mock Logo or Icon */}
              <span className="text-xl mr-2">🏃</span>
              Pamantasan ng Lungsod ng San Pablo
            </div>

            <h1 className="text-5xl font-extrabold leading-tight mb-6">
              Join E-Athleta
            </h1>
            <p className="text-gray-300 mb-8">
              Your gateway to athletic excellence at PLSP
            </p>

            <ul className="space-y-4 text-sm">
              <li className="flex items-center">
                <span className="bg-green-700 p-1 rounded-full mr-3">
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
                Access to training schedules and events
              </li>
              <li className="flex items-center">
                <span className="bg-green-700 p-1 rounded-full mr-3">
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
                Track your athletic progress
              </li>
              <li className="flex items-center">
                <span className="bg-green-700 p-1 rounded-full mr-3">
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
                Connect with coaches and teammates
              </li>
            </ul>
          </div>

          {/* Stats Section */}
          <div className="flex justify-start space-x-8 mt-12">
            <div>
              <p className="text-4xl font-bold text-green-300">500+</p>
              <p className="text-sm text-gray-400">Active Athletes</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-300">50+</p>
              <p className="text-sm text-gray-400">Expert Coaches</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-300">4</p>
              <p className="text-sm text-gray-400">Sports Programs</p>
            </div>
          </div>
        </div>

        {/* Right Side: Registration Form (White/Light) */}
        <div className="w-full md:w-2/3 bg-white p-12 overflow-y-auto">
          {/* Close Button / Header Icon */}
          <div className="flex justify-end mb-4">
            <button className="text-gray-400 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-900">
              Create Your Account
            </h2>
            <p className="mt-2 text-sm text-gray-500 mb-8">
              Fill in your details to get started
            </p>

            <form onSubmit={onSubmit} className="space-y-4">
              {/* Row 1: First Name & Last Name */}
              <div className="flex space-x-4">
                <InputField
                  label="First Name"
                  name="firstName"
                  placeholder="e.g., Juan"
                  className="w-1/2"
                  required
                  // DELETED: value={formData.firstName}
                  // DELETED: update={updateFormData}
                />
                <InputField
                  label="Last Name"
                  name="lastName"
                  placeholder="e.g., Dela Cruz"
                  className="w-1/2"
                  required
                  // DELETED: value={formData.lastName}
                  // DELETED: update={updateFormData}
                />
              </div>

              {/* Row 2: Student Number */}
              <InputField
                label="Student Number"
                name="studentNumber"
                placeholder="e.g., 2024-0001"
                required
                // DELETED: value={formData.studentNumber}
                // DELETED: update={updateFormData}
              />

              {/* Row 3: Email Address */}
              <InputField
                label="Email Address"
                name="email"
                type="email"
                placeholder="e.g., student.juan@plsp.edu.ph"
                required
                // DELETED: value={formData.email}
                // DELETED: update={updateFormData}
              />

              {/* Row 4: Course & Year Level (Selects) */}
              <div className="flex space-x-4">
                <InputField
                  label="Course"
                  name="course"
                  type="select"
                  className="w-1/2"
                  required
                  // DELETED: value={formData.course}
                  // DELETED: update={updateFormData}
                >
                  <option value="" disabled>
                    Select your course
                  </option>
                  <option value="BSCK">BS Human Kinetics</option>
                  <option value="BSIT">BS Information Technology</option>
                </InputField>
                <InputField
                  label="Year Level"
                  name="yearLevel"
                  type="select"
                  className="w-1/2"
                  required
                  // DELETED: value={formData.yearLevel}
                  // DELETED: update={updateFormData}
                >
                  <option value="" disabled>
                    Select Year Level
                  </option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </InputField>
              </div>

              {/* Row 5: Sport (Select) */}
              <InputField
                label="Sport"
                name="sport"
                type="select"
                required
                // DELETED: value={formData.sport}
                // DELETED: update={updateFormData}
              >
                <option value="" disabled>
                  Select Sport
                </option>
                <option value="basketball">Basketball</option>
                <option value="volleyball">Volleyball</option>
                <option value="chess">Chess</option>
                <option value="track">Track and Field</option>
              </InputField>

              {/* Row 6: Password */}
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                // DELETED: value={formData.password}
                // DELETED: update={updateFormData}
              />

              {/* Row 7: Confirm Password */}
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                // DELETED: value={formData.confirmPassword}
                // DELETED: update={updateFormData}
              />

              {/* Row 8: Terms Checkbox */}
              <div className="flex items-start pt-2">
                <input
                  id="agreedToTerms"
                  name="agreedToTerms"
                  type="checkbox"
                  // DELETED: checked={formData.agreedToTerms}
                  // DELETED: onChange handler
                  className="h-4 w-4 text-green-700 border-gray-300 rounded focus:ring-green-700 mt-1 cursor-pointer"
                  required
                />
                <label
                  htmlFor="agreedToTerms"
                  className="ml-3 text-sm text-gray-600"
                >
                  I agree to the
                  <a
                    href="#"
                    className="font-medium text-green-700 hover:text-green-800 ml-1"
                  >
                    Terms of Service
                  </a>
                  and
                  <a
                    href="#"
                    className="font-medium text-green-700 hover:text-green-800 ml-1"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Row 9: Register Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-green-900 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition duration-150 ease-in-out disabled:opacity-50"
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Register"
                )}
              </button>

              {/* Login Link */}
              <p className="mt-4 text-center text-sm text-gray-500">
                Already have an account?
                <a
                  href="login"
                  className="font-medium text-green-700 hover:text-green-800 ml-1"
                >
                  Sign In
                </a>
              </p>
            </form>
          </div>

          {/* Footer */}
          <div className="pt-10 text-center text-xs text-gray-400">
            &copy; 2024 Pamantasan ng Lungsod ng San Pablo - College of Human
            Kinetics. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
