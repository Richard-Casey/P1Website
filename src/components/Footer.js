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
                    <a href="https://parents1st.org.uk/privacy-policy" className="footer-link" target="_blank" rel="noopener noreferrer">Privacy policy</a>
                </p>

                {/* Social Links */}
                <p className="footer-follow">Follow Parents 1st</p>
                <div className="footer-social">

                    {/* Twitter Icon with Separate Elements for Animation*/}
                    <a href="https://x.com/Parents1st" aria-label="Twitter" className="animated-icon twitter-icon" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 448 512">
                            {/* Background Square */}
                            <path class="twitter-bg" fill="black" d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64z" />
                            {/* X Logo */}
                            <path class="twitter-x" fill="white" d="M297.1 116L257.3 234.6L379.4 396h-95.6L209 298.1L123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5l78.2-89.5z" />
                        </svg>
                    </a>

                    {/* Facebook Icon with Separate Elements for Animation*/}
                    <a href="https://www.facebook.com/parents1st" aria-label="Facebook" className="animated-icon facebook-icon" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
                            {/* Blue Circle */}
                            <circle class="facebook-bg" cx="128" cy="128" r="120" fill="#1877f2" />
                            {/* white f in logo */}
                            <path class="facebook-f" fill="#fff" d="M174.4 127.8h-23.2v-17.5c0-5.2 3.4-6.5 5.8-6.5h15.6v-28h-21.6c-24.2 0-29.8 18-29.8 29.4v23h-18.6v28h18.6v67h28v-67h23.2" />
                        </svg>
                    </a>


                    {/* LinkedIn Icon */}
                    <a href="https://www.linkedin.com/company/parents1st" aria-label="LinkedIn" className="animated-icon linkedin-icon" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
                            <g fill="none">
                                <rect width="256" height="256" fill="#0a66c2" rx="60" />
                                <path fill="#fff" d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4" />
                            </g>
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;