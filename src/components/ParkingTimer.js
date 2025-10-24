"use client";

// This was by and far one of the most annoying things I've ever had to get working as I intended... I did it though and it works pretty well!
// I take that back in retrospect... the map was WAY worse...

import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";

import { useEffect, useRef, useState } from "react";

export default function ParkingTimer() {
    const [isOpen, setIsOpen] = useState(false);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [remaining, setRemaining] = useState(0); // in seconds
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const toggleOpen = () => setIsOpen(v => !v);

    // Helper Functions
    const clamp = (v, min, max) => Math.max(min, Math.min(max, Number(v) || 0));
    const totalSecondsFromInputs = () =>
        clamp(hours, 0, 24) * 3600 + clamp(minutes, 0, 59) * 60 + clamp(seconds, 0, 59);

    const formatTime = (s) => {
        const hh = Math.floor(s / 3600);
        const mm = Math.floor((s % 3600) / 60);
        const ss = s % 60;
        const pad = (n) => String(n).padStart(2, "0");
        return `${pad(hh)}:${pad(mm)}:${pad(ss)}`;
    };

    // Start / Pause / Reset
    const startTimer = () => {
        const total = totalSecondsFromInputs();
        if (total <= 0) return alert("Please set a duration > 0");
        setRemaining((r) => (r > 0 ? r : total));
        setIsRunning(true);
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setRemaining(0);
    };

    // Countdown effect
    useEffect(() => {
        if (isRunning) {
            // if we just clicked start and remaining is 0... set it from inputs
            if (remaining <= 0) {
                setRemaining(totalSecondsFromInputs());
            }
            intervalRef.current = setInterval(() => {
                setRemaining((r) => {
                    if (r <= 1) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                        setIsRunning(false);
                        // notify user
                        alert("Parking timer finished.");
                        return 0;
                    }
                    return r - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRunning]);

    // Keep inputs within their valid ranges of time
    const onChangeHours = (e) => setHours(clamp(e.target.value, 0, 24));
    const onChangeMinutes = (e) => setMinutes(clamp(e.target.value, 0, 59));
    const onChangeSeconds = (e) => setSeconds(clamp(e.target.value, 0, 59));

    const inputTotal = totalSecondsFromInputs();

    return (
        <>
            <div className="w-full max-w-md">
                <button
                    onClick={toggleOpen}
                    aria-expanded={isOpen}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl shadow-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all duration-150"
                >
                    <span>Parking Timer</span>
                    {isOpen ? <FaCaretUp /> : <FaCaretDown />}
                </button>

                <div
                    className={`mt-3 overflow-hidden rounded-xl bg-white/90 text-black shadow-md transition-[max-height,opacity,transform] duration-300 ease-in-out ${
                        isOpen ? "max-h-96 opacity-100 transform translate-y-0" : "max-h-0 opacity-0 transform -translate-y-2"
                    }`}
                >
                    <div className="p-4">
                        <h2 className="text-center font-semibold mb-2">Set Parking Timer</h2>

                        <div className="flex gap-2 justify-center items-center mb-3">
                            <label className="text-sm">Hours</label>
                            <label className="text-sm">Minutes</label>
                            <label className="text-sm">Seconds</label>
                        </div>

                        <div className="flex items-center justify-center gap-2 mb-4">
                            <input
                                id="hours"
                                type="number"
                                inputMode="numeric"
                                min="0"
                                max="24"
                                value={hours}
                                onChange={onChangeHours}
                                className="w-20 p-2 text-center rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
                            />
                            <span className="text-lg font-mono">:</span>
                            <input
                                id="minutes"
                                type="number"
                                inputMode="numeric"
                                min="0"
                                max="59"
                                value={minutes}
                                onChange={onChangeMinutes}
                                className="w-14 p-2 text-center rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
                            />
                            <span className="text-lg font-mono">:</span>
                            <input
                                id="seconds"
                                type="number"
                                inputMode="numeric"
                                min="0"
                                max="59"
                                value={seconds}
                                onChange={onChangeSeconds}
                                className="w-14 p-2 text-center rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
                            />
                        </div>

                        <div className="text-center mb-3">
                            <div className="text-3xl font-bold font-mono">{formatTime(remaining || inputTotal)}</div>
                            <div className="text-xs text-gray-600 mt-1">{isRunning ? "Running" : "Stopped"}</div>
                        </div>

                        <div className="flex justify-center gap-3">
                            <button
                                onClick={startTimer}
                                disabled={isRunning}
                                className="px-4 py-2 rounded-lg bg-emerald-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-600 transition"
                            >
                                Start
                            </button>
                            <button
                                onClick={pauseTimer}
                                disabled={!isRunning}
                                className="px-4 py-2 rounded-lg bg-yellow-400 text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-500 transition"
                            >
                                Pause
                            </button>
                            <button
                                onClick={resetTimer}
                                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}