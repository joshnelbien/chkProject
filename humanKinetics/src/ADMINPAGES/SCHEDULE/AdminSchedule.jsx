import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";

function AdminSchedule() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="ml-64 mt-16 flex flex-col min-h-screen bg-gray-100">
        {/* Main Content */}
        <main className="flex-grow p-6">
          {/* Performance Overview Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              Admin Schedule
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"></div>
          </div>
        </main>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </>
  );
}

export default AdminSchedule;
