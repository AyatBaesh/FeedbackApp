import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([]);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    });

    //Fetch feedback
    useEffect(() => {
        fetchFeedback();
    }, []);
    const fetchFeedback = async () => {
        const response = await fetch(`/feedback?_sort=id`);
        console.log(response)
        const data = await response.json();
        console.log(data)
        setFeedback(data);
        setIsLoading(false);
    }
    //Delete Feedback
    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            await fetch(`/feedback/${id}`, { method: 'DELETE' });
            setFeedback(feedback.filter((item) => item.id != id));
        }
    }

    //Add Feedback
    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newFeedback)
        })
        const data = await response.json();

        setFeedback([data, ...feedback]);
    }

    //Edit Feedback
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true,
        });
    }

    //Update Feedback Item
    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updItem),
        });
        const data = await response.json();

        setFeedback(feedback.map((item) => item.id === id ? { ...item, ...data } : item));
        setFeedbackEdit({
            item: {},
            edit: false,
        })

    }

    return (
        <FeedbackContext.Provider value={{
            feedback,
            feedbackEdit,
            isLoading,
            deleteFeedback,
            addFeedback,
            editFeedback,
            updateFeedback,
        }}>
            {children}
        </FeedbackContext.Provider>
    );
}

export default FeedbackContext