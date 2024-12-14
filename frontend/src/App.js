import React, { useState, useEffect, useContext } from 'react'; // Import useContext here
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import StudentDashboard from './roles/StudentDashboard';
import SubmitComplaint from './roles/SubmitComplaint';
import StudentNavbar from './components/StudentNavbar';  // Navbar component
import MrDashboard from './roles/MrDashboard';  // Mr Dashboard component
import HigherOfficialDashboard from './roles/HigherOfficialDashboard';  // Higher Official Dashboard component
import UnauthorizedPage from './pages/UnauthorizedPage';
import './App.css';
import MrNavbar from './components/MrNavbar';
import OfficialNavbar from './components/OfficialNavbar';
import Navbar from './components/Navbar';  // New Navbar component

// Private route wrapper to ensure the user is authenticated
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);  // Accessing the AuthContext here
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

// Role-based route component to handle different role access
const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useContext(AuthContext);  // Accessing the AuthContext here
  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  // Use useEffect to hide the splash screen after 5 seconds
  useEffect(() => {
    setTimeout(() => {
      setIsSplashVisible(false);
    }, 1534); // 5 seconds
  }, []);

  return (
    <AuthProvider>
      <Router>
        {isSplashVisible ? (
          <div className="splash-screen">
            <img src="messbuddymain.jpg" alt="Splash Image" className="w-full h-full object-cover" />
          </div>
        ) : (
          <>
            <Navbar /> {/* Navbar is added here */}
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Routes */}
              <Route path="/student-profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

              {/* Student Dashboard Route with Navbar */}
              <Route
                path="/student-dashboard"
                element={
                  <ProtectedRoute>
                    <StudentNavbar />
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Submit Complaint Route */}
              <Route
                path="/submit-complaint"
                element={
                  <ProtectedRoute>
                    <StudentNavbar />
                    <SubmitComplaint />
                  </ProtectedRoute>
                }
              />

              {/* Mr Dashboard Route */}
              <Route
                path="/mess-authority-dashboard"
                element={
                  <ProtectedRoute>
                    <RoleProtectedRoute allowedRoles={['mr']}>
                      <MrNavbar />
                      <MrDashboard />
                    </RoleProtectedRoute>
                  </ProtectedRoute>
                }
              />

              {/* Higher Official Dashboard Route */}
              <Route
                path="/higher-official-dashboard"
                element={
                  <ProtectedRoute>
                    <RoleProtectedRoute allowedRoles={['higherOfficial']}>
                      <OfficialNavbar />
                      <HigherOfficialDashboard />
                    </RoleProtectedRoute>
                  </ProtectedRoute>
                }
              />

              {/* Unauthorized Page */}
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
            </Routes>
          </>
        )}
      </Router>
    </AuthProvider>
  );
};

export default App;
