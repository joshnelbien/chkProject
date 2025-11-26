/* eslint-disable no-unused-vars */
import {
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Loader,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PasswordInputWithToggle = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="mt-1 relative">
        <input
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
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-green-700 transition duration-150 disabled:opacity-50"
        >
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

const StatusMessage = ({ type, message, onClose }) => {
  if (!message) return null;
  const isSuccess = type === "success";
  const bg = isSuccess
    ? "bg-green-100 border-green-400 text-green-700"
    : "bg-red-100 border-red-400 text-red-700";
  const Icon = isSuccess ? CheckCircle : AlertTriangle;

  return (
    <div className={`relative p-4 mb-4 text-sm border rounded-lg ${bg}`}>
      <div className="flex items-start">
        <Icon className="h-5 w-5 mr-3 mt-0.5" />
        <p className="font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 p-1 rounded-full text-gray-500 hover:text-gray-900"
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
          Your admin account has been created successfully.
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

const AdminRegister = () => {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_BBACKEND_URL;
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    sports: "",
    experience: "",
    education: "",
    specialization: "",
    achievements: "",
    email: "", // ✅ Added email field
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: null });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setStatus({ type: null, message: null });
  };

  const handleLoginRedirect = () => {
    setShowSuccessModal(false);
    navigate("/login");
  };

  const handleOpenGmail = () => {
    setShowSuccessModal(false);
    window.open("https://mail.google.com", "_blank");
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    if (!formData.agreedToTerms) {
      setStatus({
        type: "error",
        message: "Please agree to the Terms and Privacy Policy.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${API}/adminAccounts/admin-register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: "success", message: data.message });
        setFormData({
          lastName: "",
          firstName: "",
          middleName: "",
          sports: "",
          experience: "",
          education: "",
          specialization: "",
          achievements: "",
          email: "",
          password: "",
          confirmPassword: "",
          agreedToTerms: false,
        });
        setShowSuccessModal(true);
      } else {
        setStatus({
          type: "error",
          message: data.message || "Registration failed.",
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = isSubmitting || status.type === "success";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-inter p-4 md:p-8">
      <div className="flex flex-col md:flex-row w-full max-w-7xl h-auto md:h-[90vh] overflow-hidden rounded-xl shadow-2xl">
        {/* Left Panel */}
        <div className="w-full md:w-1/3 p-8 md:p-12 bg-green-900 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center text-sm font-semibold mb-8">
              <span className="text-xl mr-2">🏆</span> Sports Admin Portal
            </div>
            <h1 className="text-4xl font-extrabold leading-tight mb-6">
              Coach Registration
            </h1>
            <p className="text-gray-300 mb-6">
              Join our team of experienced coaches and make an impact.
            </p>
            <ul className="space-y-3 text-sm">
              {[
                "Manage sports teams",
                "Access coaching tools",
                "Coordinate with athletes",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="bg-green-700 p-1 rounded-full mr-3">
                    <svg
                      className="w-4 h-4 text-green-100"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-2/3 bg-white p-8 md:p-12 overflow-y-auto">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => navigate("/login")}
              className="text-gray-400 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900">
              Register as Admin
            </h2>
            <p className="mt-2 text-sm text-gray-500 mb-6">
              Fill out the form below
            </p>

            <StatusMessage
              type={status.type}
              message={status.message}
              onClose={() => setStatus({ type: null, message: null })}
            />

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["lastName", "firstName", "middleName"].map((field, idx) => (
                  <div key={field} className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">
                      {field === "lastName"
                        ? "Last Name *"
                        : field === "firstName"
                        ? "First Name *"
                        : "Middle Name (Optional)"}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required={field !== "middleName"}
                      disabled={isDisabled}
                      className="mt-1 px-4 py-2 border rounded-lg focus:ring-green-700 focus:border-green-700 text-sm shadow-sm"
                    />
                  </div>
                ))}
              </div>

              {/* Sports */}
             <div className="flex flex-col">
                <label
                  htmlFor="sports"
                  className="text-sm font-medium text-gray-700"
                >
                  Preferred Sport <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative">
                  <select
                    id="sports"
                    name="sports"
                    value={formData.sports}
                    onChange={handleChange}
                    required
                    disabled={isDisabled}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-700 focus:border-green-700 transition duration-150 shadow-sm text-sm appearance-none bg-white cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed"
                  >
                    <option value="" disabled>
                      Select Sport
                    </option>
                    <option value="Basketball">Basketball</option>
                    <option value="Volleyball">Volleyball</option>
                    <option value="Futsal">Futsal</option>
                    <option value="Sepak Takraw">Sepak Takraw</option>
                    <option value="Table Tennis">Table Tennis</option>
                    <option value="Badminton">Badminton</option>
                    <option value="Taekwondo">Taekwondo</option>
                    <option value="Arnis">Arnis</option>
                    <option value="Karate-Do">Karate-Do</option>
                  </select>
                </div>
                </div>

              {/* Textareas */}
              {[
                "experience",
                "education",
                "specialization",
                "achievements",
              ].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 capitalize">
                    {field} *
                  </label>
                  <textarea
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    disabled={isDisabled}
                    rows={3}
                    className="mt-1 px-4 py-2 border rounded-lg focus:ring-green-700 focus:border-green-700 text-sm shadow-sm"
                  />
                </div>
              ))}

              {/* ✅ Email */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isDisabled}
                  placeholder="example@email.com"
                  className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-700 focus:border-green-700 text-sm shadow-sm"
                />
              </div>

              {/* Password */}
              <PasswordInputWithToggle
                id="password"
                name="password"
                label="Password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={isDisabled}
              />
              <PasswordInputWithToggle
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isDisabled}
              />

              {/* Terms */}
              <div className="flex items-start pt-2">
                <input
                  id="agreedToTerms"
                  name="agreedToTerms"
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  disabled={isDisabled}
                  required
                  className="h-4 w-4 text-green-900 border-gray-300 rounded focus:ring-green-900 mt-1 cursor-pointer"
                />
                <label
                  htmlFor="agreedToTerms"
                  className="ml-3 text-sm text-gray-600"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="font-medium text-green-700 hover:text-green-800"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="font-medium text-green-700 hover:text-green-800"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.agreedToTerms}
                className="w-full flex justify-center items-center py-3 px-4 rounded-lg text-lg font-medium text-white bg-green-900 hover:bg-green-800 focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition disabled:opacity-50 mt-6"
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
            </form>
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

export default AdminRegister;