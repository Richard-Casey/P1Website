import React from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // Only import necessary hooks
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Home from "./components/Home";
import WellbeingForm from "./components/WellbeingForm";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import InCrisis from "./components/InCrisis";
import styles from "./styles/formstyle.module.css";
import WhatWeDo from "./components/WhatWeDo";
import StaffPage from "./components/StaffPage";
import PeerSupport from "./components/PeerSupport";
import "./App.css";

const App = () => {
  const location = useLocation();

  const isMinimalRoute = location.pathname === "/minimal-form";
  const isHeroVisible = location.pathname === "/";

  return (
    <div className={styles.App}>
      <ScrollToTop />
      {!isMinimalRoute && <Header />}
      {!isMinimalRoute && isHeroVisible && <Hero />}
      {!isMinimalRoute && <NavBar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wellbeing-review-form" element={<WellbeingForm />} />
          <Route path="/minimal-form" element={<WellbeingForm />} />
          <Route path="/in-crisis" element={<InCrisis />} />
          <Route path="*" element={<div>Page Not Found</div>} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/what-is-peer-support" element={<PeerSupport />} />
        </Routes>
      </main>
      {!isMinimalRoute && <Footer />}
    </div>
  );
};

export default App;
