// TASKS
/**
 * 1. Add the Parking Timer button, the Clear Spot button (returns to the home page as well), and the Get Directions button.
 * 2. Ensure navigation works between the home page and the my spot page.
 */

import MapPlaceholder from "@/components/MapPlaceholder.js";
import Button from "@/components/Button.js";

export default function MySpotPage() {
    return (
        <div>
          <MapPlaceholder />

          {/** Bottom-Right */}
          <div className="fixed bottom-10 right-10 p-4"><Button text="Get Directions"/></div>

          {/** Top-Right */}
          <div className="fixed top-10 right-10 p-4"><Button text="Parking Timer"/></div>
          
          {/** Bottom-Left */}
          <div className="fixed bottom-10 left-10 p-4"><Button text="Clear Spot" route="/home"/></div>
        </div>
      );
}