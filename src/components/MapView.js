"use client";

/**
 * There was probably 10 billion better ways to do all of the google maps implementation, 
 * but I'm just glad it's working after pouring nearly 6 hours into this already.
 * 
 * It is a little slow on the load (I think it's because of how I handled fetching geolocation), but it isn't super egregious, so I think it's fine for now. 
 * Though, I will try to improve on it in the next milestone.
 */

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { loadGoogleMaps, createMarker, initMap } from "@/utilities/maps.js";
import { saveSpot, getSpot, clearSpot as clearStoredSpot } from "@/utilities/storage.js";

const MapView = forwardRef(function MapView(props, ref) {
    const containerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const clickListenerRef = useRef(null);
    const [selected, setSelected] = useState(null);
    const [savedSpot, setSavedSpot] = useState(null);

    useImperativeHandle(ref, () => ({
        saveSelected: () => saveSelected(),
        clearSaved: () => clearSaved(),
    }));

    async function init() {
        try {
            const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
            await loadGoogleMaps(apiKey);

            // Default to Waterville, ME
            const defaultCenter = { lat: 44.5520, lng: -69.6317 };

            // Initialize map immediately with default center so that the UI appears fast without having to deal with a long load time
            const map = initMap(containerRef.current, defaultCenter, 15);
            mapRef.current = map;

            // Try to get geolocation asynchronously and update center when it becomes available (should the user give permission to their browser)
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        const userCenter = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                        if (mapRef.current) mapRef.current.setCenter(userCenter);
                    },
                    () => {},
                    { timeout: 3000, maximumAge: 60000 }
                );
            }

            // If there's a saved spot, show it and disable placing new pins
            const saved = getSpot();
            if (saved && saved.lat && saved.lng) {
                const m = createMarker(map, saved, { draggable: false, title: "Saved Spot" });
                // visually gray it out and make non-interactive
                m.setOptions({ draggable: false, clickable: false });
                markerRef.current = m;
                setSavedSpot(saved);
                map.setCenter(saved);
            } else {
                // Place a marker on click
                clickListenerRef.current = map.addListener("click", (e) => {
                    const pos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                    if (markerRef.current) markerRef.current.setMap(null);
                    markerRef.current = new window.google.maps.Marker({ position: pos, map, draggable: true });
                    setSelected(pos);
                });
            }
        } catch (e) {
            console.error("Map init error:", e);
        }
    }

    useEffect(() => {
        init();
    }, []);

    function saveSelected() {
        if (!selected && !markerRef.current) {
            alert("Place a pin on the map first to save a spot.");
            return false;
        }

        const pos = selected || (markerRef.current && markerRef.current.getPosition && {
            lat: markerRef.current.getPosition().lat(),
            lng: markerRef.current.getPosition().lng(),
        });

        if (!pos) {
            alert("Unable to determine pin position.");
            return false;
        }

        const ok = saveSpot({ lat: Number(pos.lat), lng: Number(pos.lng) });
        if (ok) {
            // make the saved marker non-interactive and visually muted
            if (markerRef.current) {
                markerRef.current.setOptions({ draggable: false, clickable: false, title: "Saved Spot" });
            }
            // remove the click listener so user can't add another until cleared
            if (clickListenerRef.current && clickListenerRef.current.remove) clickListenerRef.current.remove();
            setSavedSpot({ lat: Number(pos.lat), lng: Number(pos.lng) });
            alert("Parking spot saved.");
            return true;
        }
        alert("Failed to save parking spot.");
        return false;
    }

    function clearSaved() {
        clearStoredSpot();
        if (markerRef.current) {
            markerRef.current.setMap(null);
            markerRef.current = null;
        }
        setSelected(null);
        setSavedSpot(null);
        // re-enable click-to-place once the old spot has been cleared
        if (mapRef.current) {
            clickListenerRef.current = mapRef.current.addListener("click", (e) => {
                const pos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                if (markerRef.current) markerRef.current.setMap(null);
                markerRef.current = new window.google.maps.Marker({ position: pos, map: mapRef.current, draggable: true });
                setSelected(pos);
            });
        }
        alert("Saved parking spot cleared.");
    }

    return (
        <div className="fixed inset-0 z-0">
            <div ref={containerRef} className="w-full h-full" />
        </div>
    );
});

export default MapView;
