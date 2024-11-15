// src/components/NavBar.js
import React, { useState } from 'react';
import '../styles/navtoolbarstyle.css';

const NavBar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // State for hamburger menu toggle

  const handleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu visibility
  };

  return (
    <nav className="navigation-toolbar">
      {/* Hamburger menu icon for mobile view */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Navigation links, toggled by menuOpen */}
      <ul className={`nav-list ${menuOpen ? 'open' : ''}`}>
        <li
          className="nav-item"
          onMouseEnter={() => handleDropdown(0)}
          onMouseLeave={() => handleDropdown(null)}
        >
          <div className="nav-item-wrapper">
            <a href="#" className="nav-link">About Us</a>
            {activeDropdown === 0 && (
              <ul className="dropdown-content">
                <li><a href="#">What We Do</a></li>
                <li><a href="#">Staff</a></li>
                <li><a href="#">What is Peer Support?</a></li>
              </ul>
            )}
          </div>
        </li>
        <li className="nav-item"><div className="nav-item-wrapper"><a href="#" className="nav-link">Dads & Partners Guide</a></div></li>
        <li className="nav-item"><div className="nav-item-wrapper"><a href="#" className="nav-link">LGBTQIA+</a></div></li>
        <li className="nav-item"><div className="nav-item-wrapper"><a href="#" className="nav-link">Podcasts</a></div></li>
        <li className="nav-item"><div className="nav-item-wrapper"><a href="#" className="nav-link">Youtube Channels</a></div></li>
        <li className="nav-item"><div className="nav-item-wrapper"><a href="#" className="nav-link">Groups</a></div></li>
        <li className="nav-item"><div className="nav-item-wrapper"><a href="#" className="nav-link">Wellbeing Review Form</a></div></li>
      </ul>
    </nav>
  );
};

export default NavBar;
