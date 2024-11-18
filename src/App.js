// src/App.js
import React, { useState } from "react";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Home from "./components/Home";
import WellbeingForm from "./components/WellbeingForm";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home"); // Default to "home" page

  // Function to handle navigation
  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  // Centralized function to render the main content dynamically
  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={handleNavigation} />;
      case "wellbeingForm":
        return <WellbeingForm />;
      default:
        return <div>Page Not Found</div>; // Fallback for unknown pages
    }
  };

  return (
    <div className="App">
      {/* Header is always at the top */}
      <Header />
  
      {/* Hero and NavBar rendering based on current page */}
      {currentPage === "home" ? (
        <>
          {/* Render Hero and NavBar together */}
          <Hero />
          <NavBar onNavigate={handleNavigation} />
        </>
      ) : (
        // NavBar is directly under Header for other pages
        <NavBar onNavigate={handleNavigation} />
      )}
  
      {/* Dynamically rendered main content */}
      <main>{renderContent()}</main>
  
      {/* Footer is always at the bottom */}
      <Footer />
    </div>
  );
  
}

export default App;
