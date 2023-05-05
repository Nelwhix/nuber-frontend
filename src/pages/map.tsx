import Button from "@/components/Button";
import Default from "@/layouts/Default";
import { useAppSelector } from "@/stores";
import { DirectionsService, GoogleMap, Marker } from "@react-google-maps/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LngLat } from "react-map-gl";

const containerStyle = {
    width: '100%',
    height: '256px'
}

export default function Map() {
    const router = useRouter()
    const destination = useAppSelector(state => state.appStore.destination)
    const center = destination.geometry as unknown as LngLat
    const [position, setPosition] = useState({
        lat: 0,
        lng: 0
    });

    const checkIfDestinationSet = () => {
        if (destination.name === '') {
            router.push('/location')
            return
        }
    }

    const getUserLocation = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((location) => {
                setPosition({
                    lat: location.coords.latitude,
                    lng: location.coords.longitude
                })
                resolve(location)
            }, (err) => {
                reject(err)
            })
        })
    }

    const handleLoad = async (mapObject: google.maps.Map) => {
        await getUserLocation()
        let currentPoint = new google.maps.LatLng(position),
            destinationPoint = new google.maps.LatLng(center),
            directionsService = new google.maps.DirectionsService,
            directionsDisplay = new google.maps.DirectionsRenderer({
                map: mapObject
            })
        
        directionsService.route({
            origin: currentPoint,
            destination: destinationPoint,
            avoidTolls: false,
            avoidHighways: false,
            travelMode: google.maps.TravelMode.DRIVING
        }, (res, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(res)
            } else {
                console.error(status)
            }
        })
    }
     

    useEffect(() => {
        checkIfDestinationSet()
    }, [])

    return <Default>
        <h1 className="text-3xl font-semibold mb-4">
            Here's your trip
        </h1>
        <div>
          <div className="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div className="bg-white px-4 py-5 sm:p-6">
                    <div>
                      <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center} 
                                zoom={11}   
                                onLoad={handleLoad}
                            >
                        </GoogleMap>
                    </div>
                    <div className="mt-2">
                        <p className="text-xl">
                            Going to <strong>{destination.name}</strong>
                        </p>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <Button text="Let's Go!" />
                </div>
            </div>
        </div>
    </Default>
}