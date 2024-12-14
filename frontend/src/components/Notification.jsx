import React, { useEffect, useState } from 'react';
import { getNotifications } from '../services/notificationsService';

const Notification = ({ message, type = 'info', onClose, notificationId, onRead }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000); // Automatically close after 3 seconds
        return () => clearTimeout(timer);
    }, [onClose]);

    // Mark notification as read on click (optional behavior)
    const handleMarkAsRead = () => {
        if (onRead) {
            onRead(notificationId); // Mark as read in parent component or call backend if needed
        }
    };

    return (
        <div className={`notification ${type}`} onClick={handleMarkAsRead}>
            {message}
        </div>
    );
};

const NotificationsList = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch notifications when component mounts
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data = await getNotifications();
                setNotifications(data);
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const handleCloseNotification = (index) => {
        setNotifications((prevNotifications) =>
            prevNotifications.filter((_, i) => i !== index)
        );
    };

    const handleMarkAsRead = (notificationId) => {
        // Here, you can trigger an API call to mark the notification as read if necessary
        console.log(`Marked notification ${notificationId} as read.`);
    };

    return (
        <div className="notifications-list">
            {loading ? (
                <p>Loading notifications...</p>
            ) : (
                notifications.map((notification, index) => (
                    <Notification
                        key={index}
                        notificationId={notification._id}
                        message={notification.messageTitle}
                        type="info"
                        onClose={() => handleCloseNotification(index)}
                        onRead={handleMarkAsRead}
                    />
                ))
            )}
        </div>
    );
};

export default NotificationsList;
