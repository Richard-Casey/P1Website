import React from "react";
import styles from "../../styles/headerstyle.module.css";
import NumberTicker from "./NumberTicker";

function Header() {
  return (
    <header className={styles.header}>
      {/* Left Toolbar */}
      <div className={styles.leftToolbar}>
        <a href="https://parents1st.org.uk/">
          <img
            src={`${process.env.PUBLIC_URL}/images/Logos/p1Logo.png`}
            alt="Parents 1st Logo"
            className={styles.headerLogo}
          />
        </a>
        <span className={styles.activities}>
          <span className={styles.toolbarNumbers}>
            <NumberTicker value={123} />
          </span>
          <a href="https://parents1st.org.uk/activities">Activities</a>
        </span>
        <span className={styles.members}>
          <span className={styles.toolbarNumbers}>
            <NumberTicker value={843} />
          </span>
          <a href="https://parents1st.org.uk/members">Members</a>
        </span>
        <a href="https://parents1st.org.uk/help" className={styles.helpLink}>
          Help
        </a>
      </div>

      {/* Center Toolbar */}
      <div className={styles.centerToolbar}>
        <form action="" method="get">
          <input
            type="text"
            name="query"
            className={styles.searchInput}
            placeholder="Search this site..."
          />
          <button type="submit" className={styles.searchButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.searchIconSvg}
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path
                  className={styles.glass}
                  fill="#64b5f6"
                  d="M10.76 13.24c-2.34 -2.34 -2.34 -6.14 0 -8.49c2.34 -2.34 6.14 -2.34 8.49 0c2.34 2.34 2.34 6.14 0 8.49c-2.34 2.34 -6.14 2.34 -8.49 0Z"
                />
                <path className={styles.handle} d="M10.5 13.5l-7.5 7.5" />
              </g>
            </svg>
          </button>
        </form>
      </div>

      {/* Right Toolbar */}
      <div className={styles.rightToolbar}>
      <a href="#/in-crisis" className={styles.crisisButton}>
          <div className={styles.exclamationTriangle}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 19a1 1 0 0 0 .89 1.5h18.38a1 1 0 0 0 .89-1.5L13.71 3.86a1 1 0 0 0-1.82 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <span>IN CRISIS?</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
