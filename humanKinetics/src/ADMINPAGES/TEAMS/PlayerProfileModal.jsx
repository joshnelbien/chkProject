import React from "react";

function PlayerProfileModal({ player, onClose }) {
  if (!player) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[70]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-green-700">Player Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Top Section */}
        <div className="flex gap-4 items-center mb-5">
          <img
            src={
              player.profilePicture
                ? `data:image/jpeg;base64,${player.profilePicture}`
                : "https://via.placeholder.com/120"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border"
          />
          <div>
            <p className="text-2xl font-bold">
              {player.firstName} {player.lastName}
            </p>
            <p className="text-gray-600 text-sm">{player.sport} • {player.course}</p>
            <p className="text-sm font-medium text-yellow-600">Status: {player.status}</p>
          </div>
        </div>

        {/* Information Sections */}
        <div className="grid grid-cols-2 gap-4">
          {/* Personal Info */}
          <section className="border p-3 rounded-lg">
            <h3 className="font-semibold text-green-700 mb-2">Personal Info</h3>
            <p><b>Student No.:</b> {player.studentNumber}</p>
            <p><b>Email:</b> {player.email}</p>
            <p><b>Birthday:</b> {player.bDay}</p>
            <p><b>Year Level:</b> {player.yearLevel}</p>
          </section>

          {/* Sports Info */}
          <section className="border p-3 rounded-lg">
            <h3 className="font-semibold text-green-700 mb-2">Sports Info</h3>
            <p><b>Jersey No:</b> {player.jerseyNo}</p>
            <p><b>Sport:</b> {player.sport}</p>
            <p><b>Position:</b> {player.position}</p>
          </section>

          {/* Health Information */}
          <section className="border p-3 rounded-lg col-span-2">
            <h3 className="font-semibold text-green-700 mb-2">Health Information</h3>
            <p><b>Height:</b> {player.height}</p>
            <p><b>Weight:</b> {player.weight}</p>
            <p><b>BMI:</b> {player.bmi}</p>
            <p><b>Blood Type:</b> {player.bloodType}</p>
            <p><b>Allergies:</b> {player.allergies}</p>
            <p><b>Chronic Illness:</b> {player.chronicIllness}</p>
            <p><b>Medications:</b> {player.medications}</p>
            <p><b>Sports Injuries:</b> {player.sportsInjuries}</p>
          </section>

          {/* Emergency */}
          <section className="border p-3 rounded-lg col-span-2">
            <h3 className="font-semibold text-red-600 mb-2">
              Emergency Contact
            </h3>
            <p><b>Name:</b> {player.emergencyName}</p>
            <p><b>Relation:</b> {player.emergencyRelation}</p>
            <p><b>Address:</b> {player.emergencyAddress}</p>
            <p><b>Contact:</b> {player.emergencyContact}</p>
          </section>
        </div>

        <div className="flex justify-end mt-5">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerProfileModal;
