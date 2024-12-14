import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getNotifications } from '../services/notificationsService';
import Notification from '../components/Notification';
import { FaUserAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getNotifications()
        .then(data => {
          setNotifications(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Failed to fetch notifications', error);
          setLoading(false);
        });
    } else {
      // Default notifications about resolved complaints
      setNotifications([
        { id: 1, message: 'Complaint regarding food quality in DH1 has been resolved.' },
        { id: 2, message: 'Cleaning issue in DH3 has been addressed and resolved.' },
        { id: 3, message: 'Complaint about water supply in DH2 has been resolved successfully.' },
        { id: 4, message: 'Maintenance issue in DH4 has been resolved successfully.' },
        { id: 5, message: 'Complaint regarding noise disturbance in DH1 has been resolved.' }
      ]);
      setLoading(false);
    }
  }, [user]);

  const handleLogout = () => {
    logout();  // Clear user data from context and localStorage
  };

  const roleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <FaCog className="text-yellow-600" />;
      case 'manager':
        return <FaUserAlt className="text-green-600" />;
      default:
        return <FaUserAlt className="text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800">User Profile</h1>
        </div>

        {user ? (
          <>
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="bg-gray-200 rounded-full p-6">
                {roleIcon(user.role)}
              </div>
              <div>
                <p className="text-xl font-medium text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">Role: {user.role}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Notifications</h2>
              {loading ? (
                <p className="text-center text-gray-600">Loading notifications...</p>
              ) : (
                <div className="space-y-2">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <Notification key={notification.id} message={notification.message} />
                    ))
                  ) : (
                    <p className="text-center text-gray-500">No new notifications</p>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleLogout}
                className="flex items-center px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600">Loading user profile...</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
