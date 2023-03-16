export async function subscribeToPush() {
	if (!('serviceWorker' in navigator)) {
		console.warn("Service Worker not available!")
		return;
	}

	if (!('PushManager' in window)) {
		console.warn("Push Manager not available!")
		return;
	}

	const sw = await navigator.serviceWorker.getRegistration();

	if (!sw) {
		console.warn(
			'Service worker registration not found; cannot register push notifications',
		);
		return;
	}

	const subscription = await sw.pushManager.subscribe({
		userVisibleOnly: true,
		// applicationServerKey: urlBase64ToUint8Array(
		// 	import.meta.env.VITE_VAPID_PUBLIC_KEY!,
		// ),
		applicationServerKey: "BFqiYLqs3SKhQY713O1WoR9AJxMCaJcX8RdBRXi0GweNpfI7ZIOlvq6PZgBDKuhIAdu-aXsxy0AUx79sr2BysHw"		,
	});

	const parsedSubscription = JSON.parse(JSON.stringify(subscription)) as {
		endpoint: string;
		expirationTime: number | null;
		keys: {
			p256dh: string;
			auth: string;
		};
	};
	console.log(parsedSubscription)
}

export async function unsubscribeFromPush() {
	const sw = await navigator.serviceWorker.getRegistration();

	if (!sw) {
		console.warn(
			'Service worker registration not found; cannot register push notifications',
		);
		return;
	}

	const subscription = await sw.pushManager.getSubscription();

	if (!subscription) {
		console.warn('No push subscription found');
		return;
	}

	await subscription.unsubscribe();
	// await trpcClient.plan.unsubscribeFromPushNotifications.mutate({
	// 	endpoint: subscription.endpoint,
	// });
}

export async function getIsSubscribedToPush() {
	const sw = await navigator.serviceWorker.getRegistration();

	if (!sw) {
		console.warn(
			'Service worker registration not found; cannot register push notifications',
		);
		return false;
	}

	const subscription = await sw.pushManager.getSubscription();

	if (!subscription) {
		return false;
	}

	return true;
}
