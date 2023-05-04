import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import { useAppSelector, useAppDispatch, setDestination } from '@/stores';
import { useState } from 'react';
import { randomUUID } from 'crypto';

export default function AddressSearch() {
    const [name, setName] = useState("")
    const dispatch = useAppDispatch()

   const handleChange = (value: string) => {
        setName(value)
   }

    const fetchCoordinates = async (address: string) => {
        try {
            const results = await geocodeByAddress(address)
            const latLng = await getLatLng(results[0])
            dispatch(setDestination({
                name: name,
                address: results[0].formatted_address,
                geometry: {
                    lat: latLng.lat,
                    lng: latLng.lng
                }
            }))
        } catch (err) {
            console.log(err)
        }
        
    }
    
    return  <PlacesAutocomplete
            value={name}
            onChange={handleChange}
            onSelect={fetchCoordinates}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'My destination',
                className: 'location-search-input mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                      key: randomUUID
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
    </PlacesAutocomplete>
   
}