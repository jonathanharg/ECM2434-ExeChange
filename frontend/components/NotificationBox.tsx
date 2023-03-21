import React, { useEffect, useState } from "react";

interface Notification {
    notification_type: string,
    text: string,
    link: string,
}

function SingleNotification(notification: Notification) {
  return (
    <div>
      <p>
        <strong>{notification.notification_type}</strong>: {notification.text}
      </p>
    </div>
  );
}

function NotificationBox() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

    const fetchNotification = () => {
    return fetch("/api/getnotifications")
      .then((response) => response.json())
      .then((data) => setNotifications(data.notifications))
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  // Checking notifications every 10 seconds
  setInterval(() => {
    fetchNotification();
  }, 10000);

  return (
    <div>
      <ul>
        {notifications.map((notification) => (
          <SingleNotification {...notification}/>
        ))}
      </ul>
    </div>
  );
}
export default NotificationBox;
