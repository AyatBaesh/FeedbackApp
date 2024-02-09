import { motion, AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import FeedbackItem from './FeedbackItem.jsx';
import FeedbackContext from '../context/FeedbackContext.jsx';
import Spinner from './shared/Spinner.jsx';
export default function FeedbackList() {
    const { feedback, isLoading } = useContext(FeedbackContext);

    if (!isLoading && (!feedback || feedback.length === 0)) {
        return <p>No feedback yet</p>
    }

    return isLoading ? <Spinner /> :
        <div className='feedback-list'>
            <AnimatePresence>
                {feedback.map((item) => (

                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <FeedbackItem key={item.id} item={item} />
                    </motion.div>

                ))}
            </AnimatePresence>

        </div>


}

