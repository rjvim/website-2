"use client";

import React, { useEffect, useRef } from "react";
import { animate, createTimeline, stagger, utils, svg } from "animejs";

const AdvancedLogoAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(".logo-line");
    const logoText = containerRef.current.querySelectorAll(".logo-text");
    const logoDot = containerRef.current.querySelector(".logo-dot");

    utils.set(elements, { opacity: 0 });
    utils.set(logoText, { opacity: 0 });
    utils.set(logoDot, { scale: 0 });

    const timeline = createTimeline({
      defaults: {
        duration: 800,
        ease: "outExpo",
      },
    })
      .add(elements, {
        opacity: 1,
        duration: 100,
        delay: stagger(100),
      })
      .add(
        elements,
        {
          translateX: (el, i) => [i % 2 === 0 ? -100 : 100, 0],
          delay: stagger(100),
          duration: 800,
          ease: "outElastic(1, 0.5)",
        },
        "-=400"
      )
      .add(logoDot, {
        scale: [0, 1],
        opacity: [0, 1],
        duration: 600,
        ease: "outBack(1.7)",
      })
      .add(
        logoText,
        {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: stagger(50),
          duration: 600,
        },
        "-=400"
      )
      .add(
        svg.createDrawable(".logo-path"),
        {
          draw: "0 1",
          duration: 1200,
          ease: "inOutSine",
        },
        "-=800"
      );

    return () => timeline.pause();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-96 bg-slate-900 p-4">
      <div ref={containerRef} className="relative">
        {/* Logo elements */}
        <div className="w-48 h-48 relative mb-6">
          <div className="logo-line absolute top-1/4 left-0 w-full h-2 bg-blue-500"></div>
          <div className="logo-line absolute top-3/4 left-0 w-full h-2 bg-blue-500"></div>
          <div className="logo-line absolute top-0 left-1/4 w-2 h-full bg-blue-500"></div>
          <div className="logo-line absolute top-0 left-3/4 w-2 h-full bg-blue-500"></div>

          <div className="logo-dot absolute top-1/2 left-1/2 w-16 h-16 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <path
              className="logo-path"
              d="M20,20 C40,10 60,10 80,20 S90,50 80,80 S40,90 20,80 S10,50 20,20"
              fill="none"
              stroke="#FF4B4B"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Text */}
        <div className="flex justify-center">
          {"NEXUS".split("").map((letter, index) => (
            <span
              key={index}
              className="logo-text text-3xl font-bold text-white mx-1"
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedLogoAnimation;
