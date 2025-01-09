import React from "react";
import { AnimatedCards } from "../UI/AnimatedCards";
import { ExpandableCards } from "../UI/ExpandableCards";

const LGBTQIA = () => {
  const isMinimalRoute = window.location.pathname.includes("/minimal");

  return (
    <div
      style={{
        backgroundColor: isMinimalRoute ? "transparent" : "#f4f4f4",
        minHeight: "100vh",
        padding: isMinimalRoute ? "0" : "20px 0",
        width: isMinimalRoute ? "100%" : "auto",
      }}
    >
      <div
        style={{
          backgroundColor: isMinimalRoute ? "transparent" : "#ffffff",
          margin: "0 auto",
          width: isMinimalRoute ? "100%" : "80%",
          borderRadius: isMinimalRoute ? "0" : "8px",
          boxShadow: isMinimalRoute ? "none" : "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: isMinimalRoute ? "0" : "20px",
        }}
      >
        <div className="LGBTQIA-page">
          <h1
            className="text-4xl font-bold text-center mb-8"
            style={{
              color: "#03969b",
              textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
            }}
          >
            LGBTQIA+
          </h1>
          <AnimatedCards />
          <div className="expandable-cards-section">
            <ExpandableCards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LGBTQIA;
