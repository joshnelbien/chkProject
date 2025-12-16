import React from "react";

function SuccessModal({ message = "Action completed successfully!", onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-11/12 md:w-1/3 shadow-lg text-center">
        
        {/* Icon */}
        <div className="text-4xl mb-3">✅</div>

        {/* Message */}
        <p className="text-gray-800 text-lg mb-6">
          {message}
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
