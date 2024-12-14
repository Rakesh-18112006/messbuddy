import React, { useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle, FaArrowRight, FaEdit } from 'react-icons/fa';

const complaintsData = [
  { id: 1, message: 'Complaint regarding food quality in DH1', status: 'resolved', date: '2024-12-10' },
  { id: 2, message: 'Cleaning issue in DH3 has been addressed', status: 'in-progress', date: '2024-12-11' },
  { id: 3, message: 'Complaint about water supply in DH2', status: 'pending', date: '2024-12-12' },
  { id: 4, message: 'Noise disturbance complaint in DH4', status: 'resolved', date: '2024-12-08' },
  { id: 5, message: 'Broken elevator in DH2', status: 'rejected', date: '2024-12-09' },
];

const HigherOfficialDashboard = () => {
  const [complaints, setComplaints] = useState(complaintsData);

  const handleStatusUpdate = (id, status) => {
    // Update complaint status
    setComplaints((prevComplaints) =>
      prevComplaints.map((complaint) =>
        complaint.id === id ? { ...complaint, status } : complaint
      )
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved':
        return <FaCheckCircle className="text-green-500" />;
      case 'in-progress':
        return <FaExclamationCircle className="text-yellow-500" />;
      case 'rejected':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaExclamationCircle className="text-gray-500" />;
    }
  };

  const getStatusBackground = (status) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100';
      case 'in-progress':
        return 'bg-yellow-100';
      case 'rejected':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md space-y-6">
        <h1 className="text-3xl font-semibold text-gray-800">Higher Official Dashboard</h1>
        <p className="text-lg text-gray-600 mb-6">Welcome to the higher official dashboard. Below are the complaints with status updates.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              className={`rounded-lg shadow-md p-4 flex flex-col space-y-4 ${getStatusBackground(complaint.status)}`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(complaint.status)}
                  <p className="text-lg font-semibold text-gray-800">{complaint.message}</p>
                </div>
                <p className="text-sm text-gray-500">{complaint.date}</p>
              </div>

              <div className="flex flex-col space-y-2 mt-4">
                <button
                  onClick={() => handleStatusUpdate(complaint.id, 'resolved')}
                  className="w-full py-2 bg-green-600 text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-green-700 transition duration-300"
                >
                  <FaCheckCircle /> <span>Resolve</span>
                </button>
                <button
                  onClick={() => handleStatusUpdate(complaint.id, 'rejected')}
                  className="w-full py-2 bg-red-600 text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-red-700 transition duration-300"
                >
                  <FaTimesCircle /> <span>Reject</span>
                </button>
                <button
                  onClick={() => handleStatusUpdate(complaint.id, 'in-progress')}
                  className="w-full py-2 bg-yellow-600 text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-yellow-700 transition duration-300"
                >
                  <FaExclamationCircle /> <span>In Progress</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HigherOfficialDashboard;
