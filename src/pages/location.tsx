import Button from "@/components/Button";
import Default from "@/layouts/Default";
import { useAppSelector } from "@/stores";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";

const ClientSearch = dynamic(() => import('../components/AddressSearch'), {
    loading: () => <p>Loading...</p>,
    ssr: false
  })

export default function Location() {
    const router = useRouter()
    const destination = useAppSelector(state => state.appStore.destination)

    const handleSelectLocation = (ev: Event) => {
        ev.preventDefault();
        if (destination.name === "") return

        router.push('/map')
    }

    return <Default>
        <h1 className="text-3xl font-semibold mb-4">
            Where are we going?
        </h1>
        <form onSubmit={handleSelectLocation}>
            <div className="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div className="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <ClientSearch />
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                   <Button text="Find a ride"/>
                </div>
            </div>
        </form>
    </Default>
}