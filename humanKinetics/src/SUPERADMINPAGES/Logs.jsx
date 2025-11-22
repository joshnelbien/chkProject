import React from "react";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";
import Footer from "./Footer";

function Logs() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={true} />

      {/* Main content area */}
<div className="flex-1 flex flex-col ml-15 md:ml-15 mt-16">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 p-4">

          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-4">LOGS</h1>
            <p className="text-gray-600 mb-6">
              Here you can manage all admin accounts, view details, and perform actions like edit or delete.
            </p>

            {/* Example Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-200">
                <thead className="bg-green-700 text-white">
                  <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Email</th>
                    <th className="px-4 py-2 border">Role</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-gray-700">
                  <tr>
                    <td className="px-4 py-2 border">1</td>
                    <td className="px-4 py-2 border">John Doe</td>
                    <td className="px-4 py-2 border">johndoe@example.com</td>
                    <td className="px-4 py-2 border">Admin</td>
                    <td className="px-4 py-2 border">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-700">
                        Edit
                      </button>
                      <button className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">2</td>
                    <td className="px-4 py-2 border">Jane Smith</td>
                    <td className="px-4 py-2 border">janesmith@example.com</td>
                    <td className="px-4 py-2 border">Admin</td>
                    <td className="px-4 py-2 border">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-700">
                        Edit
                      </button>
                      <button className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                  {/* Add more rows dynamically */}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Logs;
