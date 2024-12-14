import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle, FaFilter, FaArrowRight } from 'react-icons/fa';
import { format } from 'date-fns';

const complaintsData = [
  { id: 1, message: 'Complaint regarding food quality in DH1', status: 'resolved', date: '2024-12-10' },
  { id: 2, message: 'Cleaning issue in DH3 has been addressed', status: 'in-progress', date: '2024-12-11' },
  { id: 3, message: 'Complaint about water supply in DH2', status: 'pending', date: '2024-12-12' },
  { id: 4, message: 'Noise disturbance complaint in DH4', status: 'resolved', date: '2024-12-08' },
  { id: 5, message: 'Broken elevator in DH2', status: 'rejected', date: '2024-12-09' },
];

const MrDashboard = () => {
  const [complaints, setComplaints] = useState(complaintsData);
  const [filteredComplaints, setFilteredComplaints] = useState(complaintsData);
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });

  useEffect(() => {
    // Apply date filtering logic if needed
    if (dateFilter.start && dateFilter.end) {
      const filtered = complaints.filter((complaint) => {
        const complaintDate = new Date(complaint.date);
        return complaintDate >= new Date(dateFilter.start) && complaintDate <= new Date(dateFilter.end);
      });
      setFilteredComplaints(filtered);
    } else {
      setFilteredComplaints(complaints);
    }
  }, [dateFilter, complaints]);

  const handleSendToHigherAuthority = (id) => {
    // Logic to send the complaint to higher authority
    console.log(`Complaint ${id} sent to higher authority`);
  };

  const handleRejectComplaint = (id) => {
    // Logic to reject the complaint
    console.log(`Complaint ${id} rejected`);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

  const getCardBgColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100'; // Light green for resolved complaints
      case 'in-progress':
        return 'bg-yellow-100'; // Light yellow for in-progress complaints
      case 'rejected':
        return 'bg-red-100'; // Light red for rejected complaints
      default:
        return 'bg-gray-100'; // Light gray for other statuses
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">MR Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div>
              <input
                type="date"
                name="start"
                value={dateFilter.start}
                onChange={handleDateChange}
                className="px-4 py-2 border rounded-md"
              />
              <input
                type="date"
                name="end"
                value={dateFilter.end}
                onChange={handleDateChange}
                className="ml-2 px-4 py-2 border rounded-md"
              />
            </div>
            <FaFilter className="text-gray-500 cursor-pointer" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComplaints.map((complaint) => (
            <div
              key={complaint.id}
              className={`rounded-lg shadow-md p-4 flex flex-col space-y-4 ${getCardBgColor(complaint.status)}`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(complaint.status)}
                  <p className="text-lg font-semibold text-gray-800">{complaint.message}</p>
                </div>
                <p className="text-sm text-gray-500">{format(new Date(complaint.date), 'dd MMM yyyy')}</p>
              </div>
              <div className="flex justify-between items-center space-x-4">
                <button
                  onClick={() => handleSendToHigherAuthority(complaint.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 w-full"
                >
                  <FaArrowRight />
                  <span>Send</span>
                </button>
                <button
                  onClick={() => handleRejectComplaint(complaint.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 w-full"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MrDashboard;
