// Temporary- this will be replaced with the actual map display via the google maps api in coming versions.
import Image from "next/image";

export default function MapPlaceholder() {
    return (
        <div className="fixed inset-0 -z-10 w-full h-full">
            <Image
                src="/googlemapsimg.png"
                alt="Map Placeholder"
                fill
                priority
                className="object-cover"
            />
        </div>
    )
}