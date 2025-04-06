"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger, createTimeline } from "animejs";

const MinimalistLogoAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(".letter");
    const subtitle = containerRef.current.querySelector(".subtitle");
    const cta = containerRef.current.querySelector(".cta");
    const background = containerRef.current.querySelector(".background");

    const timeline = createTimeline({
      defaults: {
        duration: 800,
        ease: "outExpo",
      },
    })
      // Initial text animation - white text on black background
      .add(Array.from(elements), {
        translateY: [40, 0],
        opacity: [0, 1],
        delay: stagger(50),
      })
      // Color change transition
      .add(background, {
        backgroundColor: ["#000000", "#ffffff"],
        duration: 800,
        ease: "inOutQuad",
      })
      .add(
        Array.from(elements),
        {
          color: ["#ffffff", "#000000"],
          duration: 800,
          ease: "inOutQuad",
        },
        "-=800"
      )
      // Animate supporting text
      .add(
        subtitle,
        {
          translateY: [30, 0],
          opacity: [0, 1],
          duration: 800,
          ease: "outQuint",
        },
        "-=400"
      )
      .add(
        cta,
        {
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 800,
          ease: "outQuint",
        },
        "-=600"
      );

    return () => {
      timeline.pause();
    };
  }, []);

  return (
    <div
      className="background flex flex-col items-center justify-center w-full h-screen bg-black p-4 overflow-hidden transition-colors duration-700"
      ref={containerRef}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Main Text */}
        <h1 className="relative text-9xl font-bold text-white z-10 tracking-tight mb-16">
          {"rjv_im".split("").map((letter, index) => (
            <span
              key={index}
              className="letter inline-block opacity-0 transform origin-bottom"
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* Subtitle Text */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          <p className="subtitle text-2xl font-medium opacity-0 mb-4">
            Built with anime.js!
          </p>
          <p className="cta text-xl font-medium opacity-0 border border-current px-6 py-2 rounded-full">
            Let's connect on <span className="inline-block ml-1">𝕏</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MinimalistLogoAnimation;
