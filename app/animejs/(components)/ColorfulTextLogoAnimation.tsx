"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger, createTimeline } from "animejs";

const ColorfulTextLogoAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(".letter");
    const gradientElements =
      containerRef.current.querySelectorAll(".gradient-bg");
    const subtitle = containerRef.current.querySelector(".subtitle");
    const cta = containerRef.current.querySelector(".cta");

    // Vibrant colors inspired by Stripe
    const colors = [
      "#7A73FF", // purple
      "#FF66C4", // pink
      "#00D4FF", // cyan
      "#6157FF", // violet
      "#FF914D", // orange
    ];

    const timeline = createTimeline({
      defaults: {
        duration: 1200,
        ease: "outElastic(1, 0.6)",
      },
    })
      // Initial entrance animation
      .add(elements, {
        translateY: [100, 0],
        opacity: [0, 1],
        delay: stagger(80, { from: "center" }),
      })
      // Animate colors
      .add(
        elements,
        {
          color: (el, i) => colors[i % colors.length],
          scale: [1, 1.2, 1],
          delay: stagger(100, { from: "center" }),
          duration: 800,
        },
        "-=800"
      )
      // Animate the gradient background
      .add(
        gradientElements,
        {
          scale: [0, 1],
          opacity: [0, 0.95],
          rotate: { from: 135, to: 0 },
          duration: 1000,
          ease: "outQuint",
        },
        "-=1000"
      )
      // Subtle breathing effect after main animation
      .add(elements, {
        translateY: [0, -5, 0],
        scale: [1, 1.02, 1],
        duration: 3000,
        delay: stagger(200),
        loop: true,
        ease: "inOutSine",
      })
      // Animate subtitle text
      .add(
        subtitle,
        {
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 800,
          ease: "outQuint",
        },
        "-=2000"
      )
      // Animate CTA button
      .add(
        cta,
        {
          translateY: [20, 0],
          opacity: [0, 1],
          scale: [0.9, 1],
          duration: 800,
          ease: "outElastic(1, 0.5)",
        },
        "-=600"
      );

    return () => timeline.pause();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-900 p-4 overflow-hidden">
      <div
        ref={containerRef}
        className="relative flex items-center justify-center"
      >
        {/* Gradient backgrounds */}
        <div className="gradient-bg absolute w-[120%] h-48 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 rounded-2xl blur-xl transform -rotate-6"></div>
        <div className="gradient-bg absolute w-[120%] h-48 bg-gradient-to-r from-pink-500 to-yellow-500 opacity-0 rounded-2xl blur-xl transform rotate-3"></div>

        {/* Main Text */}
        <h1 className="relative text-8xl font-extrabold text-white z-10 tracking-tighter mb-8">
          {"rjv_im".split("").map((letter, index) => (
            <span
              key={index}
              className="letter inline-block opacity-0 transition-all duration-700"
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* Subtitle Text */}
        <div className="relative z-10 flex flex-col items-center">
          <p className="subtitle text-2xl font-bold text-white opacity-0 mb-4">
            Built with anime.js!
          </p>
          <p className="cta text-xl font-medium text-white opacity-0 bg-blue-500 px-6 py-2 rounded-full">
            Let's connect
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorfulTextLogoAnimation;
