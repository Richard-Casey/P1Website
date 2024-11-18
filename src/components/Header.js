// src/components/Header.js 
import React from 'react';
import '../styles/headerstyle.css';
import NumberTicker from './NumberTicker';

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
            {/* Inline SVG for the animated search icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="search-icon-svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                {/* Glass Element with blue color and animation */}
                <path
                  className="glass"
                  fill="#64b5f6"
                  fillOpacity="0.3"
                  strokeDasharray="40"
                  strokeDashoffset="40"
                  d="M10.76 13.24c-2.34 -2.34 -2.34 -6.14 0 -8.49c2.34 -2.34 6.14 -2.34 8.49 0c2.34 2.34 2.34 6.14 0 8.49c-2.34 2.34 -6.14 2.34 -8.49 0Z"
                >
                  <animate fill="freeze" attributeName="fillOpacity" begin="0.7s" dur="0.15s" values="0;0.3" />
                  <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="40;0" />
                </path>
                {/* Handle Element */}
                <path
                  className="handle"
                  strokeDasharray="12"
                  strokeDashoffset="12"
                  d="M10.5 13.5l-7.5 7.5"
                >
                  <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="12;0" />
                </path>
              </g>
            </svg>
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
