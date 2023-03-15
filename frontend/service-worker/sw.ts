import { createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";

declare let self: ServiceWorkerGlobalScope;

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("notificationclick", (event) => {
  event.waitUntil(self.clients.openWindow(event.notification.tag));
  event.notification.close();
});

self.addEventListener("push", (event) => {
  self.registration.showNotification("ExeChange", {
    body: "Big things are happening... " + event.data.text(),
    icon: "/static/apple-touch-icon-180.png",
    tag: "/marketplace",
  });
});
