import Default from "@/layouts/Default";
import dynamic from "next/dynamic";
import { useState } from "react";

const ClientSearch = dynamic(() => import('../components/AddressSearch'), {
    loading: () => <p>Loading...</p>,
    ssr: false
  })

export default function Location() {

    return <Default>
        <h1 className="text-3xl font-semibold mb-4">
            Where are we going?
        </h1>
        <form>
            <div className="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div className="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <ClientSearch />
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                        className="text-white inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-3"
                    >
                        Find A Ride
                    </button>
                </div>
            </div>
        </form>
    </Default>
}