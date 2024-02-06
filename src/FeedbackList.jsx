import React from 'react';
import PropTypes from 'prop-types';
import FeedbackItem from './components/FeedbackItem.jsx';
export default function FeedbackList({ feedback, handleDelete }) {
    if (!feedback || feedback.length === 0) {
        return <p>No feedback yet</p>
    }
    return (
        <div className='feedback-list'>
            {feedback.map((item) => {
                return <FeedbackItem item={item} key={item.id} handleDelete={handleDelete} />
            })}
        </div>
    );
}

FeedbackList.propTypes = {
    feedback: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            rating: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
        })
    ),
}

