import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

export default function AddressSearch({ address, setAddress }: AddressSearchProps) {

    const fetchCoordinates = async (address: string) => {
        try {
            const results = await geocodeByAddress(address)
            const latLng = await getLatLng(results[0])
            console.log(latLng)
        } catch (err) {
            console.log(err)
        }
        
    }
    
    return  <PlacesAutocomplete
            value={address}
            onChange={setAddress}
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

interface AddressSearchProps {
    address: string
    setAddress: (val: string) => void
}