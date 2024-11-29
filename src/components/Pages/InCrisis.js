import React from "react";
import styles from "../../styles/incrisisstyle.module.css";

const InCrisis = () => {
  return (
    <div className={styles.inCrisisBackground}>
      <div className={styles.inCrisisContentContainer}>
        <h1 className={`${styles.inCrisisHeader} ${styles.inCrisisHeaderMain}`}>
          In Crisis?
        </h1>
        <div className={styles.inCrisisText}>
          <img
            src={`${process.env.PUBLIC_URL}/images/InCrisis/111-mental-health-crisis.png`}
            alt="Mental Health Crisis"
            className={styles.inCrisisImage}
          />
          <p className={styles.inCrisisParagraph}>
            If you are experiencing a mental health crisis or something that makes
            you feel severely unsafe, distressed, or worried about your mental
            health, you can contact your local crisis service in Essex by calling
            <strong> NHS 111</strong> and selecting the mental health option.
          </p>

          <h2 className={`${styles.inCrisisHeader} ${styles.inCrisisHeaderSub}`}>
            What happens when I call?
          </h2>
          <p className={styles.inCrisisParagraph}>
            The call will be answered by an agent who will direct you to a trained
            mental health professional. They will be able to listen to your concerns
            and help you get the support you need.
          </p>
          <p className={styles.inCrisisParagraph}>
            With your permission, they can also access your electronic patient
            records to better meet your needs and to avoid you repeatedly having to
            tell us your situation.
          </p>
          <p className={styles.inCrisisParagraph}>
            They can offer advice over the phone, put you in contact with crisis
            services or refer you to local talking therapies.
          </p>

          <h2 className={`${styles.inCrisisHeader} ${styles.inCrisisHeaderSub}`}>
            Who can call?
          </h2>
          <ul className={styles.inCrisisList}>
            <li className={styles.inCrisisListItem}>
              You can call for yourself, or someone else.
            </li>
            <li className={styles.inCrisisListItem}>
              NHS 111 is for all ages, including children and young people and those
              with neurodevelopmental needs.
            </li>
            <li className={styles.inCrisisListItem}>
              If you’re deaf or have hearing loss, please use the following link to
              be connected to local crisis service:{" "}
              <a
                href="https://signvideo.co.uk/nhs111/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inCrisisLink}
              >
                NHS 111 – SignVideo
              </a>
              .
            </li>
            <li className={styles.inCrisisListItem}>
              If you aren't able to make the call yourself, then anyone can call on
              your behalf - for example a friend, carer, loved one or even your GP.
            </li>
            <li className={styles.inCrisisListItem}>
              You can also access NHS 111 online via{" "}
              <a
                href="https://111.nhs.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inCrisisLink}
              >
                111.nhs.uk
              </a>
              .
            </li>
          </ul>

          <h2 className={`${styles.inCrisisHeader} ${styles.inCrisisHeaderSub}`}>
            Signs you may need to call NHS 111:
          </h2>
          <ul className={styles.inCrisisList}>
            <li className={styles.inCrisisListItem}>Severe changes to your mood</li>
            <li className={styles.inCrisisListItem}>
              Withdrawing from people (close family, friends, or work colleagues)
            </li>
            <li className={styles.inCrisisListItem}>
              Not taking care of yourself like you usually would
            </li>
            <li className={styles.inCrisisListItem}>
              Having increased thoughts about your life not being worth living
            </li>
            <li className={styles.inCrisisListItem}>Excessive worry</li>
            <li className={styles.inCrisisListItem}>
              Feeling out of control or unable to cope
            </li>
            <li className={styles.inCrisisListItem}>
              Feeling anxious about leaving the house
            </li>
            <li className={styles.inCrisisListItem}>
              Hearing voices or seeing things that others can’t
            </li>
            <li className={styles.inCrisisListItem}>Thinking about harming yourself</li>
          </ul>

          <p className={styles.inCrisisParagraph}>
            By calling <strong>NHS 111</strong> and selecting the mental health
            option, we can help to get you the urgent support you need for your
            mental health.
          </p>
          <p className={styles.inCrisisemerg}>
            <strong>In emergency situations, where there is an immediate risk to life, you
            should continue to contact 999 or go to A&E.</strong>
          </p>

          <h2 className={`${styles.inCrisisHeader} ${styles.inCrisisHeaderSub}`}>
            National survey
          </h2>
          <p className={styles.inCrisisParagraph}>
            Have you called 111 to access crisis mental health care and could you
            spare a few minutes to help improve the service? If so, please scan the
            QR code below and complete a short survey before 15 July 2025.
          </p>
          <img
            src={`${process.env.PUBLIC_URL}/images/InCrisis/111-survey-qr-code.png`}
            alt="QR Code for survey"
            className={styles.inCrisisQRCode}
          />
        </div>
      </div>
    </div>
  );
};

export default InCrisis;
