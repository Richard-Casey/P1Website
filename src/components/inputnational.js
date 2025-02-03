import React, { useState } from "react";
import emailjs from "emailjs-com";
import styles from "../styles/inputnational.module.css";

const InputNational = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formFields, setFormFields] = useState([
    { name: "Name", value: "", required: true },
    { name: "Website", value: "", required: true },
  ]);
  const [newFieldName, setNewFieldName] = useState("");

  const toggleForm = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChange = (index, newValue) => {
    const updatedFields = [...formFields];
    updatedFields[index].value = newValue;
    setFormFields(updatedFields);
  };

  const addField = () => {
    if (newFieldName.trim() === "") {
      alert("Please enter a field name.");
      return;
    }
    setFormFields([...formFields, { name: newFieldName, value: "", required: false }]);
    setNewFieldName(""); // Clear the input after adding
  };

  const removeField = (index) => {
    setFormFields(formFields.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const missingFields = formFields
      .filter((field) => field.required && !field.value.trim())
      .map((field) => field.name);

    if (missingFields.length > 0) {
      alert(`Please fill out the required fields: ${missingFields.join(", ")}`);
      return;
    }

    const emailContent = formFields
      .filter((field) => field.value.trim())
      .map((field) => `${field.name}: ${field.value}`)
      .join("\n");

    const emailParams = {
      message: emailContent,
      to_email: "Richard@Parents1st.org.uk",
    };

    emailjs
      .send("service_2w9430q", "template_xu5y5s5", emailParams, "LAfohc7pbH72TTtnE")
      .then(() => {
        alert("Submission sent successfully!");
        setFormFields([
          { name: "Name", value: "", required: true },
          { name: "Website", value: "", required: true },
        ]);
        setIsOpen(false);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Failed to send submission. Please try again later.");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.bar} onClick={toggleForm}>
        <p>Click here to submit a new group or service</p>
      </div>

      <form className={`${styles.form} ${isOpen ? styles.show : ""}`} onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <div key={index} className={styles["form-group"]}>
            <label>{field.name}:</label>
            {field.required && <span style={{ color: "red" }}>*</span>}
            <input
              type="text"
              value={field.value}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={field.name}
              required={field.required}
            />
            {!field.required && (
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => removeField(index)}
              >
                ❌
              </button>
            )}
          </div>
        ))}

        <div className={styles["new-field-container"]}>
          <input
            type="text"
            placeholder="Enter field name (e.g. Name, Website, Phone Number, Email Address, Facebook etc.)"
            value={newFieldName}
            onChange={(e) => setNewFieldName(e.target.value)}
            className={styles.newFieldInput}
          />
          <button type="button" className={styles.addFieldButton} onClick={addField}>
            + Add Field
          </button>
        </div>

        <p className={styles.disclaimer}>Submissions will only be displayed after validation.</p>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputNational;
