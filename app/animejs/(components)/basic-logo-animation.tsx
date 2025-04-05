"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

const BasicLogoAnimation = () => {
  const logoRef = useRef(null);

  useEffect(() => {
    const animation = animate(logoRef.current, {
      scale: [0.5, 1],
      opacity: [0, 1],
      rotate: { from: -90, to: 0 },
      duration: 1500,
      ease: "outElastic(1, 0.5)",
    });

    return () => animation.pause();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-64 bg-slate-900 p-4">
      <div
        ref={logoRef}
        className="w-48 h-48 flex items-center justify-center opacity-0"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#FF4B4B"
            strokeWidth="8"
          />
          <path
            d="M30,35 L70,65"
            stroke="#FF4B4B"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M30,65 L70,35"
            stroke="#FF4B4B"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default BasicLogoAnimation;
