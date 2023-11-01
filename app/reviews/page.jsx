'use client'
import React, { useEffect, useState } from 'react';
import styles from './reviews.module.css'

function AddReview({ venue }) {
    const [review, setReview] = useState({
        venue: '',
        review: '',
        inclusivity: '',
        safety: '',
        date: '',
        isUniversity: false,
        support: '',
        community: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        setReview(prevState => ({ ...prevState, venue }));
    }, [venue]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedValue = name === 'isUniversity' ? e.target.checked : value;
        setReview(prevState => ({ ...prevState, [name]: updatedValue }));
    };

    const handleSubmit = () => {
        fetch(`http://localhost:4000/AddReview`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(review),
        })
        .then(res => {
            console.log(res.status);
            setReview({
                venue: '',
                review: '',
                inclusivity: '',
                safety: '',
                date: '',
                isUniversity: false,
                support: '',
                community: ''
            });
        })
        .catch(err => setError(err.message));
    };

    return (
        <div className={styles.container}>
            <input 
                name="venue"
                value={review.venue}
                onChange={handleChange}
                placeholder="Venue"
                className={styles.inputField}
            />
            <textarea 
                name="review"
                value={review.review}
                onChange={handleChange}
                placeholder='Review this venue'
                className={styles.textAreaField}
            ></textarea>
            <input 
                name="inclusivity"
                type="number"
                min="1"
                max="5"
                onChange={handleChange}
                placeholder='Inclusivity'
                className={styles.inputField}
            />
            <input 
                name="safety"
                type="number"
                min="1"
                max="5"
                onChange={handleChange}
                placeholder='Safety'
                className={styles.inputField}
            />
            <input 
                name="date"
                type="date"
                onChange={handleChange}
                placeholder='Date'
                className={styles.inputField}
            />
            <input 
                type="checkbox"
                name="isUniversity"
                checked={review.isUniversity}
                onChange={handleChange}
            />
            <label>Is this a University?</label>

            {review.isUniversity && (
                <>
                    <input 
                        name="support"
                        type="number"
                        min="1"
                        max="5"
                        onChange={handleChange}
                        placeholder='Support'
                        className={styles.inputField}
                    />
                    <input 
                        name="community"
                        type="number"
                        min="1"
                        max="5"
                        onChange={handleChange}
                        placeholder='Community'
                        className={styles.inputField}
                    />
                </>
            )}

            <button onClick={handleSubmit} className={styles.submitButton}>
                Submit Review
            </button>
        </div>
    );
}

export default AddReview;
