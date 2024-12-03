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
        <div className="max-w-5xl mx-auto p-4">
          <h1 className="text-3xl font-bold text-center mb-8">LGBTQIA+ Resources</h1>
          <AnimatedCards />
          <ExpandableCards />
        </div>
      </div>
    </div>
  );
};

export default LGBTQIA;
