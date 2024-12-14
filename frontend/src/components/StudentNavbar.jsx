import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserGraduate } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation(); // Get the current path to highlight the active link

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <ul className="flex space-x-6 text-white">
          <li>
            <Link
              to="/student-dashboard"
              className={`px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/student-dashboard' ? 'bg-blue-700' : 'hover:bg-blue-500'
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/student-profile"
              className={`px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/student-profile' ? 'bg-blue-700' : 'hover:bg-blue-500'
              }`}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/submit-complaint"
              className={`px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/submit-complaint' ? 'bg-blue-700' : 'hover:bg-blue-500'
              }`}
            >
              Submit Complaint
            </Link>
          </li>
        </ul>
        
        {/* Student Icon */}
        <div className="flex items-center space-x-2">
          <FaUserGraduate className="text-white text-2xl" />
          <span className="text-white font-semibold">Student</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
