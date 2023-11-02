import React, { useRef, useEffect } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const containerStyle = {
  width: '400px',
  height: '400px'
};

const render = (status, markers, onMarkerClick, center, zoom) => {
  switch (status) {
    case Status.LOADING:
      return <p>Loading...</p>;
    case Status.FAILURE:
      return <p>Error loading the map</p>;
    case Status.SUCCESS:
      return <MyMapComponent markers={markers} onMarkerClick={onMarkerClick} center={center} zoom={zoom} />;
  }
};

const MyMapComponent = ({ markers, onMarkerClick, center, zoom }) => {
  const ref = useRef();
  const map = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!map.current) {
      map.current = new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
    } else {
      map.current.panTo(center);
      map.current.setZoom(zoom);
    }

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    markers.forEach(marker => {
      const googleMarker = new window.google.maps.Marker({
        map: map.current,
        position: marker.position,
        title: marker.venue,
      });

      googleMarker.addListener('click', () => {
        onMarkerClick(marker);
      });

      markersRef.current.push(googleMarker);
    });
  }, [markers, onMarkerClick, center, zoom]);

  return <div ref={ref} id="map" style={containerStyle} />;
};


const MapComponent = ({ markers, onMarkerClick, center, zoom }) => (
  <Wrapper apiKey={process.env.GOOGLE_PLACES_API_KEY} render={(status) => render(status, markers, onMarkerClick, center, zoom)}>
    <MyMapComponent markers={markers} onMarkerClick={onMarkerClick} center={center} zoom={zoom} />
  </Wrapper>
);

export default MapComponent;
