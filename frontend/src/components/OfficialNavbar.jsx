import React from 'react';
import { FaHome, FaUserCircle, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const OfficialNavbar = () => {
  return (
    <nav className="bg-blue-600 text-white w-full p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <FaUsers className="text-2xl" />
          <h1 className="text-2xl font-bold">Official Dashboard</h1>
        </div>
        <div className="hidden md:flex items-center space-x-6">

          <Link to="/profile" className="flex items-center space-x-2 hover:text-blue-200">
            <FaUserCircle className="text-xl" />
            <span>Profile</span>
          </Link>
          <Link to="/higher-official-dashboard" className="flex items-center space-x-2 hover:text-blue-200">
            <FaUsers className="text-xl" />
            <span>Higher Official Dashboard</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white text-3xl">
            &#9776;
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden mt-4 space-y-4">
        <Link to="/official-dashboard" className="block text-xl text-center hover:text-blue-200">
          Official Dashboard
        </Link>
        <Link to="/profile" className="block text-xl text-center hover:text-blue-200">
          Profile
        </Link>
        <Link to="/higher-official-dashboard" className="block text-xl text-center hover:text-blue-200">
          Higher Official Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default OfficialNavbar;
