'use client'
import React, { useState } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MapComponent from './components/MapComponent.jsx';
import AddReview from './reviews/page.jsx';
import styles from './home.module.css';

const render = (status, markers, handleMarkerClick, center, zoom) => {
  switch (status) {
    case Status.LOADING:
      return <p>Loading...</p>;
    case Status.FAILURE:
      return <p>Error loading the map</p>;
    case Status.SUCCESS:
      return <MapComponent markers={markers} onMarkerClick={handleMarkerClick} center={center} zoom={zoom} />;
  }
};

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({ lat: 51.5074, lng: -0.1278 });
  const [zoom, setZoom] = useState(10);
  const [averages, setAverages] = useState({});
  const [isUniversity, setIsUniversity] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/searchVenue?query=${query}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.predictions);

        const newCenter = {
          lat: data.location.lat,
          lng: data.location.lng,
        };
        setCenter(newCenter);
        setZoom(15);

        const newMarkers = data.predictions.map((result) => ({
          position: newCenter,
          venue: result.description,
        }));
        setMarkers(newMarkers);
      } else {
        const data = await res.json();
        setError(data.error || 'Error');
      }
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (venue) => {
    try {
      const res = await fetch(`http://localhost:4000/GetReviews?venue=${venue}`);
      const data = await res.json();
      setReviews(data.reviews);
      setAverages(data.averages);
      setIsUniversity(data.isUniversity);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  const handleSelectVenue = (venue) => {
    if (!venue) return;

    setSelectedVenue(venue.description);
    fetchReviews(venue.description);
    // Set map center to selected venue's location
    const newCenter = {
      lat: venue.geometry.location.lat,
      lng: venue.geometry.location.lng,
    };
    setCenter(newCenter);
    setZoom(15);
  };

  const onReviewSubmit = async (newReview) => {
    try {
      const res = await fetch('http://localhost:4000/AddReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      const data = await res.json();
      if (res.ok) {
        // Update local to show  new review
        setReviews((prevReviews) => [...prevReviews, data.review]);
      } else {
        // what a dj calls his son (erra error)
        console.error('Failed to submit review:', data.error);
      }
    } catch (err) {
      console.error('Failed to submit review sad face:', err);
    }
  };


  const handleMarkerClick = (marker) => {
    setSelectedVenue(marker);
    fetchReviews(marker.venue);
    // Set map center marker's location
    const newCenter = {
      lat: marker.position.lat,
      lng: marker.position.lng,
    };
    setCenter(newCenter);
    setZoom(15);
  };

  return (
    <>
      <main>
        <h1>Home</h1>
      </main>

      <div>
        <h1>Search for a Venue or University</h1>
        <div>
          <input
            type="text"
            placeholder="Venue or University..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch} disabled={loading}>
            Search
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <ul>
          {results.map((result) => (
            <li key={result.place_id} onClick={() => handleSelectVenue(result)}>
              {result.description}
            </li>
          ))}

        </ul>
        {selectedVenue && (
          <div>
            <h2>Reviews for {selectedVenue}</h2>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index}>
                  <p>{review.review} - Date: {review.date}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}

            <h3>Averages:</h3>
            <p>Inclusivity: {averages.inclusivity ? averages.inclusivity.toFixed(1) : 'N/A'}</p>
            <p>Safety: {averages.safety ? averages.safety.toFixed(1) : 'N/A'}</p>
            {isUniversity && (
              <>
                <p>Support: {averages.support ? averages.support.toFixed(1) : 'N/A'}</p>
                <p>Community: {averages.community ? averages.community.toFixed(1) : 'N/A'}</p>
              </>
            )}

            <AddReview venue={selectedVenue} onReviewSubmit={onReviewSubmit} />

          </div>
        )}


      </div>
      <div className={styles.mapContainer}>
        <h3>Click on a venue from the list above to see it on the map!</h3>
        <Wrapper apiKey={process.env.GOOGLE_PLACES_API_KEY} render={(status) => render(status, markers, handleMarkerClick, center, zoom)}>
          <MapComponent markers={markers} onMarkerClick={handleMarkerClick} center={center} zoom={zoom} />
        </Wrapper>
      </div>
    </>
  );
}