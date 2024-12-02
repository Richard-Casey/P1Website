// src/components/NavBar.js
import React, { useState } from "react";
import styles from "../../styles/navtoolbarstyle.module.css";

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
    <nav className={styles.navigationToolbar}>
      {/* Hamburger menu icon for mobile view */}
      <div className={styles.hamburgerMenu} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Navigation links */}
      <ul className={`${styles.navList} ${menuOpen ? styles.open : ""}`}>
        {/* Home Button */}
        <li className={styles.navItem}>
          <div className={styles.navItemWrapper}>
            <button
              className={styles.navLink}
              onClick={() => (window.location.href = "/Website/")}
            >
              Home
            </button>
          </div>
        </li>


        {/* About Us Section */}
        <li
          className={styles.navItem}
          onMouseEnter={() => handleDropdown(0)}
          onMouseLeave={() => handleDropdown(null)}
        >
          <div className={styles.navItemWrapper}>
            <button
              className={styles.navLink}
              onClick={() => onNavigate("aboutUs")}
            >
              About Us
            </button>
            {activeDropdown === 0 && (
              <ul className={styles.dropdownContent}>
                <li className={styles.navItem}>
                  <div className={styles.navItemWrapper}>
                    <button
                      className={styles.navLink}
                      onClick={() => (window.location.href = "/Website/#/what-we-do")}
                    >
                      What We Do
                    </button>
                  </div>
                </li>

                <li className={styles.navItem}>
                  <div className={styles.navItemWrapper}>
                    <button
                      className={styles.navLink}
                      onClick={() => (window.location.href = "/Website/#/staff")}
                    >
                      Staff
                    </button>
                  </div>
                </li>
                <li className={styles.navItem}>
                  <div className={styles.navItemWrapper}>
                    <button
                      className={styles.navLink}
                      onClick={() => (window.location.href = "/Website/#/what-is-peer-support")}
                    >
                      What is Peer Support?
                    </button>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </li>
        <li className={styles.navItem}>
          <div className={styles.navItemWrapper}>
            <button
              className={styles.navLink}
              onClick={() => onNavigate("dadsPartnersGuide")}
            >
              Dads & Partners Guide
            </button>
          </div>
        </li>
        <li className={styles.navItem}>
          <div className={styles.navItemWrapper}>
            <button
              className={styles.navLink}
              onClick={() => (window.location.href = "/Website/#/lgbtqia")}
            >
              LGBTQIA+
            </button>
          </div>
        </li>
        <li className={styles.navItem}>
          <div className={styles.navItemWrapper}>
            <button
              className={styles.navLink}
              onClick={() => onNavigate("podcasts")}
            >
              Podcasts
            </button>
          </div>
        </li>
        <li className={styles.navItem}>
          <div className={styles.navItemWrapper}>
            <button
              className={styles.navLink}
              onClick={() => onNavigate("youtubeChannels")}
            >
              YouTube Channels
            </button>
          </div>
        </li>
        <li className={styles.navItem}>
          <div className={styles.navItemWrapper}>
            <button
              className={styles.navLink}
              onClick={() => onNavigate("groups")}
            >
              Groups
            </button>
          </div>
        </li>
        <li className={styles.navItem}>
          <div className={styles.navItemWrapper}>
            <button
              className={styles.navLink}
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
