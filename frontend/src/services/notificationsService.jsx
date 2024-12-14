import axios from 'axios';
import { getAuthToken } from '../utils/authUtils'; // Assuming your JWT token is stored in authUtils

const API_URL = 'http://localhost:5000/api/notifications'; // Replace with your backend API URL

// Fetch all notifications from the backend
export const getNotifications = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`, // Pass JWT token for authentication
            }
        });
        return response.data.notifications; // Assuming response contains notifications
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};

// Send a new notification (Admin functionality)
export const sendNotification = async (notificationData) => {
    try {
        const response = await axios.post(
            API_URL,
            notificationData,
            {
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`, // Pass JWT token for authentication
                }
            }
        );
        return response.data.notification; // Return the sent notification
    } catch (error) {
        console.error('Error sending notification:', error);
        throw error;
    }
};
