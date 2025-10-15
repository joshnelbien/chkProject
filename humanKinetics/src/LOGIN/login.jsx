import axios from "axios";
import { BarChart2, CheckCircle, Eye, EyeOff, Sun } from "lucide-react";
import { useState } from "react";
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ LOGIN HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter both email and password.");
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

        alert("Login successful!");
        console.log("👤 Logged in user ID:", id);

        // ✅ Navigate to correct dashboard
        if (loginType === "athlete") {
          navigate(`/overView/${id}`);
        } else {
          navigate(`/admin-overview/${id}`);
        }
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Login failed!");
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
    </div>
  );
}

export default Login;
