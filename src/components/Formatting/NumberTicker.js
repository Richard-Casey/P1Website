// src/components/NumberTicker.js
import React, { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useMotionValue, useSpring } from 'framer-motion';
import globalStyles from "../../styles/globalstyle.module.css";

function NumberTicker({ value, decimalPlaces = 0 }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(decimalPlaces);
      }
    });
  }, [springValue, decimalPlaces]);

  return <span ref={ref} />;
}

export default NumberTicker;
