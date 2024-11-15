// src/components/MainContent.js
import React, { useState } from 'react';
import '../styles/maincontentstyle.css';

const MainContent = () => {
  const [showIframe, setShowIframe] = useState(false); // State to control iframe visibility

  const handleButtonClick = () => {
    setShowIframe(true); // Show iframe when button is clicked
  };

  return (
    <main className="main-content">
      <div className="landing-container">
        {/* Image section */}
        <div className="landing-image-container">
          <img src={`${process.env.PUBLIC_URL}/images/landingsplash.png`} alt="The Other-Half Hub" className="landing-image" />
        </div>

        {/* Text content section */}
        <div className="content-text">
          <h2>Welcome to The Other-Half Hub</h2>
          <p>
            At Parents 1st, we understand the necessity of providing help and support to all partners involved
            in a child's life—whether you're a father, a single parent, LGBTQ+, or in any other relationship
            dynamic. The Other-Half Hub is your space, designed to address the unique challenges and emotional
            highs and lows that partners experience during pregnancy and early parenthood.
          </p>
          <p>
            When we refer to "partners" throughout this site, we mean everyone—regardless of gender, relationship
            status, or sexual orientation. If you're involved in a child's life, you're in the right place, and
            there's information here for you.
          </p>
          <p>
            Our mission is to ensure you never feel alone or overwhelmed, offering resources and peer support to
            help you navigate this transformative period. Emotional fluctuations are natural, but you don't have
            to face them alone. The Other-Half Hub is here to support you through the highs and lows, whether
            you're dealing with feelings of isolation, anxiety, or concerns about finances and housing.
          </p>
          <p>
            We believe in the power of peer support, providing a safe and trusting environment that's different
            from traditional family or friend relationships. Our aim is to help you prepare emotionally and
            practically for the transition to parenthood, no matter who you are or where you come from.
          </p>
          <p className="funding-info">
            <em>The Other-Half Hub is funded by the NHS Integrated Care Boards covering Essex, Southend, and Thurrock.</em>
          </p>

          {/* Centered clickable button */}
          <div className="button-container">
            <button onClick={handleButtonClick} className="learn-more">
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">Learn More</span>
            </button>
          </div>
        </div>
      </div>

      {/* Conditionally render the iframe */}
      {showIframe && (
        <div className="iframe-container">
          <iframe
            src="https://rcaseyp1st.github.io/Wellbeing-Review-Form/"
            title="Wellbeing Review Form"
            frameBorder="0"
            width="100%"
            height="600px"
          />
        </div>
      )}
    </main>
  );
};

export default MainContent;
