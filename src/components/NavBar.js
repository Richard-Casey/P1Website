// src/components/NavBar.js
import React, { useState } from "react";
import "../styles/navtoolbarstyle.css";

const NavBar = ({ onNavigate }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navigation-toolbar">
      {/* Hamburger menu icon for mobile view */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Navigation links */}
      <ul className={`nav-list ${menuOpen ? "open" : ""}`}>
        <li
          className="nav-item"
          onMouseEnter={() => handleDropdown(0)}
          onMouseLeave={() => handleDropdown(null)}
        >
          <div className="nav-item-wrapper">
            <button className="nav-link" onClick={() => onNavigate("aboutUs")}>
              About Us
            </button>
            {activeDropdown === 0 && (
              <ul className="dropdown-content">
                <li>
                  <button onClick={() => onNavigate("whatWeDo")}>
                    <span>What We Do</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("staff")}><span>Staff</span></button>
                </li>
                <li>
                  <button onClick={() => onNavigate("peerSupport")}>
                  <span>What is Peer Support?</span>
                  </button>
                </li>
              </ul>
            )}
          </div>
        </li>
        <li className="nav-item">
          <div className="nav-item-wrapper">
            <button
              className="nav-link"
              onClick={() => onNavigate("dadsPartnersGuide")}
            >
              Dads & Partners Guide
            </button>
          </div>
        </li>
        <li className="nav-item">
          <div className="nav-item-wrapper">
            <button className="nav-link" onClick={() => onNavigate("lgbtqia")}>
              LGBTQIA+
            </button>
          </div>
        </li>
        <li className="nav-item">
          <div className="nav-item-wrapper">
            <button className="nav-link" onClick={() => onNavigate("podcasts")}>
              Podcasts
            </button>
          </div>
        </li>
        <li className="nav-item">
          <div className="nav-item-wrapper">
            <button
              className="nav-link"
              onClick={() => onNavigate("youtubeChannels")}
            >
              Youtube Channels
            </button>
          </div>
        </li>
        <li className="nav-item">
          <div className="nav-item-wrapper">
            <button className="nav-link" onClick={() => onNavigate("groups")}>
              Groups
            </button>
          </div>
        </li>
        <li className="nav-item">
          <div className="nav-item-wrapper">
            <button
              className="nav-link"
              onClick={() => onNavigate("wellbeingForm")}
            >
              Wellbeing Review Form
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
