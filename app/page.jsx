'use client'
import React, { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [reviews, setReviews] = useState([]);


  const handleSearch = async () => {
    console.log("doing da search");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/searchVenue?query=${query}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.predictions);
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
      setReviews(data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  const handleSelectVenue = (venue) => {
    setSelectedVenue(venue);
    fetchReviews(venue);
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
            <li key={result.place_id} onClick={() => handleSelectVenue(result.description)}>
              {result.description}
            </li>
          ))}
        </ul>
        {selectedVenue && (
          <div>
            <h2>Reviews for {selectedVenue}</h2>
            {reviews.map((review, index) => (
              <div key={index}>
                <p>{review.review}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}