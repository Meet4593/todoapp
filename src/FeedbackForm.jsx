import React, { useState } from 'react';
import './FeedbackForm.css'; // We'll create this CSS file later

function FeedbackForm() {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // State for form validation errors
  const [errors, setErrors] = useState({});

  // State for submitted feedback
  const [submittedFeedback, setSubmittedFeedback] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    // Check if name is empty
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Check if email is empty or invalid
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Check if message is empty
    if (!formData.message.trim()) {
      newErrors.message = 'Feedback message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    
    // Form is valid if newErrors object has no properties
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Validate the form
    const isValid = validateForm();
    
    if (isValid) {
      // Save the submitted feedback
      setSubmittedFeedback({ ...formData });
      
      // Clear the form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }
  };

  return (
    <div className="feedback-container">
      <h1>Feedback Form</h1>
      
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error-input' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error-input' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Feedback Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className={errors.message ? 'error-input' : ''}
          />
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>
        
        <button type="submit" className="submit-button">Submit Feedback</button>
      </form>
      
      {submittedFeedback && (
        <div className="submitted-feedback">
          <h2>Submitted Feedback</h2>
          <div className="feedback-card">
            <p><strong>Name:</strong> {submittedFeedback.name}</p>
            <p><strong>Email:</strong> {submittedFeedback.email}</p>
            <p><strong>Message:</strong> {submittedFeedback.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedbackForm;