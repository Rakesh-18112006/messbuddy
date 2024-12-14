import axios from 'axios';
import { getAuthToken } from '../utils/authUtils'; // Assuming you have a method to get the token

const API_URL = 'http://localhost:5000'; // Adjust the base URL if necessary

// Register a student
export const registerStudent = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/student/signup`, data);
    return response;
  } catch (error) {
    console.error('Error registering student:', error);
    throw error;  // Throw the error to be caught by the caller
  }
};

// Register a mess authority
export const registerMessAuthority = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/messauthority/signup`, data);
    return response;
  } catch (error) {
    console.error('Error registering mess authority:', error);
    throw error;
  }
};

// Login a student
export const loginStudent = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/student/login`, data);

    // Save the token and user info in localStorage
    const { token, user } = response.data;
    localStorage.setItem('user', JSON.stringify({ ...user, token }));


    return response;  // Return the response if needed
  } catch (error) {
    console.error('Error logging in student:', error);
    throw error;  // Throw the error to be caught by the caller
  }
};

// Login a mess authority
export const loginMessAuthority = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/messauthority/login`, data);

    // Save the token and user info in localStorage
    const { token, user } = response.data;
    localStorage.setItem('jwt', token);
    localStorage.setItem('user', JSON.stringify(user));

    return response;  // Return the response if needed
  } catch (error) {
    console.error('Error logging in mess authority:', error);
    throw error;  // Throw the error to be caught by the caller
  }
};

// Logout the student or mess authority
export const logout = async () => {
  try {
    // You may want to clear the session on the backend too if there's a logout API.
    await axios.post(`${API_URL}/api/auth/student/logout`);
    
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');  // Removed the 'token' and added 'jwt' as per your previous code
    
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

// Add Authorization header for protected routes if token is available
export const getAuthHeader = () => {
  const token = getAuthToken(); // Assuming you have a method to get the token
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

// Example of protected API call with authorization
export const getProtectedData = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/protected-data`, {
      headers: getAuthHeader(),
    });
    return response;
  } catch (error) {
    console.error('Error fetching protected data:', error);
    throw error;  // Handle the error appropriately
  }
};
