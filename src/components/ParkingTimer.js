"use client";

import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";

import { useState } from "react";

export default function ParkingTimer() {
    const [isOn, setIsOn] = useState(false);

    const toggleState = () => {
        setIsOn(!isOn);
    }

    return (
        <>
            <button
                onClick={toggleState}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl shadow-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all duration-150"
            >
                Parking Timer {isOn ? <FaCaretUp/> : <FaCaretDown/> }
            </button>
            <div className={isOn ? 'visible' : 'invisible'}>
                <div>
                    <p>Content Here!</p>
                </div>
            </div>
        </>
        
        
    );
}