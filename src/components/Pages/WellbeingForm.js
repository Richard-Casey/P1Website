import React, { useState } from "react";
import styles from "../../styles/formstyle.module.css";


const airtableFieldIDs = {
  name: "fldGQWRH8i2CYAvB1", // Airtable field ID for "Name"
  email: "fldOyQYkgJ8bjIAA8", // Airtable field ID for "Email Address"
  phone: "fldu236HwQ59qj94D", // Airtable field ID for "Phone Number"
  postcode: "fldQ6g39M366IJUM1", // Airtable field ID for "Postcode"
  serviceAccessed: "fld0LF9nyNoOcvMOM", // Airtable field ID for "How was this service accessed"
  ethnicity: "fld4cQInfFK3AGB99", // Airtable field ID for "Ethnicity"
  gender: "fldx12jZJwIsHTj2O", // Airtable field ID for "Gender"
  dob: "fldo3oBHv04ifJQdL", // Airtable field ID for "Date of Birth"
  livingWithPregnantPerson: "fldWkGl9X4YwQR2dX", // Airtable field ID for "Living with Partner?"
  gestation: "fldLjNR2V8fTYUD8L", // Airtable field ID for "Gestation Period"
  preferredContactMethods: "fld1YO1uvizsAtPof", // Airtable field ID for "Preferred Method of Contact"
  otherContactMethod: "fldr0byBLdNwY0kfv", // Airtable field ID for "Other Method of Contact"
  consent: "fld6XWbmq0mfUrCKx", // Airtable field ID for "Consent"
  confirmEligibility: "fldfla0da1qyZV7Kb", // Airtable field ID for "Confirm Eligability"
  localHub: "fldbIco8KuGrZ35cc"// Airtable field ID for "Local Hub"
};

const airtableURL = "https://api.airtable.com/v0/appESMQNwIowYCCld/Wellbeing%20Review%20request%20form";

const WellbeingForm = () => {
  // State variables
  const [eligibility, setEligibility] = useState(false); // Declare inside the component
  const [showForm, setShowForm] = useState(false);
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [otherContact, setOtherContact] = useState(""); // State for 'Other' contact input
  const [success, setSuccess] = useState(false); // State for success message
  const [localHub, setLocalHub] = useState(""); // State for Local Hub

  const handleContinue = () => {
    const isEligible = document.getElementById("eligibility").checked; // Check the checkbox value

    if (isEligible) {
      setEligibility(true); // Persist eligibility in state
      setShowForm(true); // Show the main form
      setErrorMessage(""); // Clear any error messages
    } else {
      setErrorMessage("Please confirm eligibility.");
      document.getElementById("eligibility")?.focus(); // Focus on the checkbox
    }
  };

  // Handle postcode changes
  const handlePostcodeChange = (event) => {
    const postcode = event.target.value.trim();
    const hub = determineHub(postcode);
    setLocalHub(hub);
    console.log("Local Hub:", hub); // Debugging
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
  
    // Retrieve the postcode value first
    const postcode = document.querySelector("#postcode")?.value.trim();
  
    // Validate localHub
    if (!localHub) {
      setErrorMessage("Postcode is required.");
      document.querySelector("#postcode")?.focus();
      return;
    }
    
    // If postcode is not mapped, set localHub to "Not Recognised" and continue
    if (localHub === "Not Recognised") {
      console.warn(`Unmapped postcode (${postcode}) submitted with Local Hub set to "Not Recognised".`);
    }
    
  
    if (!eligibility) {
      setErrorMessage("Please confirm eligibility.");
      return; // Stop submission
    }
  
    // Retrieve other form values
    const name = document.querySelector("#name")?.value.trim();
    const email = document.querySelector("#email")?.value.trim();
    const phone = document.querySelector("#phone")?.value.trim();
    const consent = document.querySelector("#consent")?.checked;
    const serviceAccessed = document.querySelector("#serviceAccessed")?.value.trim();
    const ethnicity = document.querySelector("#ethnicity")?.value.trim();
    const gender = document.querySelector("#gender")?.value.trim();
    const dob = document.querySelector("#dob")?.value.trim();
    const livingWithPregnantPerson = document.querySelector(
      'input[name="livingWithPregnantPerson"]:checked'
    )?.value;
    const gestation = document.querySelector("#gestation")?.value.trim();
    const preferredContactMethods = selectedMethods; // From state
    const otherContactMethod = otherContact.trim(); // From state
  
    // Validate required fields
    if (!eligibility) {
      setErrorMessage("Please confirm eligibility.");
      document.querySelector("#eligibility")?.focus();
      return;
    }
  
    if (!name) {
      setErrorMessage("Name is required.");
      document.querySelector("#name")?.focus();
      return;
    }
  
    if (!postcode) {
      setErrorMessage("Postcode is required.");
      document.querySelector("#postcode")?.focus();
      return;
    }
  
    if (!consent) {
      setErrorMessage("Consent is required.");
      document.querySelector("#consent")?.focus();
      return;
    }
  
    if (!ethnicity) {
      setErrorMessage("Ethnicity is required.");
      document.querySelector("#ethnicity")?.focus();
      return;
    }
  
    if (!gender) {
      setErrorMessage("Gender is required.");
      document.querySelector("#gender")?.focus();
      return;
    }
  
    if (!dob) {
      setErrorMessage("Date of Birth is required.");
      document.querySelector("#dob")?.focus();
      return;
    }
  
    if (!livingWithPregnantPerson) {
      setErrorMessage("Living with pregnant person status is required.");
      document.querySelector('input[name="livingWithPregnantPerson"]')?.focus();
      return;
    }
  
    if (!gestation) {
      setErrorMessage("Gestation period is required.");
      document.querySelector("#gestation")?.focus();
      return;
    }
  
    if (preferredContactMethods.includes("Microsoft Teams") || preferredContactMethods.includes("Zoom")) {
      if (!email) {
        setErrorMessage("Email is required for Microsoft Teams or Zoom.");
        document.querySelector("#email")?.focus();
        return;
      }
    }
  
    if (preferredContactMethods.includes("Other") && !otherContactMethod) {
      setErrorMessage("Please specify your preferred contact method under 'Other'.");
      document.querySelector("#otherContact")?.focus();
      return;
    }
  
    if (preferredContactMethods.includes("Phone Call")) {
      if (!phone) {
        setErrorMessage("Phone number is required for Phone Call.");
        document.querySelector("#phone")?.focus();
        return;
      }
      const phonePattern = /^(\+44|0)7\d{9}$/;
      if (!phonePattern.test(phone)) {
        setErrorMessage("Please provide a valid UK phone number.");
        document.querySelector("#phone")?.focus();
        return;
      }
    }
  
    console.log("Submitting Local Hub:", localHub);
  
    // All validations passed
    setErrorMessage(""); // Clear any previous error messages
  
    // Prepare data for submission
    const airtableData = {
      records: [
        {
          fields: {
            [airtableFieldIDs.name]: name,
            [airtableFieldIDs.email]: email,
            [airtableFieldIDs.phone]: phone,
            [airtableFieldIDs.postcode]: postcode,
            [airtableFieldIDs.localHub]: localHub, // Add local hub to submission
            [airtableFieldIDs.serviceAccessed]: serviceAccessed,
            [airtableFieldIDs.ethnicity]: ethnicity,
            [airtableFieldIDs.gender]: gender,
            [airtableFieldIDs.dob]: dob,
            [airtableFieldIDs.livingWithPregnantPerson]: livingWithPregnantPerson,
            [airtableFieldIDs.gestation]: gestation,
            [airtableFieldIDs.preferredContactMethods]: preferredContactMethods,
            [airtableFieldIDs.otherContactMethod]: otherContactMethod || null,
            [airtableFieldIDs.consent]: consent ? true : false,
            [airtableFieldIDs.confirmEligibility]: eligibility, // Use the persisted state
          },
        },
      ],
    };

    // Submit to Airtable
  try {
    const response = await fetch(airtableURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer patSU10Pp0hh1NOgo.7554e4280a027e73e31574edeff1ad25a40803a6aabe8f111f34aa0721c48d80`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(airtableData),
    });

    const responseData = await response.json();
    console.log("Airtable API Response:", responseData);

    if (!response.ok) {
      console.error("Error from Airtable API:", responseData);
      setErrorMessage("Failed to submit the form. Please try again.");
      return;
    }

    // Set success state to true
    setSuccess(true);
  } catch (error) {
    console.error("Error submitting to Airtable:", error);
    setErrorMessage("An error occurred while submitting the form. Please try again.");
  }
};

  // Function to render success message
  const renderSuccessMessage = () => (
    <div className={styles.successMessage}>
      <h1>Thank You!</h1>
      <p>Your form has been submitted successfully.</p>
      <p>
        If you provided an email address, you will receive a confirmation email
        shortly. Otherwise, our Fathers & Partners Wellbeing coordinator will
        contact you within 7 days via your selected preferred method of contact (if possible).
      </p>
      <button
        onClick={() => (window.top.location.href = "https://parents1st.org.uk/the-other-half-hub")}
        style={{
          backgroundColor: "#D78223",
          color: "white",
          padding: "10px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        Return to The Other Half-Hub
      </button>
    </div>
  );


  return (
    <div className={styles.wellbeingFormContainer}>
      {success ? (
        renderSuccessMessage() // Show success message if form submission was successful
      ) : !showForm ? (
        <div className={styles.prescreening}>
          <h2>Eligibility Confirmation</h2>
          <p>
            Please confirm that your partner is currently under the care
            of EPUT (Essex Partnership University Trust).
          </p>
          <label>
            <input type="checkbox" id="eligibility" />
            Confirm Eligibility
          </label>
          <button
            className={styles.fancyButton}
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
            {/* Name and Postcode (Row 1) */}
            <div className={styles.row}>
              <div className={styles.column}>
                <label htmlFor="name">
                  Name: <span className={styles.required}>*</span>
                </label>
                <input className={styles.input} id="name" placeholder="Your Name" required />
              </div>
              <div className={styles.column}>
                <label htmlFor="postcode">
                  Postcode: <span className={styles.required}>*</span>
                </label>
                <input className={styles.input} id="postcode" placeholder="Your Postcode" onChange={handlePostcodeChange} required />
                {/* Local Hub Field (hidden from user) */}
                <input
                  type="hidden"
                  id="localHub"
                  value={localHub} // Store the calculated hub
                />
              </div>
            </div>

            {/* Email Address and Phone Number (Row 2) */}
            <div className={styles.row}>
              <div className={styles.column}>
                <label htmlFor="email">Email Address:</label>
                <input className={styles.input} id="email" placeholder="Your Email Address" />
              </div>
              <div className={styles.column}>
                <label htmlFor="phone">Phone Number:</label>
                <input className={styles.input} id="phone" placeholder="Your Phone Number" />
              </div>
            </div>

            {/* Date of Birth (Row 3 - Centered) */}
            <div className={styles.rowCentered}>
              <div className={styles.singleColumn}>
                <label htmlFor="dob">
                  Date of Birth: <span className={styles.required}>*</span>
                </label>
                <input type="date" className={styles.input} id="dob" required />
              </div>
            </div>

            {/* Gender and Ethnicity (Row 4) */}
            <div className={styles.row}>
              <div className={styles.column}>
                <label htmlFor="gender">
                  Gender: <span className={styles.required}>*</span>
                </label>
                <select className={styles.input} id="gender" required>
                  <option value="" disabled selected>
                    Select an option
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-Binary">Non-Binary</option>
                  <option value="Other">Other</option>
                  <option value="Prefer Not to Say">Prefer Not to Say</option>
                </select>
              </div>

              <div className={styles.column}>
                <label htmlFor="ethnicity">
                  Ethnicity: <span className={styles.required}>*</span>
                </label>
                <select className={styles.input} id="ethnicity" required>
                  <option value="" disabled selected>
                    Select an option
                  </option>
                  <option value="White">White</option>
                  <option value="Black or African">Black or African</option>
                  <option value="Asian">Asian</option>
                  <option value="Mixed">Mixed</option>
                  <option value="Other">Other</option>
                  <option value="Prefer Not to Say">Prefer Not to Say</option>
                </select>
              </div>
            </div>

            {/* Preferred Method of Contact */}
            <div className={styles.row}>
              <div className={styles.columnFull}>
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
              </div>
            </div>

            {/* Gestation Period and How Service Was Accessed */}
            <div className={styles.row}>
              <div className={styles.column}>
                <label htmlFor="gestation">
                  Gestation Period: <span className={styles.required}>*</span>
                </label>
                <select className={styles.input} id="gestation" required>
                  <option value="" disabled selected>
                    Select an option
                  </option>
                  <option value="Prenatal">Prenatal (Before the baby is born)</option>
                  <option value="Postnatal">Postnatal (Up to 6 weeks after birth)</option>
                  <option value="Postpartum">
                    Postpartum (Beyond 6 weeks after birth)
                  </option>
                  <option value="Prefer Not to Say">Prefer Not to Say</option>
                </select>
              </div>

              <div className={styles.column}>
                <label htmlFor="serviceAccessed">
                  How did you find us?{" "}
                  <span className={styles.required}>*</span>
                </label>
                <select className={styles.input} id="serviceAccessed" required>
                  <option value="" disabled selected>
                    Select an option
                  </option>
                  <option value="GP">GP</option>
                  <option value="Midwife">Midwife</option>
                  <option value="QR Code">QR Code</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Living with Pregnant Partner */}
            <div className={styles.row}>
              <div className={styles.columnFull}>
                <label>
                  Are you living with your partner?{" "}
                  <span className={styles.required}>*</span>
                </label>
                <div className={styles.radioGroup}>
                  <label>
                    <input
                      type="radio"
                      name="livingWithPregnantPerson"
                      value="Yes"
                      required
                    />{" "}
                    <strong>Yes</strong>
                  </label>
                  <label>
                    <input type="radio" name="livingWithPregnantPerson" value="No" /> <strong>No</strong>
                  </label>
                </div>
              </div>
            </div>
            <strong>Consent Statement:</strong>
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
              <button className={styles.fancyButton} type="submit">
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
    "North East": ["CO1", "CO2", "CO3", "CO4", "CO5", "CO6", "CO7", "CO8", "CO9", "CO10", "CO11"], // Colchester & Tendring
    "North West": ["CM16", "CM17", "CM19", "CM20", "CM22", "CM23", "CM24", "CB10", "CB11", "EN9", "IG10"], // Harlow, Epping Forest, Uttlesford
  },
  "Mid Essex": [
    "CM0", "CM1", "CM2", "CM3", "CM4", "CM5", "CM6", "CM7", "CM8", "CM9" // Chelmsford, Maldon, Braintree
  ],
  "South Essex": {
    "South West": ["CM11", "CM12", "CM13", "CM14", "CM15", "RM14"], // Basildon, Brentwood, Thurrock
    "South East": ["SS0", "SS1", "SS2", "SS3", "SS4", "SS5", "SS6", "SS7", "SS8", "SS9", "SS11"] // Southend, Rochford, Castle Point
  }
};


// Function to determine the hub based on postcode
const determineHub = (postcode) => {
  const outwardCode = postcode.trim().split(" ")[0].toUpperCase();
  console.log("Outward Code:", outwardCode); // Debugging

  // Check each main region and its sub-regions
  for (const [region, hubs] of Object.entries(postcodeToHubMap)) {
    if (Array.isArray(hubs)) {
      // Handle regions without sub-regions (like Mid Essex)
      if (hubs.includes(outwardCode)) {
        console.log(`Mapped Hub: ${region}`);
        return region;
      }
    } else {
      // Handle regions with sub-regions (like North Essex, South Essex)
      for (const [subRegion, postcodes] of Object.entries(hubs)) {
        if (postcodes.includes(outwardCode)) {
          console.log(`Mapped Hub: ${subRegion} (${region})`);
          return `${subRegion} (${region})`;
        }
      }
    }
  }

  // Fallback for unmapped postcodes
  console.log("Unknown Hub for:", outwardCode);
  return "Not Recognised"; // Default for Airtable's "Not Recognised" option
};




export default WellbeingForm;