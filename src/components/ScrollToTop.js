// src/components/ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(`Navigated to ${pathname}, scrolling to top`); // Debugging
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [pathname]);

  return null;
};

export default ScrollToTop;
