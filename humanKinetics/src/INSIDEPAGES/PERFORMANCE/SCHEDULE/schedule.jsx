import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";
function Schedule() {
  return (
           <>
      <Sidebar />
      <Navbar />
      <div className="ml-64 mt-16 flex flex-col min-h-screen bg-gray-100">
        {/* Main Content */}
        <main className="flex-grow p-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-semibold mb-4">SCHEDULE</h1>
            <p>
              This is the main content area. Add your charts, tables, and other
              overview details here.
            </p>
          </div>
        </main>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </>
  )
}

export default Schedule