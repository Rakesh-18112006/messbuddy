import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginStudent, loginMessAuthority } from "../services/authService";
import Notification from "../components/Notification";
import { AuthContext } from "../context/AuthContext";
import { FiEye, FiEyeOff, FiLoader } from "react-icons/fi";

const LoginPage = () => {
  const [userType, setUserType] = useState("student");
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      let response;

      // Choose login service based on user type
      if (userType === "student") {
        response = await loginStudent(formData);
      } else if (userType === "messauthority") {
        response = await loginMessAuthority(formData);
      } else {
        setError("Invalid user type");
        setLoading(false);
        return;
      }

      if (response?.data?.role) {
        setSuccess("Logged in successfully!");
        
        // Store JWT and user data in localStorage
        localStorage.setItem("jwt", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));

        // Update global AuthContext
        login(response.data);

        // Redirect based on user role
        switch (response.data.role) {
          case "student":
            navigate("/student-dashboard");
            break;
          case "mr":
          case "higher":
            navigate("/mess-authority-dashboard");
            break;
          case "higherOfficial":
            navigate("/higher-official-dashboard");
            break;
          default:
            setError("Unknown role. Please contact support.");
        }
      } else {
        setError("Invalid response from server.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Login as {userType === "student" ? "Student" : "Mess Authority"}
        </h1>

        {/* Display notifications */}
        {error && (
          <Notification message={error} type="error" onClose={() => setError(null)} />
        )}
        {success && (
          <Notification message={success} type="success" onClose={() => setSuccess(null)} />
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Student-specific fields */}
          {userType === "student" && (
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="Student ID"
              className="w-full p-2 border rounded"
              required
            />
          )}

          {/* Mess authority-specific fields */}
          {userType === "messauthority" && (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border rounded"
              required
            />
          )}

          {/* Password field with show/hide option */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 border rounded"
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* Submit button with loading spinner */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 flex items-center justify-center"
            disabled={loading}
          >
            {loading && <FiLoader className="animate-spin mr-2" />}
            Login
          </button>
        </form>

        {/* Toggle user type (Student/Mess Authority) */}
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

        <button
          onClick={() =>
            setUserType(userType === "student" ? "messauthority" : "student")
          }
          className="w-full mt-4 bg-gray-100 text-gray-600 py-2 rounded hover:bg-gray-200"
        >
          Switch to {userType === "student" ? "Mess Authority" : "Student"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
