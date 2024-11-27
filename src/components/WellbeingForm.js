import React, { useState } from "react";
import styles from "../styles/formstyle.module.css";

const WellbeingForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [otherContact, setOtherContact] = useState(""); // State for 'Other' contact input


  const handleContinue = () => {
    const eligibility = document.getElementById("eligibility").checked;
    if (eligibility) {
      setShowForm(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Please confirm eligibility.");
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedMethods([...selectedMethods, value]);
      if (value === "Other") setOtherContact(""); // Show 'Other' input box
    } else {
      setSelectedMethods(selectedMethods.filter((method) => method !== value));
      if (value === "Other") setOtherContact(""); // Clear 'Other' input box when unticked
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const postcode = document.getElementById("postcode").value.trim();
    const consent = document.getElementById("consent").checked;

    if (!name || !postcode || !consent) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    // Conditional validation based on preferred contact methods
    if (selectedMethods.includes("Microsoft Teams") || selectedMethods.includes("Zoom")) {
      if (!email) {
        setErrorMessage("Email is required for Microsoft Teams or Zoom.");
        document.getElementById("email").focus();
        return;
      }

      if (selectedMethods.includes("Other") && !otherContact.trim()) {
        setErrorMessage("Please specify your preferred contact method under 'Other'.");
        return;
      }


      // Optional: Add regex validation for email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setErrorMessage("Please provide a valid email address.");
        document.getElementById("email").focus();
        return;
      }
    }

    if (selectedMethods.includes("Phone Call")) {
      if (!phone) {
        setErrorMessage("Phone number is required for Phone Call.");
        document.getElementById("phone").focus();
        return;
      }

      // Optional: Validate phone number format (UK example)
      const phonePattern = /^(\+44|0)7\d{9}$/;
      if (!phonePattern.test(phone)) {
        setErrorMessage("Please provide a valid UK phone number.");
        document.getElementById("phone").focus();
        return;
      }
    }

    // Submit data to AirTable
    const { area, hub } = determineHub(postcode);

    const airtableData = {
      records: [
        {
          fields: {
            Name: name,
            Email: email,
            Postcode: postcode,
            Phone: phone,
            Area: area,
            Hub: hub,
            Consent: consent ? "Yes" : "No",
            "Preferred Method of Contact": selectedMethods,
          },
        },
      ],
    };

    try {
      const response = await fetch(
        "https://api.airtable.com/v0/appESMQNwIowYCCld/Wellbeing%20Review%20request%20form",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer patSU10Pp0hh1NOgo.7554e4280a027e73e31574edeff1ad25a40803a6aabe8f111f34aa0721c48d80",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(airtableData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("AirTable API Error:", errorData);
        setErrorMessage("Failed to submit the form. Please try again.");
        return;
      }

      const responseData = await response.json();
      console.log("Successfully submitted to AirTable:", responseData);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting to AirTable:", error);
      setErrorMessage("An error occurred while submitting the form. Please try again.");
    }
  };



  return (
    <div className={styles.wellbeingFormContainer}>
      {/* Eligibility Confirmation Section */}
      {!showForm ? (
        <div className={styles.prescreening}>
          <h2>Eligibility Confirmation</h2>
          <p>
            Please confirm that your partner is currently pregnant and under the care
            of EPUT (Essex Partnership University Trust).
          </p>
          <label>
            <input type="checkbox" id="eligibility" />
            Confirm Eligibility
          </label>
          <button
            className={styles.fancyButton}
            onClick={() => {
              const eligibility = document.getElementById("eligibility").checked;
              if (eligibility) {
                setShowForm(true); // Show the main form
                setErrorMessage(""); // Clear any previous error
              } else {
                setErrorMessage(
                  "Please confirm that your partner is currently pregnant and under the care of EPUT."
                );
              }
            }}
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
            <label htmlFor="name">
              Name: <span className={styles.required}>*</span>
            </label>
            <input
              className={styles.input}
              id="name"
              placeholder="Your Name"
              required
            />

            <label htmlFor="email">
              Email Address:{" "}
              {selectedMethods.includes("Microsoft Teams") || selectedMethods.includes("Zoom") ? (
                <span className={styles.required}>*</span>
              ) : null}
            </label>
            <input
              className={styles.input}
              id="email"
              placeholder="Your Email Address"
            />

            <label htmlFor="phone">
              Phone Number:{" "}
              {selectedMethods.includes("Phone Call") ? (
                <span className={styles.required}>*</span>
              ) : null}
            </label>
            <input
              className={styles.input}
              id="phone"
              placeholder="Your Phone Number"
            />

            {/* Preferred Method of Contact */}
            <label>Preferred Method of Contact:</label>
            <div className={styles.checkboxGroup}>
              {["Phone Call", "Microsoft Teams", "Zoom", "Other"].map((method) => (
                <label key={method}>
                  <input
                    type="checkbox"
                    value={method}
                    onChange={handleCheckboxChange}
                  />
                  {method}
                </label>
              ))}
              {selectedMethods.includes("Other") && (
                <textarea
                  className={styles.textarea}
                  id="otherContact"
                  placeholder="e.g., Text Messages (SMS) or WhatsApp"
                  value={otherContact}
                  onChange={(e) => setOtherContact(e.target.value)}
                />
              )}
            </div>
            <p>
              <strong>Consent Statement:</strong>
            </p>
            <p className={styles.consent}>
              Are you happy for us to store the information we may talk about? We will look after any personal information that is shared with us. This is central to our values as an organisation. We want everyone who interacts with us to feel confident about how any personal information they share will be looked after or used.
              <br />
              <br />
              You can be confident that:
              <br />• We only use personal information in the ways we need to, that is expected of us and that we have a lawful basis for.
              <br />• We respect the rights you have as an individual by having procedures in place to protect these.
              <br />• We will make it easy for you to tell us how you want us to communicate with you, including how to opt out from future communications, rectify inaccurate data or request access—and your request will be respected in a timely manner.
              <br />• We will never release your information to organisations outside Parents 1st for their marketing purposes.
              <br />• We take all reasonable care to safeguard your personal information through security policies and secure business processes.
              <br />• We will provide easy ways for you to contact us. We are always happy to answer any queries you have, at any time.
              <br />
              <br />
              We will need to store the information you have given us today securely on our computer system or on paper.
              <br />
              <br />
              We will need to use the information in order to recommend resources and services we think might benefit you the most.
              <br />
              <br />
              How we share and store your personal information:
              <br />• Your Wellbeing Coordinator will record and store information about you and the support you are receiving. This will be done using a code to protect your identity and your personal details will be stored separately.
              <br />• Your Wellbeing Coordinator will share information on a regular basis with their supervisor so as to help us provide you with the best possible service.
              <br />• For monitoring and evaluation, we may share information with partner organisations and those who provide the funding. You will not be identified by name and only numbers and statistics are given. The only exception to this is that we may provide the NHS with information that does identify you, and your baby via your NHS number.
              <br />• In any other circumstances, we will ask for your consent before we share any personal information about you or your family and tell you that we are going to do so.
              <br />• We will not ask for your consent and may not inform you that we are going to share information if there is a risk of significant or serious harm to a child or adult or if it is in the public interest not to do so.
              <br />
              <br />
              If you would like more information about our confidentiality, data protection, and information sharing policies and procedures, please let us know.
              <br />
              <br />
              <a
                href="https://www.dropbox.com/scl/fi/zgsch7s77gtat9g19bntw/Information-Sharing-Agreement-Essex-Peer-to-Parent-Network.docx?rlkey=m1bahd0u8a63j6tqpz4pknry4&st=58fot45o&dl=0"
                target="_blank"
                rel="noopener noreferrer"
              >
                Parents 1st - Information Sharing Agreement
              </a>
              <br />
              <br />
              Please confirm that you understand how the information you have given us will be used, shared, and stored by us and that you give your consent for this by checking the box below.
            </p>
            <div className={styles.consentandsubmit}>
              <label>
                <input type="checkbox" id="consent" required /> Consent{" "}
                <span className={styles.required}>
                  <font color="red">*</font>
                </span>
              </label>
              <p></p>
              <button className={styles.fancyButton} type="submit" aria-label="Submit Wellbeing Review Request Form">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// Mapping of postcodes to hubs
const postcodeToHubMap = {
  "North Essex": {
    "North West": ["CB10", "CB11", "CM16", "CM17", "CM19", "CM20", "CM22", "CM23", "CM24", "EN9", "IG10"],
    "North East": ["CO1", "CO2", "CO3", "CO4", "CO5", "CO6", "CO7", "CO8", "CO9", "CO10", "CO11", "CO12", "CO13", "CO14", "CO15", "CO16"],
    "Mid Essex": ["CM0", "CM1", "CM2", "CM3", "CM4", "CM5", "CM6", "CM7", "CM8", "CM9"],
  },
  "South Essex": {
    "South West": ["CM11", "CM12", "CM13", "CM14", "CM15", "RM14", "RM15", "RM16", "RM17", "RM18", "RM19", "RM20"],
    "South East": ["SS0", "SS1", "SS2", "SS3", "SS4", "SS5", "SS6", "SS7", "SS8", "SS9", "SS11", "SS12", "SS13", "SS14", "SS15", "SS16", "SS17"],
  },
};

// Function to determine the hub based on the postcode
const determineHub = (postcode) => {
  const outwardCode = postcode.trim().split(" ")[0].toUpperCase();

  for (const [area, hubs] of Object.entries(postcodeToHubMap)) {
    for (const [hub, postcodes] of Object.entries(hubs)) {
      if (postcodes.includes(outwardCode)) {
        return { area, hub };
      }
    }
  }

  return { area: "Unknown", hub: "Unknown" }; // Default if no match is found
};


export default WellbeingForm;
