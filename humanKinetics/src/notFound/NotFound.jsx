import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-9xl font-extrabold text-red-500">404</h1>
      <h2 className="text-2xl md:text-4xl font-semibold mt-4">
        Oops! Page not found
      </h2>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Home
      </button>
    </div>
  );
}

export default NotFound;
