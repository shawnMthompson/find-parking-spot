"use client";

import Button from "@/components/Button.js";
import ParkingTimer from "@/components/ParkingTimer.js";
import MapView from "@/components/MapView.js";
import { useRef, useEffect, useState } from "react";
import { getSpot } from "@/utilities/storage.js";

export default function MySpotPage() {
    const mapRef = useRef(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // check for saved spot in localStorage when component mounts
    const saved = getSpot();
    setIsSaved(!!(saved && saved.lat && saved.lng));
  }, []);

  function handleGetDirections() {
    const spot = getSpot();
    if (!spot || typeof spot.lat !== "number" || typeof spot.lng !== "number") {
      alert("No saved parking spot found.");
      return;
    }

    /**
     * Use Google Maps Directions with the destination set to the saved lat and lng
     * Leaving origin empty just lets Google Maps use the user's current location (as long as geolocation is enabled), which works well for this case.
     * This does involve leaving the app, but I think this is a good temporary solution since I can't seem to get the DirectionServices working within the app atm.
     */
    const url = `https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}&travelmode=driving`;
    window.open(url, "_blank"); // New Tab
  }

    return (
        <div>
          {/** Top-Left */}
          <div className="fixed top-10 left-10 p-4 z-50"><ParkingTimer/></div>

          {/** Main map view */}
          <div className="p-4"><MapView ref={mapRef} /></div>

          {/** Bottom-Right */}
            <div className="fixed bottom-10 right-10 p-4">
              <Button text="Get Directions" onClick={handleGetDirections} disabled={!isSaved} />
            </div>
          
          {/** Bottom-Left */}
          <div className="fixed bottom-10 left-10 p-4">
            <Button text="Clear Spot" onClick={() => mapRef.current && mapRef.current.clearSaved()} route="/home"/>
          </div>
        </div>
      );
}