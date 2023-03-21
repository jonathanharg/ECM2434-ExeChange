import React, { useEffect, useState } from "react";

interface Notification {
  notification_type: string;
  text: string;
  link: string;
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
export default SingleNotification;

// function NotificationBox() {
//   const [notifications, setNotifications] = useState<Notification[]>([]);

//   const fetchNotifications = () => {
//     return fetch("/api/getnotifications")
//       .then((response) => response.json())
//       .then((data) => setNotifications(data.notifications));
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetchNotifications();
//     }, 5000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div>
//       <ul>
//         {notifications.map((notification) => (
//           <SingleNotification {...notification} />
//         ))}
//       </ul>
//     </div>
//   );
// }
// export default NotificationBox;
