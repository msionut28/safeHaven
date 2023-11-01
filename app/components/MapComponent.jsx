import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
const MapComponent = (props) => (
  <LoadScript
    googleMapsApiKey={process.env.GOOGLE_PLACES_API_KEY}
  >
    <GoogleMap
      defaultCenter={props.defaultCenter}
      defaultZoom={props.defaultZoom}
    >
      {props.markers.map((marker, index) => (
        <Marker key={index} position={marker.position} onClick={() => props.onMarkerClick(marker)} />
      ))}
    </GoogleMap>
  </LoadScript>
);
export default MapComponent;