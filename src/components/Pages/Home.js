// src/components/Home.js
import React from "react";
import globalStyles from "../../styles/globalstyle.module.css";
import styles from "../../styles/homestyle.module.css";
import Button from "../Button"; // Import the Button component

const Home = () => {
  return (
    <main className={styles.mainContent}>
      <div className={styles.landingContainer}>
        {/* Image section */}
        <div className={styles.landingImageContainer}>
          <img
            src={`${process.env.PUBLIC_URL}/images/Home/landingsplash.png`}
            alt="The Other-Half Hub"
            className={styles.landingImage}
          />
        </div>

        {/* Text content section */}
        <div className={styles.contentText}>
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
          <p className={styles.fundingInfo}>
            <em>The Other-Half Hub is funded by the NHS Integrated Care Boards covering Essex, Southend, and Thurrock.</em>
          </p>

          {/* Button to navigate to the Wellbeing Form */}
          <div className={styles.buttonContainer}>
            <Button /> {/* Replacing Link and redundant button styles */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
