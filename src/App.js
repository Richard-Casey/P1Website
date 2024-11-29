// src/App.js
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // Import useLocation for route checking
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Home from "./components/Home";
import WellbeingForm from './components/WellbeingForm';
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import styles from "./styles/formstyle.module.css";
import "./App.css";

const App = () => {
  const location = useLocation(); // Access the current route

  // Check if the current route is "/minimal-form"
  const isMinimalRoute = location.pathname === "/minimal-form";

  return (
    <div className={styles.App}>

      <ScrollToTop />

      {/* Render Header only if NOT on the minimal route */}
      {!isMinimalRoute && <Header />}

      {/* Conditionally Render Hero (only for home route) */}
      {!isMinimalRoute && location.pathname === "/" && <Hero />}

      {/* Render NavBar only if NOT on the minimal route */}
      {!isMinimalRoute && <NavBar />}

      {/* Routes */}
      <main>
        <Routes>

          {/* Home Route */}
          <Route path="/" element={<Home />} />

          {/* Wellbeing Form Route */}
          <Route path="/wellbeing-review-form" element={<WellbeingForm />} />

          {/* Minimal Form Route for iframe */}
          <Route path="/minimal-form" element={<WellbeingForm />} />

          {/* Catch-All Route */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>

      {/* Render Footer only if NOT on the minimal route */}
      {!isMinimalRoute && <Footer />}
    </div>
  );
};

export default App;
