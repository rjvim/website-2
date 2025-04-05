"use client";

import React, { useEffect, useRef } from "react";
import { animate, createTimer, utils } from "animejs";

const LogoLoadingAnimation = () => {
  const containerRef = useRef(null);
  const dotRefs = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const dots = dotRefs.current;

    // Initial state
    utils.set(dots, { scale: 0, opacity: 0 });

    // Create pulse animation
    const pulseDots = () => {
      dots.forEach((dot, i) => {
        animate(dot, {
          scale: [0, 1],
          opacity: [0, 1, 0],
          duration: 1500,
          delay: i * 200,
          ease: "outElastic(1, 0.5)",
          loop: false,
        });
      });
    };

    // Create rotation animation
    animate(containerRef.current, {
      rotate: 360,
      duration: 8000,
      loop: true,
      ease: "linear",
    });

    // Start pulse animation on a timer
    const timer = createTimer({
      duration: 2000,
      onComplete: pulseDots,
    });

    // Initial pulse
    pulseDots();

    return () => {
      timer.pause();
      utils.remove(containerRef.current);
    };
  }, []);

  // Create array of 5 dots for the loading animation
  const renderDots = () => {
    const dots = [];
    const count = 5;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * 50;
      const y = Math.sin(angle) * 50;

      dots.push(
        <div
          key={i}
          ref={(el) => (dotRefs.current[i] = el)}
          className="absolute w-6 h-6 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
            opacity: 0,
          }}
        />
      );
    }

    return dots;
  };

  return (
    <div className="flex items-center justify-center w-full h-64 bg-slate-900 p-4">
      <div ref={containerRef} className="relative w-32 h-32">
        {/* Center logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-16 h-16" viewBox="0 0 50 50">
            <polygon
              points="25,5 35,20 45,35 25,45 5,35 15,20"
              fill="#3B82F6"
            />
            <circle cx="25" cy="25" r="5" fill="#FF4B4B" />
          </svg>
        </div>

        {/* Animated dots */}
        {renderDots()}
      </div>
    </div>
  );
};

export default LogoLoadingAnimation;
