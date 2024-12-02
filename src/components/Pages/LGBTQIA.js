import React from "react";
import { AnimatedCards } from "../UI/AnimatedCards";
import { ExpandableCards } from "../UI/ExpandableCards";

const LGBTQIA = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">LGBTQIA+ Resources</h1>
        <AnimatedCards />
        <ExpandableCards />
      </div>
    </div>
  );
};

export default LGBTQIA;
