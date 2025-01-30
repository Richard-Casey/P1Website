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
import Youtube from "./components/Pages/Youtube";
import Groups from "./components/Pages/Groups";
import CookieBanner from "./components/CookieBanner";
import globalStyles from "./styles/globalstyle.module.css";

import "./App.css";
import "./index.css";

const App = () => {
  const location = useLocation();
  const isMinimalRoute = location.pathname.startsWith("/minimal-");
  //const isMinimalRoute = location.pathname === "/minimal-form";
  const isHeroVisible = location.pathname === "/";

  return (
    <div className={`${styles.App} ${isMinimalRoute ? "minimal" : ""}`}>
      <ScrollToTop />

 {/* Exclude Cookie Banner for Minimal Routes */}
 {!isMinimalRoute && <CookieBanner />}

      {!isMinimalRoute && <Header />}
      {!isMinimalRoute && isHeroVisible && <Hero />}
      {!isMinimalRoute && <NavBar />}
      <main>
        <Routes>
          <Route path="/" element={<Home isMinimal={false} />} />
          <Route
            path="/wellbeing-review-form"
            element={<WellbeingForm isMinimal={false} />}
          />
          <Route path="/in-crisis" element={<InCrisis isMinimal={false} />} />
          <Route path="/what-we-do" element={<WhatWeDo isMinimal={false} />} />
          <Route path="/staff" element={<StaffPage isMinimal={false} />} />
          <Route
            path="/what-is-peer-support"
            element={<PeerSupport isMinimal={false} />}
          />
          <Route path="/lgbtqia" element={<LGBTQIA isMinimal={false} />} />
          <Route path="/podcasts" element={<Podcasts isMinimal={false} />} />
          <Route path="/youtube" element={<Youtube isMinimal={false} />} />
          <Route path="/groups" element={<Groups isMinimal={false} />} />

          {/* Minimal Routes */}
          <Route
            path="/minimal-form"
            element={<WellbeingForm isMinimal={true} />}
          />
          <Route
            path="/minimal-incrisis"
            element={<InCrisis isMinimal={true} />}
          />
          <Route
            path="/minimal-whatwedo"
            element={<WhatWeDo isMinimal={true} />}
          />
          <Route
            path="/minimal-staff"
            element={<StaffPage isMinimal={true} />}
          />
          <Route
            path="/minimal-whatispeersupport"
            element={<PeerSupport isMinimal={true} />}
          />
          <Route
            path="/minimal-lgbtqia"
            element={<LGBTQIA isMinimal={true} />}
          />
          <Route
            path="/minimal-podcasts"
            element={<Podcasts isMinimal={true} />}
          />
          <Route
            path="/minimal-youtube"
            element={<Youtube isMinimal={true} />}
          />
          <Route path="/minimal-groups" element={<Groups isMinimal={true} />} />

          {/* 404 Fallback */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>

      {/* Centered Update Cookies Preferences Link */}
      <div className={globalStyles.updateCookiesContainer}>
        <a
          href="#"
          id="open_preferences_center"
          className={globalStyles.updateCookiesTag}
          onClick={(e) => {
            e.preventDefault();
            if (window.cookieconsent) {
              window.cookieconsent.openPreferencesCenter();
            } else {
              console.error("Cookie consent script not loaded.");
            }
          }}
        >
          Update cookies preferences
        </a>
      </div>

      {/* Conditionally render Footer */}
      {!isMinimalRoute && <Footer />}
    </div>
  );
};

export default App;
