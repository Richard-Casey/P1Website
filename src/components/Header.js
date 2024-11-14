// src/components/Header.js
import React from 'react';
import '../styles/headerstyle.css';
import NumberTicker from './NumberTicker';
import { ReactComponent as MagnifyingGlassIcon } from '../assets/icons/magglassp1st.svg';

function Header() {
  return (
    <div className="header">
      {/* Left Toolbar */}
      <div className="left-toolbar">
        <a href="https://parents1st.org.uk/">
          <img src={`${process.env.PUBLIC_URL}/images/p1Logo.png`} alt="Parents 1st Logo" className="header-logo" />
        </a>
        <span className="activities">
          <span className="toolbar-numbers">
            <NumberTicker value={123} /> 
          </span> 
          <a href="https://parents1st.org.uk/activities">Activities</a>
        </span>
        <span className="members">
          <span className="toolbar-numbers">
            <NumberTicker value={843} /> 
          </span> 
          <a href="https://parents1st.org.uk/members">Members</a>
        </span>
        <a href="https://parents1st.org.uk/help" className="help-link">Help</a>
      </div>

      {/* Center Toolbar (Search Bar) */}
      <div className="center-toolbar">
        <form action="" method="get">
          <input type="text" name="query" className="search-input" placeholder="Search this site..." />
          <button type="submit" className="search-button">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg" alt="Search" />
          </button>
        </form>
      </div>

      {/* Right Toolbar with Crisis Button */}
      <div className="right-toolbar">
        <a href="#" className="crisis-button">
          <div className="exclamation-triangle">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 19a1 1 0 0 0 .89 1.5h18.38a1 1 0 0 0 .89-1.5L13.71 3.86a1 1 0 0 0-1.82 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <span>IN CRISIS?</span>
        </a>
      </div>
    </div>
  );
}

export default Header;
