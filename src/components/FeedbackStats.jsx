import React from 'react';
import PropTypes from 'prop-types';
export default function FeedbackStats({ feedback }) {
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
FeedbackStats.propTypes = {
    feedback: PropTypes.array.isRequired,
}
