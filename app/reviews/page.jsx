'use client'
import React, { useState } from 'react';
import styles from './reviews.module.css'

function AddReview() {
    const [review, setReview] = useState({
        venue: '',
        review: '',
        inclusivity: '',
        safety: '',
        date: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = () => {
        fetch(`http://localhost:4000/AddReview`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: review,
        })
        .then(res => {
            console.log(res.status);
            setReview({
                venue: '',
                review: '',
                inclusivity: '',
                safety: '',
                date: ''
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
                placeholder='review this venue'
                className={styles.textAreaField}
            ></textarea>

            <input 
                name= "inclusivity"
                type="number"
                onChange={handleChange}
                placeholder='inclusivity'
                className={styles.inputField}
            />
            <input 
                name="safety"
                type="number"
                onChange={handleChange}
                placeholder='safety'
                className={styles.inputField}
            />
            <input 
                name= "date"
                type="date"
                onChange={handleChange}
                placeholder='date'
                className={styles.inputField}
            />
            
            <button onClick={handleSubmit} className={styles.submitButton}>
                Submit Review
            </button>
        </div>
    );
}

export default AddReview;