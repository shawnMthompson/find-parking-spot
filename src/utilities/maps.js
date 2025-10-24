// Utilities for loading Google Maps and working with map/markers
export function loadGoogleMaps(apiKey) {
	return new Promise((resolve, reject) => {
		if (typeof window === "undefined") return reject(new Error("window is undefined"));
		if (window.google && window.google.maps) return resolve(window.google.maps);

		if (!apiKey) return reject(new Error("No Google Maps API key provided"));

		const existing = document.querySelector('script[data-google-maps]');
		if (existing) {
			existing.addEventListener('load', () => resolve(window.google.maps));
			existing.addEventListener('error', (e) => reject(e));
			return;
		}

		const script = document.createElement('script');
		script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
		script.async = true;
		script.defer = true;
		script.setAttribute('data-google-maps', '1');
		script.onload = () => {
			if (window.google && window.google.maps) resolve(window.google.maps);
			else reject(new Error('Google maps failed to initialize'));
		};
		script.onerror = (e) => reject(e);
		document.head.appendChild(script);
	});
}

// Create a marker on a map and return it
export function createMarker(map, position, options = {}) {
	if (!map || !window.google) return null;
	const marker = new window.google.maps.Marker({
		position,
		map,
		draggable: options.draggable ?? false,
		title: options.title ?? "Parking Spot",
	});
	return marker;
}

// Initialize a map inside a container element
export function initMap(container, center = { lat: 44.7950, lng: -69.3363 }, zoom = 1) {
	if (!container || !window.google) return null;
	const map = new window.google.maps.Map(container, {
		center,
		zoom,
	});
	return map;
}

const mapsApi = { loadGoogleMaps, createMarker, initMap };
export default mapsApi;