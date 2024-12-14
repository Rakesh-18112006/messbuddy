import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUtensils } from 'react-icons/fa'; // You can use a meals icon here

const Navbar = () => {
  const { user } = useContext(AuthContext); // Check if user is authenticated

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Logo on the left */}
      <div className="flex items-center space-x-2">
        <FaUtensils className="text-3xl" />
        <span className="text-xl font-bold">MessBuddy</span>
      </div>

      {/* Links: show login and register if not authenticated */}
      {!user ? (
        <div className="flex space-x-6">
          <Link to="/login" className="hover:text-blue-200 text-lg font-semibold">Login</Link>
          <Link to="/register" className="hover:text-blue-200 text-lg font-semibold">Register</Link>
        </div>
      ) : (
        <div className="flex space-x-6">
          {/* This can be replaced with authenticated user links */}
          <Link to="/profile" className="hover:text-blue-200">Profile</Link>
          <Link to="/student-dashboard" className="hover:text-blue-200">Dashboard</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
