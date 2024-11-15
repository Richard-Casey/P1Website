// src/components/NavBar.js
import React, { useState } from 'react';
import '../styles/navtoolbarstyle.css';

const NavBar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <nav className="navigation-toolbar">
      <ul className="nav-list">
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
