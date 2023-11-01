'use client'
import React, { useState } from 'react';
import styles from './news.module.css'

export default function News() {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData() {
    setIsLoading(true);
    setError(null);

    const url = 'https://lgbtq-world-news-live.p.rapidapi.com/news';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8f8641a7c6msh0e089e319a502cep174f40jsn27b4a9b3976c',
        'X-RapidAPI-Host': 'lgbtq-world-news-live.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setNewsData(result);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  
  return (
    <div className={styles.container}>
        <h1 className={styles.heading}>LGBTQ+ News</h1>
        
       
        {error && <div>Error fetching data: {error.message}</div>}
        
        <div>
            <button onClick={fetchData} className={styles.button}>Stay up To date</button> 
        </div>

        <div>
            {newsData.map((newsItem, index) => (
                <div key={index} className={styles.newsItem}>
                    <a href={newsItem.url} target="_blank" rel="noopener noreferrer" className={styles.newsLink}>{newsItem.title}</a>
                </div>
            ))}
        </div>
    </div>
)
}