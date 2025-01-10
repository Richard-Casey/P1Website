// src/components/WhatWeDo.js
import React from "react";
import globalStyles from "../../styles/globalstyle.module.css";
import styles from "../../styles/whatwedostyle.module.css";

const WhatWeDo = ({ isMinimal }) => {
  return (
    <div
      className={
        isMinimal ? globalStyles["container-minimal"] : globalStyles.container
      }
    >
      <h1 className={isMinimal ? globalStyles["h1-minimal"] : globalStyles.h1}>
        What We Do
      </h1>
      <p className={globalStyles.p}>
        At the Other-Half Hub, we are dedicated to supporting fathers and
        partners during the critical perinatal period, from pregnancy to one
        year post-birth. Our goal is to ensure that fathers and partners feel
        empowered, supported, and well-equipped to navigate the challenges and
        joys of parenthood.
      </p>

      <h2 className={globalStyles.h2}>Wellbeing Support:</h2>
      <p className={globalStyles.p}>
        We provide personalised wellbeing support to fathers and partners. This
        includes one-on-one discussions to assess their needs and guide them to
        relevant resources. Our services are tailored to help you manage stress,
        improve mental health, and build resilience during this transformative
        time.
      </p>

      <h2 className={globalStyles.h2}>Resource Management:</h2>
      <p className={globalStyles.p}>
        The Other-Half Hub offers a comprehensive resource guide featuring local
        services. Whether you need support groups, counselling services, or
        practical advice, our guide is designed to help you find the right
        resources easily. We continuously update this guide to ensure you have
        access to the best possible support.
      </p>

      <h2 className={globalStyles.h2}>Peer Support:</h2>
      <p className={globalStyles.p}>
        Building a community is essential for navigating parenthood. We aim to
        facilitate online group sessions where fathers and partners can connect,
        share experiences, and support each other. These sessions will promote
        diversity and inclusion, providing a safe space for everyone to speak
        freely and receive support.
      </p>

      <h2 className={globalStyles.h2}>Awareness and Advocacy:</h2>
      <p className={globalStyles.p}>
        We are committed to raising awareness about the challenges fathers and
        partners face during the perinatal period. Our resources aim to
        normalise common struggles, promote positive coping strategies, and
        highlight the importance of mental health. By advocating for fathers and
        partners, we strive to create a more supportive environment for all
        parents.
      </p>

      <h2 className={globalStyles.h2}>Feedback and Continuous Improvement:</h2>
      <p className={globalStyles.p}>
        Your feedback is vital to us. We continually seek input from those who
        use our services to ensure we are meeting your needs effectively. This
        feedback helps us improve our services and develop new programs that
        better support fathers and partners.
      </p>

      <p className={globalStyles.p}>
        At the Other-Half Hub, we believe that by supporting fathers and
        partners, we can create stronger, healthier families. Join us in this
        journey and discover the resources, support, and community you need to
        thrive.
      </p>
    </div>
  );
};

export default WhatWeDo;
