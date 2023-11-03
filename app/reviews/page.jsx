"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import styles from './reviews.module.css'

const AddReview = (props) => {
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
    }, [props.venue]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedValue = name === 'isUniversity' ? e.target.checked : value;
        setReview(prevState => ({ ...prevState, [name]: updatedValue }));
        console.log(review)
    };

    const backendURL = process.env.BACKEND_URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${backendURL}/AddReview`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(review),
            });

            if (res.status === 200) {
               
                alert("Review submitted successfully!");
                
                
                onReviewSubmit(review);

                // Reset the form
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
            } else {
                alert(`Error submitting review: ${res.status}`);
            }
        } catch (err) {
            setError(err.message);
            alert(`Error submitting review: ${err.message}`);
        }
    };


    return (
        <div className={styles.container}>
            <label htmlFor="venue">Venue</label>
            <input
                id="venue"
                name="venue"
                value={review.venue}
                onChange={handleChange}
                placeholder="Venue"
                className={styles.inputField}
            />

            <label htmlFor="reviewText">Review</label>
            <textarea
                id="reviewText"
                name="review"
                value={review.review}
                onChange={handleChange}
                placeholder='Review this venue'
                className={styles.textAreaField}
            ></textarea>

            <label htmlFor="inclusivity">Inclusivity</label>
            <input
                id="inclusivity"
                name="inclusivity"
                type="number"
                min="1"
                max="5"
                onChange={handleChange}
                placeholder='Inclusivity'
                className={styles.inputField}
                value={review.inclusivity}
            />

            <label htmlFor="safety">Safety</label>
            <input
                id="safety"
                name="safety"
                type="number"
                min="1"
                max="5"
                onChange={handleChange}
                placeholder='Safety'
                className={styles.inputField}
                value={review.safety}
            />

            <label htmlFor="date">Date</label>
            <input
                id="date"
                name="date"
                type="date"
                onChange={handleChange}
                className={styles.inputField}
                value={review.date}
            />

            <label htmlFor="isUniversity">Is this a University?</label>
            <input
                id="isUniversity"
                type="checkbox"
                name="isUniversity"
                checked={review.isUniversity}
                onChange={handleChange}
            />

            {review.isUniversity && (
                <>
                    <label htmlFor="support">Support</label>
                    <input
                        id="support"
                        name="support"
                        type="number"
                        min="1"
                        max="5"
                        onChange={handleChange}
                        placeholder='Support'
                        className={styles.inputField}
                        value={review.support}
                    />

                    <label htmlFor="community">Community</label>
                    <input
                        id="community"
                        name="community"
                        type="number"
                        min="1"
                        max="5"
                        onChange={handleChange}
                        placeholder='Community'
                        className={styles.inputField}
                        value={review.community}
                    />
                </>
            )}

            <Button onClick={handleSubmit} className={styles.submitButton}>
                Submit Review
            </Button>
        </div>
    );
}

export default AddReview