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
    <div className="bg-white rounded-xl shadow p-5 flex gap-4 hover:shadow-lg transition">
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
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {title}
        </h2>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl p-6 shadow text-gray-500 italic">
            No records available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className={`flex flex-col flex-1 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-grow p-6 mt-16">
          <h1 className="text-2xl font-bold text-green-700 mb-8">
            PLSP Leadership & Staff
          </h1>

          <Section
            title="School Founder"
            position="School Founder"
          />

          <Section
            title="Sports Dean"
            position="Sports Dean"
          />

          <Section
            title="Head Coaches"
            position="Head Coach"
          />

          <Section
            title="CHK Teachers"
            position="CHK Teacher"
          />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Staff;
