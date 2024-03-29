import React from 'react';
import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';
export default function FeedbackStats() {
    const { feedback } = useContext(FeedbackContext);
    //Calculate Average Rating
    let ratingSum = feedback.reduce((acc, current) => {
        return acc + current.rating;
    }, 0);
    let average = ratingSum / feedback.length;
    average = average.toFixed(1).replace(/[.,]0/, '');
    return (
        <div className='feedback-stats'>
            <h4>{feedback.length} reviews</h4>
            <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
        </div>
    )
}
