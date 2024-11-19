// src/App.js
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // Import useLocation for route checking
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Home from "./components/Home";
import WellbeingForm from "./components/WellbeingForm";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import styles from "./styles/formstyle.module.css";
import "./App.css";

const App = () => {
  const location = useLocation(); // Access the current route

  return (
    <div className={styles.App}>

      <ScrollToTop />
      {/* Header */}
      <Header />

      {/* Conditionally Render Hero */}
      {location.pathname === "/" && <Hero />}

      {/* NavBar */}
      <NavBar />

      {/* Routes */}
      <main>
        <Routes>

          {/* Home Route */}
          <Route path="/" element={<Home />} />

          {/* Wellbeing Form Route */}
          <Route path="/wellbeing-review-form" element={<WellbeingForm />} />

          {/* Catch-All Route */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
