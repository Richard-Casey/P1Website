import React from "react";
import globalStyles from "../../styles/globalstyle.module.css";
import { AnimatedCards } from "../UI/AnimatedCards";
import { ExpandableCards } from "../UI/ExpandableCards";

const LGBTQIA = ({ isMinimal }) => {
  const isMinimalRoute = window.location.pathname.includes("/minimal");

  return (
    <div
      className={
        isMinimal ? globalStyles["container-minimal"] : globalStyles.container
      }
    >
      <h1 className={isMinimal ? globalStyles["h1-minimal"] : globalStyles.h1}>LGBTQIA+
          </h1>
          <AnimatedCards />
          <div className="expandable-cards-section">
            <ExpandableCards />
          </div>
        </div>
  );
};

export default LGBTQIA;
