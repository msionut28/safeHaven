"use client";
import { useState } from "react";
import styles from "./toilets.module.css";

const Toilets = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const searchToilets = async () => {
    const response = await fetch(
      `https://www.refugerestrooms.org/api/v1/restrooms/search?page=1&per_page=10&unisex=true&query=${query}`
    );
    const result = await response.json();
    setData(result);
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.title}>Gender Neutral Toilets</h1>
        <div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find Gender Neutral Toilets"
            className={styles.inputField} 
            aria-label="Search query" 
          />
          <button
            onClick={searchToilets}
            className={styles.searchButton} 
            aria-label="Search toilets"
          >
            Search
          </button>
        </div>
        <div>
          <h2 className={styles.subTitle}>Results</h2>
          {data.map((toilet, index) => (
            <div key={index} className={styles.resultContainer}>
              <h3 className={styles.toiletName}>{toilet.name}</h3>
              <p className={styles.description}>{toilet.street}</p>
              <p>
                {toilet.city}, {toilet.state}
              </p>
              <p>ADA Accessible: {toilet.ada ? "Yes" : "No"}</p>
              <p>Unisex: {toilet.unisex ? "Yes" : "No"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Toilets;
