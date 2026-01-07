import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowLeft, Mail, Sun } from "lucide-react";

function ForgotPassword() {
  const API = import.meta.env.VITE_BBACKEND_URL;
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email) {
    setError("Please enter your email address.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    // This must match the router.post("/forgot-password", ...) path in your Express app
    const response = await axios.post(`${API}/forgot-password/forgot-password`, { email });
    
    if (response.status === 200) {
      setSubmitted(true);
    }
  } catch (err) {
    console.error("Forgot Password Error:", err);
    // This captures the 'No account found' or 'Server error' from the backend
    setError(
      err.response?.data?.message || "Internal server error. Please try again later."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navigation Bar (Consistent with Login) */}
      <nav className="fixed top-0 left-0 w-full z-50 shadow-md bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center pl-4">
              <img src="/plsplogo.png" alt="PLSP Logo" className="h-12 w-12 rounded-full border-2 border-white" />
              <div className="flex flex-col text-black ml-4">
                <h1 className="text-lg md:text-xl font-semibold">Pamantasan ng Lungsod ng San Pablo</h1>
                <h2 className="text-sm md:text-base text-gray-500">Institute of Human Kinetics</h2>
              </div>
            </div>
            <div className="pr-4"><Sun size={24} className="text-gray-600" /></div>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center p-8 mt-20">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            {!submitted ? (
              <>
                <div className="mb-6">
                  <button 
                    onClick={() => navigate("/login")}
                    className="flex items-center text-green-700 hover:text-green-800 transition-colors font-medium mb-4"
                  >
                    <ArrowLeft size={18} className="mr-2" /> Back to Login
                  </button>
                  <h2 className="text-3xl font-bold text-gray-800">Forgot Password?</h2>
                  <p className="text-gray-600 mt-2">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-all disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Check Your Email</h2>
                <p className="text-gray-600 mb-8">
                  We have sent a password reset link to <br />
                  <span className="font-semibold text-gray-800">{email}</span>
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-all"
                >
                  Return to Login
                </button>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-sm text-gray-500 hover:text-green-700 font-medium"
                >
                  Didn't receive the email? Try again
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="w-full py-6 text-center text-gray-500 text-sm bg-white border-t">
        <p>&copy; 2024 PLSP - Institute of Human Kinetics. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ForgotPassword;