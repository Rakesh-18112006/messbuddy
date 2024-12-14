import React, { useState } from "react";
import { FaFilter, FaCheckCircle, FaExclamationTriangle, FaSpinner } from "react-icons/fa";

const complaintsData = [
  { id: 1, title: "Food quality issue", status: "open", description: "The quality of food in DH1 is poor." },
  { id: 2, title: "Cleanliness in mess", status: "resolved", description: "The mess is now cleaned." },
  { id: 3, title: "Water supply problem", status: "inProgress", description: "Water supply is being fixed." },
  { id: 4, title: "Wi-Fi not working", status: "open", description: "Wi-Fi is down in the mess area." },
];

const StudentDashboard = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [complaints, setComplaints] = useState(complaintsData);

  const filterComplaints = (status) => {
    setStatusFilter(status);
    if (status === "all") {
      setComplaints(complaintsData);
    } else {
      setComplaints(complaintsData.filter(complaint => complaint.status === status));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-yellow-500 text-white";
      case "inProgress":
        return "bg-blue-500 text-white";
      case "resolved":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Student Dashboard</h1>

        {/* Filter Buttons */}
        <div className="flex justify-start space-x-4 mb-6">
          <button
            onClick={() => filterComplaints("all")}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            All Complaints
          </button>
          <button
            onClick={() => filterComplaints("open")}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Open
          </button>
          <button
            onClick={() => filterComplaints("inProgress")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            In Progress
          </button>
          <button
            onClick={() => filterComplaints("resolved")}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Resolved
          </button>
        </div>

        {/* Complaints Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((complaint) => (
            <div key={complaint.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{complaint.title}</h2>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(complaint.status)}`}
                >
                  {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                </div>
              </div>
              <p className="text-gray-700 mb-4">{complaint.description}</p>

              {/* Status Icon */}
              <div className="flex items-center space-x-2">
                {complaint.status === "open" && <FaExclamationTriangle className="text-yellow-500" />}
                {complaint.status === "inProgress" && <FaSpinner className="animate-spin text-blue-500" />}
                {complaint.status === "resolved" && <FaCheckCircle className="text-green-500" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
