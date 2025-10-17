"use client";

// TASKS
/**
 * 1. Add the Parking Timer button, add the My Spot button, and add the Mark Parking Spot button.
 * 2. Ensure navigation works between the home page and the my spot page.
 * 
 * Note: the Parking Timer dropdown can be done next milestone.
 */

import MapPlaceholder from "@/components/MapPlaceholder.js";
import Button from "@/components/Button.js";

export default function Home() {
  return (
    <div>
      <MapPlaceholder />

      {/** Bottom-Right */}
      <div className="fixed bottom-10 left-10 p-4"><Button text="Mark New Parking Spot"/></div>
      
      {/** Top-Right */}
      <div className="fixed top-10 right-10 p-4"><Button text="Parking Timer"/></div>
      
      {/** Bottom-Left */}
      <div className="fixed bottom-10 right-10 p-4"><Button text="My Spot" route="/my-spot"/></div>
    </div>
  );
}