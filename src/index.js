import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // Import HashRouter
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Function to load Google Analytics script
const loadAnalytics = () => {
  const script = document.createElement('script');
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-0K5HQ646TK"; // Replace with your GA4 ID
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-0K5HQ646TK'); // Replace with your GA4 ID
  };
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter basename=""> {/* Add basename for React Router */}
      <App />
    </HashRouter>
  </React.StrictMode>
);

// Check for cookie consent
document.addEventListener('DOMContentLoaded', () => {
  const cookieConsent = window.cookieconsent;

  if (cookieConsent && typeof cookieConsent.getUserPreferences === 'function') {
    // Safely get user preferences
    const consent = cookieConsent.getUserPreferences();

    if (consent && consent.includes('tracking-and-performance')) {
      loadAnalytics(); // Load Google Analytics if user consents to tracking
    }
  } else {
    console.error("Cookie Consent API not available or 'getUserPreferences' not defined.");
  }
});

// Detect cookie consent from URL
const urlParams = new URLSearchParams(window.location.search);
const consentStatus = urlParams.get('cookieConsent');

if (consentStatus) {
  document.cookie = `cookie_choices=${consentStatus}; SameSite=None; Secure; path=/;`;

  if (consentStatus === 'accepted') {
    console.log('Cookies accepted and stored.');
  } else {
    console.log('Cookies declined.');
  }
}

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const storedConsent = getCookie('cookie_choices');

const currentParams = new URLSearchParams(window.location.search);
if (!currentParams.has('cookieConsent') && storedConsent) {
  // Redirect to the correct URL with consent
  window.location.href = `${window.location.pathname}?cookieConsent=${storedConsent}`;
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
