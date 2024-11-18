// src/components/Footer.js
import React from 'react';
import '../styles/footerstyle.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Logo */}
                <img src={`${process.env.PUBLIC_URL}/images/p1stlogofull.png`} alt="Parents 1st UK Logo" className="footer-logo" />

                {/* Footer Text */}
                <p className="footer-title">Parents 1st UK - Registered Charity Number: 1186445</p>
                <p className="footer-address">
                    Construction House, Runwell Road, Wickford, Essex, SS11 7HQ
                </p>

                {/* Privacy Policy */}
                <p>
                    <a href="https://parents1st.org.uk/privacy-policy" className="footer-link" target="_blank" rel="noopener noreferrer">
                        Privacy policy
                    </a>
                </p>

                {/* Social Links */}
                <p className="footer-follow">Follow Parents 1st</p>
                <div className="footer-social">

                    {/* X/Twitter Icon */}
                    <a href="https://x.com/Parents1st" aria-label="Twitter" className="animated-icon twitter-icon" target="_blank" rel="noopener noreferrer">
                        <img src={`${process.env.PUBLIC_URL}/icons/xicon.svg`} alt="Twitter Icon" />
                    </a>

                    {/* Facebook Icon */}
                    <a href="https://www.facebook.com/parents1st" aria-label="Facebook" className="animated-icon facebook-icon" target="_blank" rel="noopener noreferrer">
                        <img src={`${process.env.PUBLIC_URL}/icons/fbicon.svg`} alt="Facebook Icon" />
                    </a>

                    {/* LinkedIn Icon */}
                    <a href="https://www.linkedin.com/company/parents1st" aria-label="LinkedIn" className="animated-icon linkedin-icon" target="_blank" rel="noopener noreferrer">
                        <img src={`${process.env.PUBLIC_URL}/icons/linkedinicon.svg`} alt="LinkedIn Icon" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
