// src/components/Footer.js
import React from 'react';
import globalStyles from "../../styles/globalstyle.module.css";
import styles from '../../styles/footerstyle.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Logo */}
        <img
          src="/Website/images/Logos/p1stlogofull.png"
          alt="Parents 1st UK Logo"
          className={styles.footerLogo}
        />

        {/* Footer Text */}
        <p className={styles.footerTitle}>
          Parents 1st UK - Registered Charity Number: 1186445
        </p>
        <p className={styles.footerAddress}>
          Construction House, Runwell Road, Wickford, Essex, SS11 7HQ
        </p>

        {/* Privacy Policy */}
        <p>
          <a
            href="https://parents1st.org.uk/privacy-policy"
            className={styles.footerLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy policy
          </a>
        </p>

        {/* Social Links */}
        <p className={styles.footerFollow}>Follow Parents 1st</p>
        <div className={styles.footerSocial}>
          {/* X (Twitter) Icon */}
          <a
            href="https://x.com/Parents1st"
            aria-label="X (Twitter)"
            className={styles.twitterIcon}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/Website/images/icons/xfootericon.svg"
              alt="Twitter Icon"
              className={styles.iconSvg}
            />
          </a>

          {/* Facebook Icon */}
          <a
            href="https://www.facebook.com/parents1st"
            aria-label="Facebook"
            className={styles.facebookIcon}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/Website/images/icons/fbfootericon.svg"
              alt="Facebook Icon"
              className={styles.iconSvg}
            />
          </a>

          {/* LinkedIn Icon */}
          <a
            href="https://www.linkedin.com/company/parents1st"
            aria-label="LinkedIn"
            className={styles.linkedinIcon}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/Website/images/icons/linkedinfootericon.svg"
              alt="LinkedIn Icon"
              className={styles.iconSvg}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
