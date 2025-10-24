"use client";

import Button from "@/components/Button.js";
import MapView from "@/components/MapView.js";
import { useRef, useEffect, useState } from "react";
import { getSpot } from "@/utilities/storage.js";

export default function Home() {
  const mapRef = useRef(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // check localStorage for saved spot when component mounts
    const saved = getSpot();
    setIsSaved(!!(saved && saved.lat && saved.lng));
  }, []);
  return (
    <div>
      {/* Map */}
      <div className="p-4"><MapView ref={mapRef} /></div>
      {/** Bottom-Left */}
        <div className="fixed bottom-10 left-10 p-4">
        <Button
          text={isSaved ? "Spot Saved" : "Mark New Parking Spot"}
          onClick={() => {
            if (!mapRef.current) return;
            const ok = mapRef.current.saveSelected && mapRef.current.saveSelected();
            if (ok) setIsSaved(true);
          }}
          disabled={isSaved}
        />
      </div>
      
      {/** Bottom-Right */}
      <div className="fixed bottom-10 right-10 p-4">
        <Button text="My Spot" route="/my-spot" disabled={!isSaved} />
      </div>
    </div>
  );
}