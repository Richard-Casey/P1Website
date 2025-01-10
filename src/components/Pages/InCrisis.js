import React from "react";
import globalStyles from "../../styles/globalstyle.module.css";
import minimalStyles from "../../styles/minimalstyle.module.css"; // Minimal styles
import normalStyles from "../../styles/incrisisstyle.module.css"; // Normal styles

const InCrisis = ({ isMinimal }) => {
  return (
    <div
      className={
        isMinimal ? globalStyles["container-minimal"] : globalStyles.container
      }
    >
      <div>
      <h1 className={isMinimal ? globalStyles["h1-minimal"] : globalStyles.h1}>
          In Crisis?
        </h1>
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/images/InCrisis/111-mental-health-crisis.png`}
            alt="Mental Health Crisis"
            className={normalStyles.inCrisisImage}
          />
          <p className={globalStyles.p}>
            If you are experiencing a mental health crisis or something that
            makes you feel severely unsafe, distressed, or worried about your
            mental health, you can contact your local crisis service in Essex by
            calling
            <strong> NHS 111</strong> and selecting the mental health option.
          </p>

          <h2 className={globalStyles.h2}>What happens when I call?</h2>
          <p className={globalStyles.p}>
            The call will be answered by an agent who will direct you to a
            trained mental health professional. They will be able to listen to
            your concerns and help you get the support you need.
          </p>
          <p className={globalStyles.p}>
            With your permission, they can also access your electronic patient
            records to better meet your needs and to avoid you repeatedly having
            to tell us your situation.
          </p>
          <p className={globalStyles.p}>
            They can offer advice over the phone, put you in contact with crisis
            services or refer you to local talking therapies.
          </p>

          <h2 className={globalStyles.h2}>Who can call?</h2>
          <p className={globalStyles.p}>
            You can call for yourself, or someone else.
          </p>
          <p className={globalStyles.p}>
            NHS 111 is for all ages, including children and young people and
            those with neurodevelopmental needs.
          </p>
          <p className={globalStyles.p}>
            If you’re deaf or have hearing loss, please use the following link
            to be connected to local crisis service:{" "}
            <a
              href="https://signvideo.co.uk/nhs111/"
              target="_blank"
              rel="noopener noreferrer"
              className={globalStyles.p}
            >
              NHS 111 – SignVideo
            </a>
            .
          </p>
          <p className={globalStyles.p}>
            If you aren't able to make the call yourself, then anyone can call
            on your behalf - for example a friend, carer, loved one or even your
            GP.
          </p>
          <p className={globalStyles.p}>
            You can also access NHS 111 online via{" "}
            <a
              href="https://111.nhs.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className={globalStyles.p}
            >
              111.nhs.uk
            </a>
            .
          </p>

          <h2 className={globalStyles.h2}>
            Signs you may need to call NHS 111:
          </h2>
          <li className={normalStyles.inCrisisListItem}>
            Severe changes to your mood
          </li>
          <li className={normalStyles.inCrisisListItem}>
            Withdrawing from people (close family, friends, or work colleagues)
          </li>
          <li className={normalStyles.inCrisisListItem}>
            Not taking care of yourself like you usually would
          </li>
          <li className={normalStyles.inCrisisListItem}>
            Having increased thoughts about your life not being worth living
          </li>
          <li className={normalStyles.inCrisisListItem}>Excessive worry</li>
          <li className={normalStyles.inCrisisListItem}>
            Feeling out of control or unable to cope
          </li>
          <li className={normalStyles.inCrisisListItem}>
            Feeling anxious about leaving the house
          </li>
          <li className={normalStyles.inCrisisListItem}>
            Hearing voices or seeing things that others can’t
          </li>
          <li className={normalStyles.inCrisisListItem}>
            Thinking about harming yourself
          </li>
          <p></p>

          <p className={globalStyles.p}>
            By calling <strong>NHS 111</strong> and selecting the mental health
            option, we can help to get you the urgent support you need for your
            mental health.
          </p>
          <p className={normalStyles.inCrisisemerg}>
            <strong>
              In emergency situations, where there is an immediate risk to life,
              you should continue to contact 999 or go to A&E.
            </strong>
          </p>

          <h2
            className={`${normalStyles.inCrisisHeader} ${normalStyles.inCrisisHeaderSub}`}
          >
            National survey
          </h2>
          <p className={globalStyles.p}>
            Have you called 111 to access crisis mental health care and could
            you spare a few minutes to help improve the service? If so, please
            scan the QR code below and complete a short survey before 15 July
            2025.
          </p>
          <img
            src={`${process.env.PUBLIC_URL}/images/InCrisis/111-survey-qr-code.png`}
            alt="QR Code for survey"
            className={normalStyles.inCrisisQRCode}
          />
        </div>
      </div>
    </div>
  );
};

export default InCrisis;
