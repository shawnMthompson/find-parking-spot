const STORAGE_KEY = "parking_spot";

export function saveSpot(spot) {
	try {
		if (!spot || typeof spot.lat !== "number" || typeof spot.lng !== "number") {
			throw new Error("Invalid spot object");
		}
		localStorage.setItem(STORAGE_KEY, JSON.stringify(spot));
		return true;
	} catch (e) {
		console.error("saveSpot error:", e);
		return false;
	}
}

export function getSpot() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch (e) {
		console.error("getSpot error:", e);
		return null;
	}
}

export function clearSpot() {
	try {
		localStorage.removeItem(STORAGE_KEY);
		return true;
	} catch (e) {
		console.error("clearSpot error:", e);
		return false;
	}
}

const storageApi = { saveSpot, getSpot, clearSpot };
export default storageApi;