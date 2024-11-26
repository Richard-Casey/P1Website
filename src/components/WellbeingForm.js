import React, { useState } from "react";
import styles from "../styles/formstyle.module.css";

const WellbeingForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [otherContact, setOtherContact] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleContinue = () => {
    const eligibility = document.getElementById("eligibility").checked;
    if (eligibility) {
      setShowForm(true);
      setErrorMessage("");
    } else {
      setErrorMessage(
        "Please confirm that your partner is currently pregnant and under the care of EPUT."
      );
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (value === "Other") setOtherContact("");
    if (checked) {
      setSelectedMethods([...selectedMethods, value]);
    } else {
      setSelectedMethods(selectedMethods.filter((method) => method !== value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const postcode = document.getElementById("postcode").value;
    const phone = document.getElementById("phone").value;
    const consent = document.getElementById("consent").checked;

    if (!name || !postcode || !consent) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (selectedMethods.includes("Other") && !otherContact) {
      setErrorMessage("Please specify your preferred contact method under 'Other'.");
      return;
    }

    setErrorMessage("");
    console.log({
      name,
      email,
      postcode,
      phone,
      contactMethods: selectedMethods,
      otherContact,
      consent,
    });

    alert("Form submitted successfully!");
  };

  return (
    <div className={styles.wellbeingFormContainer}>
      {!showForm ? (
        <div className={styles.prescreening}>
          <h2>Eligibility Confirmation</h2>
          <p>Please confirm that your partner is currently pregnant and under the care of EPUT.</p>
          <label className={styles.defaultCheckbox}>
            <input type="checkbox" id="eligibility" />
            Confirm
          </label>
          <button
            className={styles.fancyButton}
            type="button"
            onClick={handleContinue}
            aria-label="Confirm eligibility and continue"
          >
            Continue
          </button>
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </div>
      ) : (
        <div className={styles.formContainer}>
          <h1>Wellbeing Review Request Form</h1>
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              className={styles.input}
              type="text"
              id="name"
              placeholder="Your Name"
              required
            />

            <label htmlFor="email">Email Address:</label>
            <input
              className={styles.input}
              type="email"
              id="email"
              placeholder="Your Email Address"
            />

            <label htmlFor="postcode">Postcode:</label>
            <input
              className={styles.input}
              type="text"
              id="postcode"
              placeholder="Your Postcode"
              required
            />

            <label htmlFor="phone">Phone Number:</label>
            <input
              className={styles.input}
              type="tel"
              id="phone"
              placeholder="Your Phone Number"
            />

            <label>Preferred Method of Contact:</label>
            <p>You can select more than one option</p>
            <div className={styles.checkboxGroup}>
              {["Phone Call", "Microsoft Teams", "Zoom", "Other"].map((method) => (
                <label className={styles.defaultCheckbox} key={method}>
                  <input
                    type="checkbox"
                    name="contactMethod"
                    value={method}
                    onChange={handleCheckboxChange}
                  />
                  {method}
                </label>
              ))}
            </div>

            {selectedMethods.includes("Other") && (
              <textarea
                id="otherContact"
                className={styles.textarea}
                placeholder="e.g., Text Messages (SMS) or WhatsApp"
                value={otherContact}
                onChange={(e) => setOtherContact(e.target.value)}
              />
            )}

            <p className={styles.consent}>
              Please confirm that you give consent for us to store your information.
            </p>
            <label className={styles.defaultCheckbox}>
              <input type="checkbox" id="consent" required />
              Consent
            </label>

            <button className={styles.fancyButton} type="submit">
              Submit
            </button>
          </form>

        </div>
      )}
    </div>
  );
};

export default WellbeingForm;
