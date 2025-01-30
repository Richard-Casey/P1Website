import React, { useState, useEffect } from "react";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check for stored cookie consent status
    const consent = localStorage.getItem("cookie_choices");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (status) => {
    // Store the consent and hide the banner
    localStorage.setItem("cookie_choices", status);
    setShowBanner(false);

    // Redirect to propagate the consent across URL
    window.location.href = `${window.location.pathname}?cookieConsent=${status}`;
  };

  if (!showBanner) return null;

  return (
    <div
      className="cookie-banner"
      style={{
        padding: "10px",
        background: "#f4f4f4",
        position: "fixed",
        bottom: "0",
        width: "100%",
        zIndex: 9999,
      }}
    >
      <p>We use cookies to improve your experience. Do you agree to allow tracking and analytics?</p>
      <button onClick={() => handleConsent("accepted")} style={{ marginRight: "10px" }}>
        I Agree
      </button>
      <button onClick={() => handleConsent("declined")}>I Decline</button>
    </div>
  );
};

export default CookieBanner;
