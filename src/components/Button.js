"use client";

import { useRouter} from "next/navigation";

export default function Button({ text, route }) {
    const router = useRouter();

    return (
        <button
            // prevent calling when no route prop is provided
            onClick={() => route && router.push(route)}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl shadow-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all duration-150"
        >
            {text}
        </button>
    );
}