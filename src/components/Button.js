"use client";

import { useRouter} from "next/navigation";

export default function Button({ text, route, onClick, disabled = false }) {
    const router = useRouter();

    const handleClick = (e) => {
        if (disabled) return;
        if (onClick) onClick(e);
        if (route) router.push(route);
    };

    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl shadow-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {text}
        </button>
    );
}