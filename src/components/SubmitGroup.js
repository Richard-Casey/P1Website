import React, { useState } from "react";
import emailjs from "emailjs-com";
import styles from "../styles/submitgroup.module.css";

const SubmitGroup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    socialMedia: "",
    additionalInfo: "",
  });

  const toggleForm = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.address.trim()) {
      alert("Name and Address are required fields.");
      return;
    }

    if (!formData.phone.trim() && !formData.email.trim() && !formData.website.trim()) {
      alert("At least one of Phone, Email, or Website must be provided.");
      return;
    }

    const emailParams = {
      from_name: formData.name,
      address: formData.address,
      phone: formData.phone || "N/A",
      email: formData.email || "N/A",
      website: formData.website || "N/A",
      socialMedia: formData.socialMedia || "N/A",
      additionalInfo: formData.additionalInfo || "N/A",
      to_email: "Richard@Parents1st.org.uk",
    };

    emailjs
      .send("service_2w9430q", "template_vnx7hwo", emailParams, "LAfohc7pbH72TTtnE")
      .then(() => {
        alert("Group submission sent successfully!");
        setFormData({
          name: "",
          address: "",
          phone: "",
          email: "",
          website: "",
          socialMedia: "",
          additionalInfo: "",
        });
        setIsOpen(false);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Failed to send submission. Try again later.");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.bar} onClick={toggleForm}>
        <p>Submit a group to this map</p>
      </div>

      <form className={`${styles.form} ${isOpen ? styles.show : ""}`} onSubmit={handleSubmit}>

        <div className={styles["form-group"]}>
          <label>Name:</label>
          <input type="text" name="name" placeholder="Group Name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className={styles["form-group"]}>
          <label>Address:</label>
          <input type="text" name="address" placeholder="Address of Group/Meetings" value={formData.address} onChange={handleChange} required />
        </div>

        <div className={styles["form-group"]}>
          <label>Phone Number:</label>
          <input type="tel" name="phone" placeholder="Contact Number" value={formData.phone} onChange={handleChange} />
        </div>

        <div className={styles["form-group"]}>
          <label>Email Address:</label>
          <input type="email" name="email" placeholder="Contact Email" value={formData.email} onChange={handleChange} />
        </div>

        <div className={styles["form-group"]}>
          <label>Website:</label>
          <input type="url" name="website" placeholder="Group Website (if applicable)" value={formData.website} onChange={handleChange} />
        </div>

        <div className={styles["form-group"]}>
          <label>Social Media Link:</label>
          <input type="text" name="socialMedia" placeholder="Facebook, LinkedIn, etc. (if applicable)" value={formData.socialMedia} onChange={handleChange} />
        </div>

        <div className={styles["form-group"]}>
          <label>Additional Info:</label>
          <textarea name="additionalInfo" placeholder="Any additional information" value={formData.additionalInfo} onChange={handleChange} />
        </div>

        <p className={styles.disclaimer}>Group submissions will only appear on the map once validated.</p>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default SubmitGroup;
