
'use client'
import React, { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleSearch = async () => {
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
            <li key={result.place_id}>
              {result.description}

            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

