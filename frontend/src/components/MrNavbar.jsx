import React, { useState } from 'react';
import { FaUserAlt, FaHome, FaBell, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MrNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-800 text-white w-full p-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo and Icon */}
        <div className="flex items-center space-x-2">
          <FaUserAlt className="text-white text-2xl" />
          <span className="text-xl font-semibold">Mess Representative</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/mess-authority-dashboard"
            className="hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300"
          >
            <FaHome className="inline-block mr-2" />
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300"
          >
            <FaUserAlt className="inline-block mr-2" />
            Profile
          </Link>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white text-2xl focus:outline-none"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <Link
            to="/mr-dashboard"
            className="block text-center hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300"
            onClick={toggleMenu}
          >
            <FaHome className="inline-block mr-2" />
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="block text-center hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300"
            onClick={toggleMenu}
          >
            <FaUserAlt className="inline-block mr-2" />
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default MrNavbar;
