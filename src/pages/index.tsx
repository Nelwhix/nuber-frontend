import Default from "@/layouts/Default";
import { useRouter } from "next/router";

export default function Home() {

    return <Default>
        <h1 className="text-3xl font-semibold mb-4">Nuber</h1>
        <div className="w-[30%] mx-[35%] shadow-md rounded-md bg-white flex justify-between px-8 py-10">
            <button
                className="text-white inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-3"
            >
                Start Driving
            </button>

            <button
                className="text-white inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-3"
            >
                Find A Ride
            </button>
        </div>
    </Default>
}
