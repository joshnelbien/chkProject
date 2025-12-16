import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";

function Staff() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [staff, setStaff] = useState([]);
  const API = import.meta.env.VITE_BBACKEND_URL;

  useEffect(() => {
    axios
      .get(`${API}/staffs/staff`)
      .then(res => setStaff(res.data))
      .catch(err => console.error(err));
  }, []);

  const groupedStaff = (position) =>
    staff.filter(s => s.position === position);

  /* ---------------- COMPONENTS ---------------- */

  const Avatar = ({ image }) => (
    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center shrink-0">
      {image ? (
        <img src={image} alt="Staff" className="w-full h-full object-cover" />
      ) : (
        <span className="text-xs text-gray-500">No Image</span>
      )}
    </div>
  );

  const StaffCard = ({ staff }) => (
    <div className="bg-white rounded-xl shadow-md p-5 flex gap-2 hover:shadow-xl transition transform hover:-translate-y-1">
      <Avatar image={staff.imageURL} />

      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800">
          {staff.firstName || "—"} {staff.lastName || ""}
        </h3>

        <span className="text-sm font-medium text-green-700 mb-1">
          {staff.position || "Position not specified"}
        </span>

        <p className="text-sm text-gray-600">
          {staff.description?.trim()
            ? staff.description
            : "No description provided."}
        </p>
      </div>
    </div>
  );

  const Section = ({ title, position }) => {
    const items = groupedStaff(position);

    return (
      <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-green-50 via-white to-green-50 shadow-inner">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b border-green-200 pb-2">
          {title}
        </h2>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl p-6 shadow text-gray-500 italic text-center">
            No records available.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(s => (
              <StaffCard key={s.id} staff={s} />
            ))}
          </div>
        )}
      </div>
    );
  };

  /* ---------------- LAYOUT ---------------- */

  return (
    <div className="flex min-h-screen bg-green-50">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className={`flex flex-col flex-1 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-grow p-6 mt-16">
          <h1 className="text-3xl font-bold text-green-700 mb-10 text-center">
            PLSP Leadership & Staff
          </h1>

          <Section
            title="CITY MAYOR/CHAIR, PLSP BOARD OF REGENTS"
            position="CITY MAYOR/CHAIR, PLSP BOARD OF REGENTS"
          />

          <Section
            title="EXECUTIVE ASSISTANT FOR PLSP"
            position="EXECUTIVE ASSISTANT FOR PLSP"
          />

          <Section
            title="UNIVERSITY PRESIDENT"
            position="UNIVERSITY PRESIDENT"
          />

          <Section
            title="COLLEGE ADMINISTRATOR"
            position="COLLEGE ADMINISTRATOR"
          />

          <Section
            title="DIRECTOR, INSTITUTE OF HUMAN KINETICS"
            position="DIRECTOR, INSTITUTE OF HUMAN KINETICS"
          />

          <Section
            title="SECRETARY IHK"
            position="SECRETARY IHK"
          />

          <Section
            title="DEAN COLLEGE OF TEACHER EDUCATION"
            position="DEAN COLLEGE OF TEACHER EDUCATION"
          />

          <Section
            title="PE LECTURERS AND SPORTS COACHES"
            position="PE LECTURERS AND SPORTS COACHES"
          />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Staff;
