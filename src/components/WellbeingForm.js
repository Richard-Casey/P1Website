// src/components/WellbeingForm.js
import React, { useState } from 'react';
import '../styles/formstyle.css';

const WellbeingForm = ({ onReturn }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    postcode: '',
    phone: '',
    consent: false,
    eligibility: false,
    contactMethod: [],
    otherContact: '',
  });

  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleContactMethodChange = (method) => {
    setFormData((prevData) => ({
      ...prevData,
      contactMethod: prevData.contactMethod.includes(method)
        ? prevData.contactMethod.filter((m) => m !== method)
        : [...prevData.contactMethod, method],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.eligibility) newErrors.eligibility = 'Eligibility confirmation is required.';
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.postcode) newErrors.postcode = 'Postcode is required.';
    if (!formData.consent) newErrors.consent = 'Consent is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch('https://api.airtable.com/v0/appESMQNwIowYCCld/Wellbeing%20Review%20request%20form', {
        method: 'POST',
        headers: {
          Authorization: `Bearer YOUR_AIRTABLE_TOKEN`, // Use actual token here
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Name: formData.name,
                Email: formData.email,
                Postcode: formData.postcode,
                Phone: formData.phone,
                Consent: formData.consent,
                Eligibility: formData.eligibility,
                "Preferred Method of Contact": formData.contactMethod,
                "Other Contact": formData.otherContact,
              },
            },
          ],
        }),
      });

      if (!response.ok) throw new Error('Failed to submit data');

      setSubmissionStatus('success');
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="wellbeing-form-container">
      {submissionStatus === 'success' ? (
        <div className="success-message">
          <h1>Thank You!</h1>
          <p>Your form has been submitted successfully.</p>
          <button onClick={onReturn}>Return to The Other Half-Hub</button>
        </div>
      ) : (
        <>
          <h1>Wellbeing Review Request Form</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Name: <span className="required">*</span>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              {errors.name && <div className="error">{errors.name}</div>}
            </label>

            <label>
              Email Address:
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>

            <label>
              Postcode: <span className="required">*</span>
              <input type="text" name="postcode" value={formData.postcode} onChange={handleChange} required />
              {errors.postcode && <div className="error">{errors.postcode}</div>}
            </label>

            <label>
              Phone Number:
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            </label>

            <label>Preferred Method of Contact:</label>
            <div className="checkbox-group">
              {['Phone Call', 'Microsoft Teams', 'Zoom', 'Other'].map((method) => (
                <label key={method}>
                  <input
                    type="checkbox"
                    name="contactMethod"
                    checked={formData.contactMethod.includes(method)}
                    onChange={() => handleContactMethodChange(method)}
                  />
                  {method}
                </label>
              ))}
            </div>

            {formData.contactMethod.includes('Other') && (
              <textarea
                name="otherContact"
                placeholder="Specify other contact method"
                value={formData.otherContact}
                onChange={handleChange}
              />
            )}

            <label className="consent">
              <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} />
              I consent to the use of my information as stated above <span className="required">*</span>
              {errors.consent && <div className="error">{errors.consent}</div>}
            </label>

            <button type="submit">Submit</button>
            {submissionStatus === 'error' && <div className="error">Submission failed. Please try again.</div>}
          </form>
        </>
      )}
    </div>
  );
};

export default WellbeingForm;
