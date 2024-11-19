// src/components/Footer.js
import React from 'react';
import styles from '../styles/footerstyle.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                {/* Logo */}
                <img
                    src={`${process.env.PUBLIC_URL}/images/p1stlogofull.png`}
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
                    {/* X/Twitter Icon */}
                    <a
                        href="https://x.com/Parents1st"
                        aria-label="Twitter"
                        className={`${styles.animatedIcon} ${styles.twitterIcon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/icons/xicon.svg`}
                            alt="Twitter Icon"
                            className={styles.twitterX}
                        />
                    </a>

                    {/* Facebook Icon */}
                    <a
                        href="https://www.facebook.com/parents1st"
                        aria-label="Facebook"
                        className={`${styles.animatedIcon} ${styles.facebookIcon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/icons/fbicon.svg`}
                            alt="Facebook Icon"
                            className={styles.facebookF}
                        />
                    </a>

                    {/* LinkedIn Icon */}
                    <a
                        href="https://www.linkedin.com/company/parents1st"
                        aria-label="LinkedIn"
                        className={`${styles.animatedIcon} ${styles.linkedinIcon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/icons/linkedinicon.svg`}
                            alt="LinkedIn Icon"
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
