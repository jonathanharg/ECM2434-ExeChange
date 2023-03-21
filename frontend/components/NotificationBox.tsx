import React, { useEffect, useState } from "react";

interface Notification {
  id: number;
  notification_type: string,
  text: string;
  link: string;
}

function SingleNotification(notification: Notification) {
    return (
        <div>
            <p><strong>{notification.notification_type}</strong>: {notification.text}</p>
        </div>
    )
}

function NotificationBox() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  function getNotifications() {
    return fetch("/api/getnotifications")
      .then((response) => response.json())
      .then((data) => setNotifications(data.notifications));
  }

  useEffect(() => {
    getNotifications();
  });

  return (
    <div>
        <ul>
            {
                notifications.map((notification) => (
                    <SingleNotification key={notification.id} {...notification}/>
                ))
            }
        </ul>
    </div>
  );
}
export default NotificationBox;
