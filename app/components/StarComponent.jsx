import React from "react";
import styles from './Star.module.css';

function StarComponent({ rating }) {
    const fullStars = Math.floor(rating);
    const fractionalStarWidth = (rating - fullStars) * 100;

    return (
        <div className={styles.ratingContainer}>
            <span className={styles.ratingNumber}>{rating.toFixed(1)}</span> 
            <div className={styles.starContainer}>
                {[...Array(fullStars)].map((_, i) => (
                    <img src="/star.png" alt="star" key={`full-${i}`} className={styles.fullStar} />
                ))}
                {fractionalStarWidth > 0 && (
                    <div className={styles.starWrapper}>
                        <img src="/greyStar.png" alt="grey star" className={styles.fractionalStar} />
                        <div className={styles.fractionalStarOverlay} style={{ width: `${fractionalStarWidth}%` }}>
                            <img src="/star.png" alt="fractional star" className={styles.fractionalStar} />
                        </div>
                    </div>
                )}
                {[...Array(5 - fullStars - (fractionalStarWidth > 0 ? 1 : 0))].map((_, i) => (
                    <img src="/greyStar.png" alt="grey star" key={`grey-${i}`} className={styles.fullStar} />
                ))}
            </div>
        </div>
    );
}
export default StarComponent;
