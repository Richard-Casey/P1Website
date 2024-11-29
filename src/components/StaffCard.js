// src/components/StaffCard.js
import React from "react";
import styles from "../styles/staffcardstyle.module.css";

const StaffCard = () => {
  return (
    <div className={styles.staffCard}>
      <img
        src={`${process.env.PUBLIC_URL}/images/Staff/StaffRCPic.png`}
        alt="Richard Casey"
        className={styles.staffImage}
      />
      <div className={styles.staffDetails}>
        <h3>Richard Casey</h3>
        <p>Father and Partner Wellbeing Coordinator</p>
        <p>
          <a
            href="https://parents1st.org.uk/profile/Richard"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.profileLink}
          >
            View Profile
          </a>
        </p>
      </div>
    </div>
  );
};

export default StaffCard;
