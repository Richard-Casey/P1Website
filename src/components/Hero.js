// src/components/Hero.js
import React, { useEffect } from 'react';
import '../styles/herostyle.css';

function Hero() {
  useEffect(() => {
    const heroText = document.getElementById('hero-text');
    heroText.classList.add('fade-in');
  }, []);

  return (
    <div className="hero-section">
      <img src={`${process.env.PUBLIC_URL}/images/Hero1.png`} alt="Background scene" className="hero-image" />
      <img src={`${process.env.PUBLIC_URL}/images/TOHHLogo.png`} alt="The Other-Half Hub logo" className="hero-logo" />
      <div className="hero-text" id="hero-text">Welcome to <br />The Other-Half Hub</div>
    </div>
  );
}

export default Hero;
