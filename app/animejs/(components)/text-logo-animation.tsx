"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger, createTimeline } from "animejs";

const TextLogoAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(".letter");

    const timeline = createTimeline({
      defaults: {
        duration: 800,
        ease: "outExpo",
      },
    })
      .add(elements, {
        translateY: [40, 0],
        opacity: [0, 1],
        delay: stagger(50),
      })
      .add(elements, {
        color: "oklch(12.9% 0.042 264.695)",
        delay: stagger(50, { from: "center" }),
      })
      .add(
        ".logo-square",
        {
          scale: [0, 1],
          opacity: [0, 0.8],
          rotate: { from: 45, to: 0 },
          duration: 600,
          ease: "outQuint",
        },
        "-=600"
      );

    return () => timeline.pause();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-64 bg-slate-900 p-4">
      <div
        ref={containerRef}
        className="relative flex items-center justify-center"
      >
        <div className="logo-square absolute w-[240px] h-24 bg-white opacity-0"></div>
        <h1 className="relative text-4xl font-bold text-white z-10">
          {"rjvim".split("").map((letter, index) => (
            <span key={index} className="letter inline-block opacity-0">
              {letter}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default TextLogoAnimation;
