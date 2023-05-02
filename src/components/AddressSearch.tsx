import { AddressAutofill } from "@mapbox/search-js-react";

export default function AddressSearch({ address, setAddress }: AddressSearchProps) {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY as string

    const handleRetrieve = (res: any) => {
        console.log('fired')
        console.log(res)
    }

    return <AddressAutofill accessToken={accessToken} onRetrieve={handleRetrieve}>
        <input
            type="text"
            placeholder="My destination"
            className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm"
            autoComplete="street-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
        />
    </AddressAutofill>
}

interface AddressSearchProps {
    address: string
    setAddress: (val: string) => void
}