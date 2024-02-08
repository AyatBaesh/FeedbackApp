
import React, { useState, useContext, useEffect } from 'react';
import Card from './shared/Card';
import Button from './shared/Button';
import RatingSelect from './RatingSelect';
import FeedbackContext from '../context/FeedbackContext';

export default function FeedbackForm() {

    const [text, setText] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(10);

    const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext);


    //if edit {setText(item.text) setRating(item.rating)}
    useEffect(() => {
        if (feedbackEdit.edit === true) {
            setBtnDisabled(false);
            setText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
        }

    }, [feedbackEdit])

    const handleTextChange = (e) => {
        if (text === '') {
            setBtnDisabled(true);
            setMessage(null);
        } else if (text !== '' && text.trim().length < 10) {
            setMessage('Text must be at least 10 characters');
        } else {
            setMessage(null);
            setBtnDisabled(false);
        }
        setText(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim().length > 10) {
            const newFeedback = {
                text,
                rating
            }
            if (feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback);
                feedbackEdit.edit = false;
            } else {
                addFeedback(newFeedback);

            }
            setText('');
        }

    }
    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us?</h2>
                <RatingSelect select={(rating) => setRating(rating)} />
                {/* @todo rating select component */}
                <div className="input-group">
                    <input
                        type="text"
                        onChange={handleTextChange}
                        value={text}
                        placeholder="Write a review"
                    />
                    {/* Button component */}
                    <Button type="submit" isDisabled={btnDisabled}>Send</Button>
                </div>
                {message && <div className='message'>{message}</div>}
            </form>
        </Card>
    )
}
