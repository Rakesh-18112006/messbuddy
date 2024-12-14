import axios from 'axios';

const API_URL = 'YOUR_BACKEND_API_URL'; // Replace with your backend API URL

// Get all complaints
export const getComplaints = async () => {
    try {
        const response = await axios.get(`${API_URL}/complaints`);
        return response.data; // Returns an array of complaints
    } catch (error) {
        throw error;
    }
};

// Create a new complaint
export const createComplaint = async (complaintData) => {
    try {
        const response = await axios.post(`${API_URL}/complaints`, complaintData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
