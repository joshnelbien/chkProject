import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // Correct import
import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";

function MedicalRecord() {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_BBACKEND_URL;

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await axios.get(
          `${API}/userAccounts/players-profile/${id}`
        );
        setPlayer(res.data);
      } catch (err) {
        console.error("Error fetching player:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayer();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!player) return <div className="p-6">Player not found.</div>;

  const downloadPDF = () => {
    const doc = new jsPDF();
    const title = `${player.firstName} ${player.lastName} - Medical Record`;
    doc.setFontSize(18);
    doc.setTextColor(34, 139, 34);
    doc.text(title, 14, 20);

    const sections = [
      {
        title: "Personal Info",
        data: [
          ["Age/Birthday", player.bDay],
          ["Height", player.height],
          ["Weight", player.weight],
          ["Blood Type", player.bloodType],
          ["Allergies", player.allergies || "None"],
          [
            "Emergency Contact",
            `${player.emergencyName} - ${player.emergencyContact}`,
          ],
          ["Preferred Hospital", player.preferredHospital],
        ],
      },
      {
        title: "Vitals & Health",
        data: [
          ["Resting Heart Rate", player.restingHeartRate],
          ["Blood Pressure", player.bloodPressure],
          ["Chronic Illness", player.chronicIllness || "None"],
          ["Hospitalization", player.hospitalization || "None"],
          ["Surgery", player.surgery || "None"],
          ["Family History", player.familyHistory || "None"],
          ["Vaccine Record", player.vaccineRecord || "None"],
        ],
      },
      {
        title: "Medications",
        data: player.medications
          ? player.medications.split(",").map((med) => [med])
          : [["None"]],
      },
      {
        title: "Injuries & Therapy",
        data: [
          ["Injuries", player.injuries || "None"],
          ["Illnesses", player.illnesses || "None"],
          ["Sports Injuries", player.sportsInjuries || "None"],
          ["Therapy Records", player.therapyRecords || "None"],
        ],
      },
      {
        title: "Lifestyle & Fitness",
        data: [
          ["Sleep Hours", player.sleepHours || "N/A"],
          ["Diet Plan", player.dietPlan || "N/A"],
          ["Fitness Level", player.fitnessLevel || "N/A"],
          ["Last Checkup", player.lastCheckup || "N/A"],
          ["Cleared for Activity", player.clearedForActivity || "N/A"],
          ["Doctor Info", player.doctorInfo || "N/A"],
        ],
      },
    ];

    let y = 30;
    sections.forEach((section) => {
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(section.title, 14, y);
      y += 6;

      autoTable(doc, {
        startY: y,
        head: section.title === "Medications" ? [] : [["Field", "Value"]],
        body: section.data,
        theme: "grid",
        styles: { fontSize: 12 },
        margin: { left: 14, right: 14 },
        headStyles: { fillColor: [34, 139, 34] },
      });

      y = doc.lastAutoTable.finalY + 10;
    });

    doc.save(`${player.firstName}_${player.lastName}_MedicalRecord.pdf`);
  };

  const personalInfo = [
    { label: "Age/Birthday", value: player.bDay },
    { label: "Height", value: player.height },
    { label: "Weight", value: player.weight },
    { label: "Blood Type", value: player.bloodType },
    { label: "Allergies", value: player.allergies || "None" },
    {
      label: "Emergency Contact",
      value: `${player.emergencyName} - ${player.emergencyContact}`,
    },
    { label: "Preferred Hospital", value: player.preferredHospital },
  ];

  const vitals = [
    { label: "Resting Heart Rate", value: player.restingHeartRate },
    { label: "Blood Pressure", value: player.bloodPressure },
    { label: "Chronic Illness", value: player.chronicIllness || "None" },
    { label: "Hospitalization", value: player.hospitalization || "None" },
    { label: "Surgery", value: player.surgery || "None" },
    { label: "Family History", value: player.familyHistory || "None" },
    { label: "Vaccine Record", value: player.vaccineRecord || "None" },
  ];

  const medications = player.medications
    ? player.medications.split(",")
    : ["None"];

  const injuries = [
    { label: "Injuries", value: player.injuries || "None" },
    { label: "Illnesses", value: player.illnesses || "None" },
    { label: "Sports Injuries", value: player.sportsInjuries || "None" },
    { label: "Therapy Records", value: player.therapyRecords || "None" },
  ];

  const lifestyle = [
    { label: "Sleep Hours", value: player.sleepHours || "N/A" },
    { label: "Diet Plan", value: player.dietPlan || "N/A" },
    { label: "Fitness Level", value: player.fitnessLevel || "N/A" },
    { label: "Last Checkup", value: player.lastCheckup || "N/A" },
    {
      label: "Cleared for Activity",
      value: player.clearedForActivity || "N/A",
    },
    { label: "Doctor Info", value: player.doctorInfo || "N/A" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-grow mt-16 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-green-700">
              {player.firstName} {player.lastName} - Medical Record
            </h1>
            <button
              onClick={downloadPDF}
              className="px-4 py-2 rounded-lg bg-green-700 text-white font-semibold shadow"
            >
              Download Record (PDF)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow space-y-3">
              <h2 className="font-bold text-lg mb-2">Personal Info</h2>
              {personalInfo.map((item, idx) => (
                <p key={idx}>
                  <strong>{item.label}:</strong> {item.value}
                </p>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow space-y-3">
              <h2 className="font-bold text-lg mb-2">Vitals & Health</h2>
              {vitals.map((item, idx) => (
                <p key={idx}>
                  <strong>{item.label}:</strong> {item.value}
                </p>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="font-bold text-lg mb-2">Medications</h2>
              <ul className="list-disc list-inside space-y-1">
                {medications.map((med, idx) => (
                  <li key={idx}>{med}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="font-bold text-lg mb-2">Injuries & Therapy</h2>
              {injuries.map((item, idx) => (
                <p key={idx}>
                  <strong>{item.label}:</strong> {item.value}
                </p>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="font-bold text-lg mb-2">Lifestyle & Fitness</h2>
              {lifestyle.map((item, idx) => (
                <p key={idx}>
                  <strong>{item.label}:</strong> {item.value}
                </p>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default MedicalRecord;
