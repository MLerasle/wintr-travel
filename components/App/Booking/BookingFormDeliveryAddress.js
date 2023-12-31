import { useState, useRef, useEffect } from 'react';
import useScript from 'react-script-hook';

let autoComplete;

// const handleScriptLoad = (updateQuery, updatePlaceId, deliveryAddressRef) => {
//   // Create a circle of 2km radius around Flaine
//   const resortCoordinates = {
//     lat: 46.006538,
//     lng: 6.68953,
//   };
//   const circle = new window.google.maps.Circle({
//     center: resortCoordinates,
//     radius: 2000,
//   });
//   // Assign autoComplete with Google maps places one time
//   autoComplete = new window.google.maps.places.Autocomplete(
//     deliveryAddressRef.current,
//     {
//       origin: new window.google.maps.LatLng(46.006538, 6.68953),
//       bounds: circle.getBounds(),
//       strictBounds: true,
//       componentRestrictions: { country: 'fr' },
//     }
//   );
//   // Specify what properties we will get from API
//   autoComplete.setFields([
//     'address_components',
//     'formatted_address',
//     'name',
//     'place_id',
//   ]);
//   // Add a listener to handle when the place is selected
//   autoComplete.addListener('place_changed', () =>
//     handlePlaceSelect(updateQuery, updatePlaceId)
//   );
// };

// const handlePlaceSelect = async (updateQuery, updatePlaceId) => {
//   // Get place from google api
//   const addressObject = autoComplete.getPlace();
//   const query = `${addressObject.name} - ${addressObject.formatted_address}`;
//   updatePlaceId(addressObject.place_id);
//   updateQuery(query);
// };

const BookingFormDeliveryAddress = ({
  booking,
  onDeliveryAddressUpdate,
  token,
  className,
}) => {
  // useScript({
  //   src: `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`,
  //   onload: () => handleScriptLoad(setQuery, setPlaceId, deliveryAddressRef),
  //   checkForExisting: true,
  // });
  const [query, setQuery] = useState(booking.deliveryAddress);
  const [placeId, setPlaceId] = useState();
  const deliveryAddressRef = useRef(null);

  // useEffect(() => {
  //   onDeliveryAddressUpdate(query, placeId);
  // }, [onDeliveryAddressUpdate, query, placeId]);

  return (
    <>
      <label
        className="text-lg leading-6 font-semibold text-gray-800"
        htmlFor="deliveryAddress"
      >
        Adresse de livraison
      </label>
      {!token && (
        <p className="text-blue-600 text-sm md:text-base">
          Vous pouvez renseigner cette information ultérieurement.
        </p>
      )}
      <input
        ref={deliveryAddressRef}
        name="deliveryAddress"
        className={`input mt-4 w-full ${className && className}`}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Saisissez l'adresse complète ici"
        value={query}
      />
    </>
  );
};

export default BookingFormDeliveryAddress;
