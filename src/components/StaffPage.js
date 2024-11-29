// src/components/StaffPage.js
import React from "react";
import styles from "../styles/staffpagestyle.module.css";
import StaffCard from "./StaffCard";

const StaffPage = () => {
  return (
    <div className={styles.staffContainer}>
      {/* Header Image */}
      <img
        src={`${process.env.PUBLIC_URL}/images/staffRC.png`}
        alt="Richard Casey"
        className={styles.staffHeaderImage}
      />

      {/* Content */}
      <div className={styles.staffContent}>
        <h3>Educational Background:</h3>
        <p>
          I hold a Bachelor of Science with Honours in Games Development (Programming) from the University of Suffolk. I completed my degree earning first-class honours.
        </p>

        <h3>Professional Experience:</h3>
        <p>
          My journey to this role is deeply rooted in my personal experiences. In my early teens, I became a carer for my mother, who suffered from multiple sclerosis, and continued to care for her until her passing when I was 24. During this time, I worked in various retail roles, climbing the ranks over 16 years. In 2019, I met my partner and her two-year-old daughter, which marked a new beginning for me. After managing charity shops and experiencing the joy of fatherhood during the COVID-19 lockdown, I decided to pursue further education to better support my growing family. In 2021, I enrolled at the University of Suffolk, working part-time in a charity shop while completing my degree. I now bring my rich background and personal insights to my role as the Father and Partner Wellbeing Coordinator.
        </p>

        <h3>Skills and Expertise:</h3>
        <p>
          My strengths are in providing empathetic support and understanding, drawing from my experiences as a father and carer. I have always found great satisfaction in working with diverse groups, including volunteers in charity settings. My background in programming and game development also adds a unique perspective to my problem-solving and communication skills.
        </p>

        <h3>Personal Motivation:</h3>
        <p>
          I am driven by a desire to help others and break the stigma surrounding mental health, especially for men. I believe in the importance of open communication and am committed to challenging stereotypes that discourage men from seeking help. For me, the most rewarding part of my job is seeing people grow and strengthen through the support they receive.
        </p>

        <h3>Role Responsibilities:</h3>
        <p>
          In my role, I provide personalised wellbeing support, manage resources, facilitate peer support groups, raise awareness about paternal mental health, and continuously improve the services offered by the Other-Half Hub.
        </p>

        <h3>Personal Interests:</h3>
        <p>
          Outside of work, I enjoy playing and developing video games, programming in C# and C++, and watching football.
        </p>

        <h3>Contact Information:</h3>
        <p>
          You can reach me at{" "}
          <a href="mailto:Richard@Parents1st.org.uk">
            <strong>Richard@Parents1st.org.uk</strong>
          </a>
          .
        </p>
        <StaffCard />
        
      </div>
    </div>
  );
};

export default StaffPage;
