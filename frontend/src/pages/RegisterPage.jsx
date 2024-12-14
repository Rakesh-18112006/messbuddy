import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerStudent, registerMessAuthority } from "../services/authService";
import Notification from "../components/Notification";
import { FiEye, FiEyeOff, FiLoader } from "react-icons/fi";

const RegisterPage = () => {
  const [userType, setUserType] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    studentname: "",
    id: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    currentMess: "",
    role: "mr",
    authority_role: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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

    if (userType === "messauthority" && formData.role === "higher" && !formData.authority_role.trim()) {
      setError("Authority role is required for higher authorities.");
      setLoading(false);
      return;
    }

    try {
      const response =
        userType === "student"
          ? await registerStudent(formData)
          : await registerMessAuthority(formData);

      setSuccess(response.data.message);
      setTimeout(() => navigate("/login"), 2000);
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
          Register as {userType === "student" ? "Student" : "Mess Authority"}
        </h1>

        {error && (
          <Notification
            message={error}
            type="error"
            onClose={() => setError(null)}
          />
        )}
        {success && (
          <Notification
            message={success}
            type="success"
            onClose={() => setSuccess(null)}
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {userType === "student" && (
            <>
              <input
                type="text"
                name="studentname"
                value={formData.studentname}
                onChange={handleChange}
                placeholder="Student Name"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="Student ID"
                className="w-full p-2 border rounded"
                required
              />
              <select
                name="currentMess"
                value={formData.currentMess}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Mess</option>
                <option value="dh1">DH1</option>
                <option value="dh2">DH2</option>
                <option value="dh3">DH3</option>
                <option value="dh4">DH4</option>
                <option value="dh5">DH5</option>
                <option value="dh6">DH6</option>
              </select>
            </>
          )}
          {userType === "messauthority" && (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border rounded"
                required
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="mr">Mess Representative</option>
                <option value="higher">Higher Authority</option>
              </select>
              {formData.role === "higher" && (
                <input
                  type="text"
                  name="authority_role"
                  value={formData.authority_role}
                  onChange={handleChange}
                  placeholder="Authority Role (e.g., Manager)"
                  className="w-full p-2 border rounded"
                  required
                />
              )}
            </>
          )}
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            className="w-full p-2 border rounded"
            required
          />
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <FiLoader className="animate-spin mr-2" /> : null}
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already registered?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Go to Login
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

export default RegisterPage;
