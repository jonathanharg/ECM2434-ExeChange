import React, { useEffect, useState } from "react";

interface Notification {
  notification_type: string;
  text: string;
  link: string;
}

function SingleNotification(notification: Notification) {
  return (
    <div>
      <a href={notification.link}>
      <p>
        <strong>{notification.notification_type}</strong>, {notification.text}
      </p>
      </a>
    </div>
  );
}
export default SingleNotification;
