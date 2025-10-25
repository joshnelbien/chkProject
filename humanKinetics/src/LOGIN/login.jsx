import axios from "axios";
import { BarChart2, CheckCircle, Eye, EyeOff, Sun, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState("athlete"); // athlete | admin
  const [loading, setLoading] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showNoAccountModal, setShowNoAccountModal] = useState(false);
  const [showMissingFieldsModal, setShowMissingFieldsModal] = useState(false);
  const [showWrongPasswordModal, setShowWrongPasswordModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loggedInId, setLoggedInId] = useState(null);

  const timeoutRef = useRef(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const SuccessModal = ({ isOpen, loginType }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Login Successful!</h3>
            <p className="text-gray-600 mb-2">
              Welcome back! {loginType === "athlete" ? "Athlete" : "Admin"}
            </p>
            <p className="text-gray-500 text-sm">
              Redirecting to your dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  };

  const VerificationModal = ({ isOpen, onClose, onOpenGmail }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Email Verification Required</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition duration-150"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-gray-600 mb-2">
            Please verify your email address before signing in.
          </p>
          <p className="text-gray-600 mb-6">
            Check your inbox for the verification link we sent you.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onOpenGmail}
              className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-150 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Open Gmail
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2.5 px-4 rounded-lg font-medium hover:bg-gray-400 transition duration-150 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const NoAccountModal = ({ isOpen, onClose, loginType }) => {
    if (!isOpen) return null;

    const registerPath = loginType === "athlete" ? "/register" : "/adminRegister";
    const registerText = loginType === "athlete" ? "Register as Athlete" : "Register as Admin";

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Account Not Found</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition duration-150"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-gray-600 mb-2">
            No account found with this email address.
          </p>
          <p className="text-gray-600 mb-6">
            Would you like to create a new {loginType === "athlete" ? "athlete" : "admin"} account?
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => navigate(registerPath)}
              className="flex-1 bg-green-700 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-green-800 transition duration-150 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              {registerText}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2.5 px-4 rounded-lg font-medium hover:bg-gray-400 transition duration-150 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const WrongPasswordModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Incorrect Password</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition duration-150"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-gray-600 mb-2">
            The password you entered is incorrect.
          </p>
          <p className="text-gray-600 mb-6">
            Please check your password and try again.
          </p>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-green-700 text-white py-2.5 px-6 rounded-lg font-medium hover:bg-green-800 transition duration-150 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    );
  };

  const MissingFieldsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl text-center">
          {/* Title */}
          <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-4">
            Missing Information
          </h3>

          {/* Message */}
          <div className="text-left">
            <p className="text-gray-600 mb-2">
              Please enter both email and password to continue.
            </p>
            <p className="text-gray-600 mb-6">
              Both fields are required for signing in.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="bg-green-700 text-white py-2.5 px-6 rounded-lg font-medium hover:bg-green-800 transition duration-150 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleOpenGmail = () => {
    setShowVerificationModal(false);
    window.open("https://mail.google.com", "_blank");
  };

  const handleSuccessfulLogin = (id) => {
    setLoggedInId(id);
    setShowSuccessModal(true);

    // Navigate after showing success modal for 2 seconds
    timeoutRef.current = setTimeout(() => {
      if (loginType === "athlete") {
        navigate(`/overView/${id}`);
      } else {
        navigate(`/admin-overview/${id}`);
      }
    }, 2000);
  };

  // ✅ LOGIN HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setShowMissingFieldsModal(true);
      return;
    }

    setLoading(true);

    try {
      let response;

      if (loginType === "athlete") {
        // 🔹 Athlete login endpoint
        response = await axios.post(
          "http://localhost:5000/userAccounts/player-login",
          formData
        );
      } else {
        // 🔹 Admin login endpoint
        response = await axios.post(
          "http://localhost:5000/adminAccounts/admin-login",
          formData
        );
      }

      if (response.status === 200) {
        console.log("✅ Server Response:", response.data);

        // Extract ID depending on login type
        const id =
          response.data.player?.id ||
          response.data.admin?.id ||
          response.data.user?.id ||
          response.data.id ||
          response.data.user_id ||
          null;

        if (!id) {
          alert("User ID not found in response!");
          return;
        }

        console.log("👤 Logged in user ID:", id);
        handleSuccessfulLogin(id);
      }
    } catch (error) {
      console.log("🔴 Login Error Details:", {
        loginType,
        status: error.response?.status,
        data: error.response?.data,
        message: error.response?.data?.message,
        config: error.config
      });

      if (error.response) {
        const errorMessage = error.response.data.message?.toLowerCase() || "";
        const fullErrorText = JSON.stringify(error.response.data).toLowerCase();
        const statusCode = error.response.status;

        console.log("🔍 Error Analysis:", {
          errorMessage,
          fullErrorText,
          statusCode,
          loginType
        });

        // NEW LOGIC: Proper error handling sequence
        // 1. First check if account doesn't exist
        const isNoAccountError =
          errorMessage.includes("no account") ||
          errorMessage.includes("not found") ||
          errorMessage.includes("does not exist") ||
          errorMessage.includes("no user") ||
          errorMessage.includes("no admin") ||
          errorMessage.includes("user not found") ||
          errorMessage.includes("admin not found") ||
          errorMessage.includes("invalid email") ||
          fullErrorText.includes("no account") ||
          fullErrorText.includes("not found") ||
          fullErrorText.includes("does not exist") ||
          statusCode === 404;

        // 2. Then check if password is wrong
        const isWrongPasswordError =
          errorMessage.includes("invalid credentials") ||
          errorMessage.includes("incorrect password") ||
          errorMessage.includes("wrong password") ||
          errorMessage.includes("password is incorrect") ||
          errorMessage.includes("invalid password") ||
          statusCode === 401;

        // 3. Finally check if email needs verification (only if account exists and password is correct)
        const isVerificationError =
          errorMessage.includes("verify") ||
          errorMessage.includes("verification") ||
          errorMessage.includes("unverified") ||
          errorMessage.includes("not verified") ||
          errorMessage.includes("confirm your email") ||
          errorMessage.includes("email not verified") ||
          errorMessage.includes("pending verification") ||
          fullErrorText.includes("verify") ||
          fullErrorText.includes("verification") ||
          fullErrorText.includes("unverified") ||
          fullErrorText.includes("not verified") ||
          statusCode === 403;

        console.log("🔍 Error Classification:", {
          isNoAccountError,
          isWrongPasswordError,
          isVerificationError,
          loginType
        });

        // Handle errors in proper sequence
        if (isNoAccountError) {
          console.log("🔄 Showing no account modal for:", loginType);
          setShowNoAccountModal(true);
        } else if (isWrongPasswordError) {
          console.log("🔄 Showing wrong password modal for:", loginType);
          setShowWrongPasswordModal(true);
        } else if (isVerificationError) {
          console.log("🔄 Showing verification modal for:", loginType);
          setShowVerificationModal(true);
        } else {
          console.log("❌ Falling back to alert for:", loginType);
          // If no specific condition matches, show the actual error message
          alert(error.response.data.message || "Login failed!");
        }
      } else {
        alert("Unable to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 shadow-md bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center pl-4">
              <img
                src="/plsplogo.png"
                alt="PLSP Logo"
                className="h-12 w-12 rounded-full border-2 border-white"
              />
              <div className="flex flex-col text-black ml-4">
                <h1 className="text-lg md:text-xl font-semibold">
                  Pamantasan ng Lungsod ng San Pablo
                </h1>
                <h2 className="text-sm md:text-base text-gray-500">
                  College of Human Kinetics
                </h2>
              </div>
            </div>
            <div className="pr-4">
              <Sun size={24} className="text-gray-600" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center p-8 bg-gray-100">
        <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-lg shadow-lg overflow-hidden my-24">
          {/* Left Section */}
          <div className="flex-1 bg-green-900 text-white p-12 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">Welcome to E-Athleta</h1>
              <div className="space-y-6">
                <div className="bg-green-700/50 p-6 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <div className="p-1 rounded-full bg-white text-green-700">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">
                        Real-time Updates
                      </h3>
                      <p className="text-gray-100">
                        Track live competition scores and instant performance
                        metrics across all sports events.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-700/50 p-6 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <div className="p-1 rounded-full bg-white text-green-700">
                      <BarChart2 size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">
                        Performance Analytics
                      </h3>
                      <p className="text-gray-100">
                        Comprehensive analytics and insights for athletes,
                        coaches, and team management.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-lg text-gray-300 mb-4">
                Empowering athletes and coaches through excellence in sports
                education and training.
              </p>
              <div className="flex space-x-6 text-2xl font-bold">
                <div>
                  <span className="block">500+</span>
                  <span className="text-sm font-normal text-gray-200">
                    Active Athletes
                  </span>
                </div>
                <div>
                  <span className="block">50+</span>
                  <span className="text-sm font-normal text-gray-200">
                    Expert Coaches
                  </span>
                </div>
                <div>
                  <span className="block">4</span>
                  <span className="text-sm font-normal text-gray-200">
                    Sports Programs
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Login Form */}
          <div className="flex-1 bg-white p-12 flex flex-col justify-center items-center">
            {/* ✅ Toggle Login Type */}
            <div className="flex mb-6 w-full max-w-sm">
              <button
                type="button"
                onClick={() => setLoginType("athlete")}
                className={`flex-1 py-2 font-semibold rounded-l-md border ${
                  loginType === "athlete"
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 text-gray-700"
                  }`}
              >
                Athlete
              </button>
              <button
                type="button"
                onClick={() => setLoginType("admin")}
                className={`flex-1 py-2 font-semibold rounded-r-md border ${
                  loginType === "admin"
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 text-gray-700"
                  }`}
              >
                Admin
              </button>
            </div>

            {/* Avatar */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-24 w-24 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={loginType === "athlete" ? "/lexi.jpg" : "/plsplogo.png"}
                  alt="User Avatar"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              {loginType === "athlete"
                ? "Welcome Back Athlete!"
                : "Welcome Admin!"}
            </h2>
            <p className="text-gray-600 mb-6">
              {loginType === "athlete"
                ? "Sign in to access your athlete account"
                : "Sign in to access the admin dashboard"}
            </p>

            {/* LOGIN FORM */}
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <a
                href="#"
                className="block text-right text-sm text-green-700 hover:underline mb-6"
              >
                Forgot Password?
              </a>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-700 text-white py-3 rounded-md font-semibold hover:bg-green-800 transition-colors"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              {loginType === "athlete" ? (
                <p className="text-center text-gray-500 mt-4">
                  Don't have an account?{" "}
                  <a
                    href="/register"
                    className="text-green-700 font-semibold hover:underline"
                  >
                    Register Now
                  </a>
                </p>
              ) : (
                <p className="text-center text-gray-500 mt-4">
                  Don’t have an admin account?{" "}
                  <a
                    href="/adminRegister"
                    className="text-green-700 font-semibold hover:underline"
                  >
                    Register as Admin
                  </a>
                </p>
              )}
            </form>
          </div>
        </div>
      </main>

      <footer className="w-full py-4 text-center text-gray-500 text-sm bg-white">
        <p className="text-gray-500">
          &copy; 2024 Pamantasan ng Lungsod ng San Pablo - College of Human
          Kinetics. All rights reserved.
        </p>
      </footer>

      <SuccessModal
        isOpen={showSuccessModal}
        loginType={loginType}
      />
      <VerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        onOpenGmail={handleOpenGmail}
      />
      <NoAccountModal
        isOpen={showNoAccountModal}
        onClose={() => setShowNoAccountModal(false)}
        loginType={loginType}
      />
      <WrongPasswordModal
        isOpen={showWrongPasswordModal}
        onClose={() => setShowWrongPasswordModal(false)}
      />
      <MissingFieldsModal
        isOpen={showMissingFieldsModal}
        onClose={() => setShowMissingFieldsModal(false)}
      />
    </div>
  );
}

export default Login;
