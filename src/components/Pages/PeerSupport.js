// src/components/PeerSupport.js
import React from "react";
import globalStyles from "../../styles/globalstyle.module.css";
import styles from "../../styles/whatispeersupportstyle.module.css";

const PeerSupport = ({ isMinimal }) => {
  return (
    <div
      className={
        isMinimal ? globalStyles["container-minimal"] : globalStyles.container
      }
    >
      <h1 className={isMinimal ? globalStyles["h1-minimal"] : globalStyles.h1}>What Is Peer Support?</h1>
           <p className={globalStyles.p}>
            Peer support involves individuals supporting each other based on shared experiences or common challenges.
            It is an effective approach in various contexts, including mental health, substance abuse recovery, parenting, and more.
            The essence of peer support lies in mutual empathy, understanding, and respect, fostering a supportive environment
            where people can share their journeys and learn from each other.
          </p>
          
          <h2 className={globalStyles.h2}>Core Elements of Peer Support:</h2>
          <ul>
            <li>
              <strong>Mutual Understanding:</strong>
               <p className={globalStyles.p}>
                Peer support is grounded in shared experiences. Individuals who have faced similar challenges
                can offer unique insights and understanding that professionals may not provide.
              </p>
            </li>
            <li>
              <strong>Empathy and Respect:</strong>
               <p className={globalStyles.p}>
                Relationships in peer support are built on empathy and respect, creating a safe space for
                individuals to express their feelings and experiences without fear of judgment.
              </p>
            </li>
            <li>
              <strong>Empowerment:</strong>
               <p className={globalStyles.p}>
                Peer support encourages individuals to take control of their own lives and make informed decisions.
                This empowerment is crucial for personal growth and recovery.
              </p>
            </li>
            <li>
              <strong>Non-Hierarchical Relationship:</strong>
               <p className={globalStyles.p}>
                Unlike traditional support systems, peer support operates on a level playing field where all
                participants are equals, fostering a sense of community and mutual respect.
              </p>
            </li>
            <li>
              <strong>Confidentiality:</strong>
               <p className={globalStyles.p}>
                Trust is a cornerstone of effective peer support. Confidentiality ensures that individuals
                feel safe to share their experiences and challenges.
              </p>
            </li>
          </ul>

          <h2 className={globalStyles.h2}>Benefits of Peer Support:</h2>
          <ul>
            <li>
              <strong>Emotional Support:</strong>
               <p className={globalStyles.p}>
                Sharing experiences with peers can provide emotional relief and reduce feelings of isolation.
              </p>
            </li>
            <li>
              <strong>Practical Advice:</strong>
               <p className={globalStyles.p}>
                Peers can offer practical tips and strategies that have worked for them in similar situations.
              </p>
            </li>
            <li>
              <strong>Increased Self-Esteem:</strong>
               <p className={globalStyles.p}>
                Being able to help others and receive support can boost self-esteem and confidence.
              </p>
            </li>
            <li>
              <strong>Sense of Community:</strong>
               <p className={globalStyles.p}>
                Peer support groups create a sense of belonging and community, which is vital for emotional well-being.
              </p>
            </li>
          </ul>

          <h2 className={globalStyles.h2}>Types of Peer Support:</h2>
          <ul>
            <li>
              <strong>One-on-One Support:</strong>
               <p className={globalStyles.p}>
                This involves individual meetings between peers to share experiences and offer support.
              </p>
            </li>
            <li>
              <strong>Group Support:</strong>
               <p className={globalStyles.p}>
                Peer support groups bring together multiple individuals to share and support each other collectively.
              </p>
            </li>
            <li>
              <strong>Online Support:</strong>
               <p className={globalStyles.p}>
                With the advent of technology, many peer support groups operate online, providing accessibility and convenience.
              </p>
            </li>
          </ul>

           <p className={globalStyles.p}>
            Peer support is a powerful tool that leverages shared experiences to foster growth, recovery, and well-being.
            By connecting with others who have walked a similar path, individuals can find the strength and encouragement
            needed to navigate their challenges.
          </p>
        </div>
  );
};

export default PeerSupport;
