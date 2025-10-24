"use client";

import Button from "@/components/Button.js";
import ParkingTimer from "@/components/ParkingTimer.js";
import MapView from "@/components/MapView.js";
import { useRef } from "react";

export default function MySpotPage() {
    const mapRef = useRef(null);

    return (
        <div>
          {/** Top-Left */}
          <div className="fixed top-10 left-10 p-4 z-50"><ParkingTimer/></div>

          {/** Main map view */}
          <div className="p-4"><MapView ref={mapRef} /></div>

          {/** Bottom-Right */}
          <div className="fixed bottom-10 right-10 p-4"><Button text="Get Directions"/></div>
          
          {/** Bottom-Left */}
          <div className="fixed bottom-10 left-10 p-4">
            <Button text="Clear Spot" onClick={() => mapRef.current && mapRef.current.clearSaved()} route="/home"/>
          </div>
        </div>
      );
}