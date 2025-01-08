import React from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // Only import necessary hooks
import Header from "./components/Formatting/Header";
import NavBar from "./components/Formatting/NavBar";
import Hero from "./components/Formatting/Hero";
import Home from "./components/Pages/Home";
import WellbeingForm from "./components/Pages/WellbeingForm";
import Footer from "./components/Formatting/Footer";
import ScrollToTop from "./components/ScrollToTop";
import InCrisis from "./components/Pages/InCrisis";
import styles from "./styles/formstyle.module.css";
import WhatWeDo from "./components/Pages/WhatWeDo";
import StaffPage from "./components/Pages/StaffPage";
import PeerSupport from "./components/Pages/PeerSupport";
import LGBTQIA from "./components/Pages/LGBTQIA";
import Podcasts from "./components/Pages/Podcasts";
import "./App.css";

const App = () => {
  const location = useLocation();
  const isMinimalRoute = location.pathname.startsWith("/minimal-");
  //const isMinimalRoute = location.pathname === "/minimal-form";
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
          <Route path="/in-crisis" element={<InCrisis />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/what-is-peer-support" element={<PeerSupport />} />
          <Route path="/lgbtqia" element={<LGBTQIA />} />
          <Route path="/podcasts" element={<Podcasts />} />

          {/* Minimal Routes */}
          <Route path="/minimal-form" element={<WellbeingForm />} />
          <Route path="/minimal-incrisis" element={<InCrisis />} />
          <Route path="/minimal-whatwedo" element={<WhatWeDo />} />
          <Route path="/minimal-staff" element={<StaffPage />} />

          {/* 404 Fallback */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>

      {/* Conditionally render Footer */}
      {!isMinimalRoute && <Footer />}
    </div>
  );
};

export default App;
