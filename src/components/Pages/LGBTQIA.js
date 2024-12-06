import React from "react";
import { AnimatedCards } from "../UI/AnimatedCards";
import { ExpandableCards } from "../UI/ExpandableCards";

const LGBTQIA = () => {
  return (
    <div style={{ backgroundColor: "#f4f4f4", minHeight: "100vh", padding: "20px 0" }}>
      <div
        style={{
          backgroundColor: "#ffffff",
          margin: "0 auto",
          width: "80%",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        <div className="LGBTQIA-page">
      {/* Title for the Podcasts Page */}
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
