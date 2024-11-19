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
    if (value === "Other") {
      setOtherContact("");
    }
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

    setErrorMessage(""); // Clear error message

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
        <div id="prescreening">
          <h2>Eligibility Confirmation</h2>
          <p>Please confirm that your partner is currently pregnant and under the care of EPUT.</p>
          <label>
            <input type="checkbox" id="eligibility" required /> Confirm
          </label>
          <div className={styles.formButtonContainer}>
            <button
              className={styles.fancyButton}
              type="button"
              onClick={handleContinue}
              aria-label="Confirm eligibility and continue"
            >
              Continue
            </button>
          </div>
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </div>
      ) : (
        <div id="form-container">
          <div className={styles.logoContainer}>
            <img
              src="https://raw.githubusercontent.com/RCaseyP1st/Wellbeing-Review-Form/master/0ZpzuRHRXvVLxGe06x90smrbd7iaTr8sN7GzfW88.png"
              alt="Parents 1st Essex Logo"
              className={styles.logo}
            />
            <img
              src="https://raw.githubusercontent.com/RCaseyP1st/Wellbeing-Review-Form/master/OHHLogoHoizontal.png"
              alt="Other Half Hub Logo"
              className={styles.logo}
            />
          </div>
          <h1>Wellbeing Review Request Form</h1>
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          <form id="wellbeingForm" onSubmit={handleSubmit}>
            <label htmlFor="name">
              Name: <span className={styles.required}>*</span>
            </label>
            <input type="text" id="name" name="name" placeholder="Your Name" required />

            <label htmlFor="email">Email Address:</label>
            <input type="email" id="email" name="email" placeholder="Your Email Address" />

            <label htmlFor="postcode">
              Postcode: <span className={styles.required}>*</span>
            </label>
            <input type="text" id="postcode" name="postcode" placeholder="Your Postcode" required />

            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" />

            <label>Preferred Method of Contact:</label>
            <p>You can select more than 1 option</p>
            <div className={styles.checkboxGroup}>
              <label>
                <input
                  type="checkbox"
                  name="contactMethod"
                  value="Phone Call"
                  onChange={handleCheckboxChange}
                />
                Phone Call
              </label>
              <label>
                <input
                  type="checkbox"
                  name="contactMethod"
                  value="Microsoft Teams"
                  onChange={handleCheckboxChange}
                />
                Microsoft Teams
              </label>
              <label>
                <input
                  type="checkbox"
                  name="contactMethod"
                  value="Zoom"
                  onChange={handleCheckboxChange}
                />
                Zoom
              </label>
              <label>
                <input
                  type="checkbox"
                  name="contactMethod"
                  value="Other"
                  onChange={handleCheckboxChange}
                />
                Other (Please specify)
              </label>
            </div>
            {selectedMethods.includes("Other") && (
              <textarea
                id="otherContact"
                value={otherContact}
                onChange={(e) => setOtherContact(e.target.value)}
                placeholder="e.g., Text Messages (SMS) or WhatsApp"
              />
            )}

            <p className={styles.consent}>
              Please confirm that you understand how the information you have given us will be used, shared,
              and stored by us and that you give your consent for this by checking the box below.
            </p>
            <label>
              <input type="checkbox" id="consent" required /> Consent <span className={styles.required}>*</span>
            </label>
            <div className={styles.formButtonContainer}>
              <button
                className={styles.fancyButton}
                type="submit"
                aria-label="Submit Wellbeing Review Request Form"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default WellbeingForm;
