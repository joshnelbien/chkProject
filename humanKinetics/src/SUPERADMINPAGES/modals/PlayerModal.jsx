import React from "react";

export default function PlayerModal({ player, onClose }) {
  if (!player) return null;

  // Helper function to display N/A for null or empty values
  const display = (value) => (value ? value : "N/A");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-11/12 md:w-3/4 lg:w-2/3 p-6 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center">
            {display(player.firstName)} {display(player.lastName)}
          </h2>
          <span className="text-green-600 font-semibold mt-1">
            {display(player.sport)?.toUpperCase()}
          </span>
        </div>

        {/* Status Badge */}
        <div className="flex justify-center gap-4 mb-6">
          <span
            className={`px-4 py-1 rounded-full font-medium text-white ${
              player.status === "Active" ? "bg-green-600" : "bg-gray-400"
            }`}
          >
            {display(player.status)}
          </span>
        </div>

        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div className="p-4 border-l-4 border-green-600 shadow-sm rounded-md">
            <h3 className="text-lg font-bold mb-2 text-green-700">Basic Info</h3>
            <p><strong>Email:</strong> {display(player.email)}</p>
            <p><strong>Student Number:</strong> {display(player.studentNumber)}</p>
            <p><strong>Course:</strong> {display(player.course)}</p>
            <p><strong>Year Level:</strong> {display(player.yearLevel)}</p>
            <p><strong>Jersey No:</strong> {display(player.jerseyNo)}</p>
            <p><strong>Position:</strong> {display(player.position)}</p>
            <p><strong>Birthday:</strong> {display(player.bDay)}</p>
          </div>

          {/* Health Info */}
          <div className="p-4 border-l-4 border-green-600 shadow-sm rounded-md">
            <h3 className="text-lg font-bold mb-2 text-green-700">Health Info</h3>
            <p><strong>Height:</strong> {display(player.height)} cm</p>
            <p><strong>Weight:</strong> {display(player.weight)} kg</p>
            <p><strong>BMI:</strong> {display(player.bmi)}</p>
            <p><strong>Blood Type:</strong> {display(player.bloodType)}</p>
            <p><strong>Resting Heart Rate:</strong> {display(player.restingHeartRate)}</p>
            <p><strong>Blood Pressure:</strong> {display(player.bloodPressure)}</p>
            <p><strong>Allergies:</strong> {display(player.allergies)}</p>
          </div>

          {/* Medical & Sports History */}
          <div className="p-4 border-l-4 border-green-600 shadow-sm rounded-md md:col-span-2">
            <h3 className="text-lg font-bold mb-2 text-green-700">Medical & Sports History</h3>
            <p><strong>Chronic Illness:</strong> {display(player.chronicIllness)}</p>
            <p><strong>Hospitalization:</strong> {display(player.hospitalization)}</p>
            <p><strong>Surgery:</strong> {display(player.surgery)}</p>
            <p><strong>Family History:</strong> {display(player.familyHistory)}</p>
            <p><strong>Vaccine Record:</strong> {display(player.vaccineRecord)}</p>
            <p><strong>Sports Injuries:</strong> {display(player.sportsInjuries)}</p>
            <p><strong>Therapy Records:</strong> {display(player.therapyRecords)}</p>
          </div>

          {/* Fitness Stats */}
          <div className="p-4 border-l-4 border-green-600 shadow-sm rounded-md md:col-span-2">
            <h3 className="text-lg font-bold mb-2 text-green-700">Fitness & Training Stats</h3>
            <p><strong>Strength:</strong> {display(player.strength)}</p>
            <p><strong>Speed:</strong> {display(player.speed)}</p>
            <p><strong>Agility:</strong> {display(player.agility)}</p>
            <p><strong>Endurance:</strong> {display(player.endurance)}</p>
            <p><strong>Fitness Level:</strong> {display(player.fitnessLevel)}</p>
            <p><strong>Sleep Hours:</strong> {display(player.sleepHours)}</p>
            <p><strong>Diet Plan:</strong> {display(player.dietPlan)}</p>
          </div>

          {/* Emergency Contact */}
          <div className="p-4 border-l-4 border-green-600 shadow-sm rounded-md md:col-span-2">
            <h3 className="text-lg font-bold mb-2 text-green-700">Emergency Contact</h3>
            <p><strong>Name:</strong> {display(player.emergencyName)}</p>
            <p><strong>Relation:</strong> {display(player.emergencyRelation)}</p>
            <p><strong>Address:</strong> {display(player.emergencyAddress)}</p>
            <p><strong>Contact:</strong> {display(player.emergencyContact)}</p>
            <p><strong>Preferred Hospital:</strong> {display(player.preferredHospital)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
