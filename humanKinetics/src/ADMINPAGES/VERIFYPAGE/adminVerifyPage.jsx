
function AdminVerifyEmail() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-700 mb-2">
          Admin Email Verified 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Your email has been successfully verified!
        </p>
        <a
          href="/login"
          className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
}

export default AdminVerifyEmail;
