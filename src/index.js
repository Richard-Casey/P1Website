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


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
