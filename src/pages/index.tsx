import HTTPClient from "@/httpClient";
import Default from "@/layouts/Default";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter()

    const getUser = async () => {
        try {
            await HTTPClient.$get('/user')
        } catch (err) {
            router.push('/login')
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return <Default>
        <h1 className="text-3xl font-semibold mb-4">Nuber</h1>
        <div className="w-[40%] mx-[30%] shadow-md rounded-md bg-white flex justify-between px-8 py-10">
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
