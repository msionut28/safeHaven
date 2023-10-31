import { useEffect } from 'react';

export default function MapComponent({ lat, lng }) {
  useEffect(() => {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat, lng },
      zoom: 12,
    });
  }, [lat, lng]);

  return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
}
