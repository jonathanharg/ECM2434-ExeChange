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
  // if (event.data) {
		// const pushData = event.data.json();
		console.debug(event);
		self.registration.showNotification(
      `${event} sent you a trade request.`
    );
});
