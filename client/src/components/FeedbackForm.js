import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/feedback', { feedbackText: feedback }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Feedback submitted successfully');
      setFeedback(''); // Clear the feedback input after submission
      setSubmissionStatus('Feedback submitted successfully. Thank you!');
    } catch (error) {
      console.error('Error submitting feedback: ', error.message, error);
      setSubmissionStatus('Error submitting feedback. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
      {submissionStatus && <p>{submissionStatus}</p>}
    </div>
  );
};

export default FeedbackForm;