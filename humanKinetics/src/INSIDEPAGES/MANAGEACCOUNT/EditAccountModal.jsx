import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function EditAccountModal({ open, onClose, player, onSave }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    studentNumber: "",
    course: "",
    yearLevel: "",
    sport: "",

    // 🩺 Basic Health Info
    height: "",
    weight: "",
    bmi: "",
    bloodType: "",
    restingHeartRate: "",
    bloodPressure: "",
    allergies: "",

    // 📜 Medical History
    chronicIllness: "",
    hospitalization: "",
    surgery: "",
    familyHistory: "",
    vaccineRecord: "",

    // 💊 Current Health Status
    medications: "",
    injuries: "",
    illnesses: "",
    sleepHours: "",
    dietPlan: "",
    fitnessLevel: "",
    lastCheckup: "",
    clearedForActivity: "",
    doctorInfo: "",

    // ⚽ Sports Related Health Data
    sportsInjuries: "",
    therapyRecords: "",

    // 🚨 Emergency Info
    emergencyName: "",
    emergencyRelation: "",
    emergencyAddress: "",
    emergencyContact: "",
    preferredHospital: "",
  });

  const [profilePreview, setProfilePreview] = useState("/lexi.jpg");
  const [profileFile, setProfileFile] = useState(null);
  const fileInputRef = useRef(null);

  // 🧮 Auto-calculate BMI
  useEffect(() => {
    if (formData.height && formData.weight) {
      const heightM = formData.height / 100;
      const bmi = (formData.weight / (heightM * heightM)).toFixed(2);
      setFormData((prev) => ({ ...prev, bmi }));
    }
  }, [formData.height, formData.weight]);

  // 🧾 Load player data
  useEffect(() => {
    if (player) {
      setFormData({
        firstName: player.firstName || "",
        lastName: player.lastName || "",
        email: player.email || "",
        studentNumber: player.studentNumber || "",
        course: player.course || "",
        yearLevel: player.yearLevel || "",
        sport: player.sport || "",

        //  Basic Health Info
        height: player.height || "",
        weight: player.weight || "",
        bmi: player.bmi || "",
        bloodType: player.bloodType || "",
        restingHeartRate: player.restingHeartRate || "",
        bloodPressure: player.bloodPressure || "",
        allergies: player.allergies || "",

        //  Medical History
        chronicIllness: player.chronicIllness || "",
        hospitalization: player.hospitalization || "",
        surgery: player.surgery || "",
        familyHistory: player.familyHistory || "",
        vaccineRecord: player.vaccineRecord || "",

        //  Current Health Status
        medications: player.medications || "",
        injuries: player.injuries || "",
        illnesses: player.illnesses || "",
        sleepHours: player.sleepHours || "",
        dietPlan: player.dietPlan || "",
        fitnessLevel: player.fitnessLevel || "",
        lastCheckup: player.lastCheckup
          ? player.lastCheckup.substring(0, 10)
          : "",
        clearedForActivity: player.clearedForActivity || "",
        doctorInfo: player.doctorInfo || "",

        //  Sports Related Health Data
        sportsInjuries: player.sportsInjuries || "",
        therapyRecords: player.therapyRecords || "",

        //  Emergency Info
        emergencyName: player.emergencyName || "",
        emergencyRelation: player.emergencyRelation || "",
        emergencyAddress: player.emergencyAddress || "",
        emergencyContact: player.emergencyContact || "",
        preferredHospital: player.preferredHospital || "",
      });

      // Profile preview
      if (player?.id) {
        setProfilePreview(
          `http://localhost:5000/userAccounts/player-photo/${player.id}`
        );
      } else {
        setProfilePreview("/lexi.jpg");
      }
    }
  }, [player]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      if (profileFile) data.append("profilePicture", profileFile);

      await axios.put(
        `http://localhost:5000/userAccounts/players-update/${player.id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      onSave(formData);
      window.location.reload();
      onClose();
    } catch (error) {
      console.error("Error updating player:", error);
      alert("Failed to update player info.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4  overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl my-8 transform transition-all animate-fade-in-up">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-2xl font-semibold text-green-800 mt-20">
            Edit Account Information
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold mt-20"
          >
            ×
          </button>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mt-6 mb-6">
          <img
            src={profilePreview}
            alt="Profile Preview"
            className="w-28 h-28 rounded-full object-cover border-4 border-green-600 shadow-md"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="mt-3 px-4 py-1.5 text-sm bg-green-700 text-white rounded-lg hover:bg-green-600 transition"
          >
            Change Photo
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <hr className="my-4 border-t border-gray-400/40 mx-4" />
        {/* Scrollable Content */}
        <div className="p-6 space-y-8 overflow-y-auto max-h-[70vh]">
          {/* 🧍 Basic Info */}
          <Section title="Basic Information">
            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <InputField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              label="Student"
              name="studentNumber"
              value={formData.studentNumber}
              onChange={handleChange}
            />
            <div className="grid md:grid-cols-3 gap-4">
              <InputField
                label="Course"
                name="course"
                value={formData.course}
                onChange={handleChange}
              />
              <SelectField
                label="Year Level"
                name="yearLevel"
                value={formData.yearLevel}
                onChange={handleChange}
                options={[
                  "1st Year",
                  "2nd Year",
                  "3rd Year",
                  "4th Year",
                  "5th Year",
                ]}
              />
              <SelectField
                label="Sport"
                name="sport"
                value={formData.sport}
                onChange={handleChange}
                options={[
                  "Basketball",
                  "Volleyball",
                  "Football",
                  "Badminton",
                  "Athletics",
                  "Swimming",
                  "Tennis",
                  "Table Tennis",
                  "Taekwondo",
                  "Esports",
                ]}
              />
            </div>
          </Section>

          {/* 🩺 Basic Health Info */}
          <Section title="Basic Health Information">
            <div className="grid md:grid-cols-3 gap-4">
              <InputField
                label="Height (cm)"
                name="height"
                value={formData.height}
                onChange={handleChange}
              />
              <InputField
                label="Weight (kg)"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
              <InputField
                label="Body Mass Index (BMI)"
                name="bmi"
                value={formData.bmi}
                readOnly
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <SelectField
                label="Blood Type"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
              />
              <InputField
                label="Resting Heart Rate (bpm)"
                name="restingHeartRate"
                value={formData.restingHeartRate}
                onChange={handleChange}
              />
              <InputField
                label="Blood Pressure (mmHg)"
                name="bloodPressure"
                value={formData.bloodPressure}
                onChange={handleChange}
              />
            </div>
            <InputField
              label="Allergies (Food, Medication, Others)"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
            />
          </Section>

          {/* 📜 Medical History */}
          <Section title="Medical History">
            <SelectField
              label="Chronic Illness"
              name="chronicIllness"
              value={formData.chronicIllness}
              onChange={handleChange}
              options={[
                "None",
                "Asthma",
                "Diabetes",
                "Hypertension",
                "Heart Disease",
                "Others",
              ]}
            />
            <InputField
              label="Hospitalization (Date, Reason, Duration)"
              name="hospitalization"
              value={formData.hospitalization}
              onChange={handleChange}
            />
            <InputField
              label="Surgery (Type, Date, Remarks)"
              name="surgery"
              value={formData.surgery}
              onChange={handleChange}
            />
            <InputField
              label="Family Medical History"
              name="familyHistory"
              value={formData.familyHistory}
              onChange={handleChange}
            />
            <SelectField
              label="Vaccine Record"
              name="vaccineRecord"
              value={formData.vaccineRecord}
              onChange={handleChange}
              options={["COVID-19", "Tetanus", "Hepatitis B", "Flu", "Others"]}
            />
          </Section>

          {/* 💊 Current Health Status */}
          <Section title="Current Health Status">
            <InputField
              label="Current Medications"
              name="medications"
              value={formData.medications}
              onChange={handleChange}
            />
            <InputField
              label="Current Injuries"
              name="injuries"
              value={formData.injuries}
              onChange={handleChange}
            />
            <InputField
              label="Recent Illnesses"
              name="illnesses"
              value={formData.illnesses}
              onChange={handleChange}
            />
            <div className="grid md:grid-cols-3 gap-4">
              <InputField
                label="Sleep Hours (per day)"
                name="sleepHours"
                value={formData.sleepHours}
                onChange={handleChange}
              />
              <SelectField
                label="Fitness Level"
                name="fitnessLevel"
                value={formData.fitnessLevel}
                onChange={handleChange}
                options={["Poor", "Fair", "Good", "Excellent"]}
              />
              <InputField
                label="Last Medical Check-Up Date"
                name="lastCheckup"
                type="date"
                value={formData.lastCheckup}
                onChange={handleChange}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <SelectField
                label="Cleared for Physical Activity"
                name="clearedForActivity"
                value={formData.clearedForActivity}
                onChange={handleChange}
                options={["Yes", "No"]}
              />
              <InputField
                label="Doctor’s Name / Clinic / Contact Info"
                name="doctorInfo"
                value={formData.doctorInfo}
                onChange={handleChange}
              />
            </div>
          </Section>

          {/* ⚽ Sports Health Data */}
          <Section title="Sports Related Health Data">
            <InputField
              label="Previous Sports Injuries (Type, Body Part, Date)"
              name="sportsInjuries"
              value={formData.sportsInjuries}
              onChange={handleChange}
            />
            <InputField
              label="Physical Therapy Records"
              name="therapyRecords"
              value={formData.therapyRecords}
              onChange={handleChange}
            />
          </Section>

          {/* 🚨 Emergency Info */}
          <Section title="Emergency Information">
            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Emergency Contact Name"
                name="emergencyName"
                value={formData.emergencyName}
                onChange={handleChange}
              />
              <InputField
                label="Relationship"
                name="emergencyRelation"
                value={formData.emergencyRelation}
                onChange={handleChange}
              />
            </div>
            <InputField
              label="Address"
              name="emergencyAddress"
              value={formData.emergencyAddress}
              onChange={handleChange}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Contact Number"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
              />
              <InputField
                label="Preferred Hospital / Clinic"
                name="preferredHospital"
                value={formData.preferredHospital}
                onChange={handleChange}
              />
            </div>
          </Section>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg shadow-sm transition font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🔹 Section Wrapper */
function Section({ title, children }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-green-700 border-b border-green-200 pb-1">
        {title}
      </h3>
      {children}
    </div>
  );
}

/* 🔹 Text Input Field */
function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  readOnly = false,
}) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium text-sm mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
          readOnly
            ? "bg-gray-100"
            : "focus:ring-green-500 focus:border-green-500"
        } transition`}
      />
    </div>
  );
}

/* 🔹 Dropdown Select Field */
function SelectField({ label, name, value, onChange, options }) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium text-sm mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition bg-white"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default EditAccountModal;
