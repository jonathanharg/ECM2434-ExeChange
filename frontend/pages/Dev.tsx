import React from "react";

function Dev() {
  const clicked = () => {
    console.log("Clicked!");
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      alert("Notifications Already Granted");
      const notification = new Notification("Hi there!");
      // …
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      alert("Asking for permission");

      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification("Hi there!");
        }
      });
    } else {
      alert("Notifications not allowed")
    }
  };

  return (
    <>
      A Dev page!
      <button onClick={() => clicked()}>Notify Me!</button>
    </>
  );
}

export default Dev;
