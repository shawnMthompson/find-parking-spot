// TASKS
/**
 * 1. Add the Parking Timer button, the Clear Spot button (returns to the home page as well), and the Get Directions button.
 * 2. Ensure navigation works between the home page and the my spot page.
 */

import MapPlaceholder from "@/components/MapPlaceholder.js";
import Button from "@/components/Button.js";
import ParkingTimer from "@/components/ParkingTimer.js"

export default function MySpotPage() {
    return (
        <div>
          <MapPlaceholder />

           {/** Top-Right */}
          <div className="fixed top-10 right-10 p-4"><Button text="Parking Timer"/></div>

          {/** Top-Left */}
          <div className="fixed top-10 left-10 p-4"><ParkingTimer/></div>

          {/** Bottom-Right */}
          <div className="fixed bottom-10 right-10 p-4"><Button text="Get Directions"/></div>
          
          {/** Bottom-Left */}
          <div className="fixed bottom-10 left-10 p-4"><Button text="Clear Spot" route="/home"/></div>
        </div>
      );
}