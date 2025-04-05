"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

export default function AnimatedSquares() {
  const squaresRef = useRef([]);

  useEffect(() => {
    const animation = animate(squaresRef.current, {
      x: 320,
      rotate: { from: -180 },
      duration: 1250,
      delay: stagger(65, { from: "center" }),
      ease: "inOutQuint",
      loop: true,
      alternate: true,
    });

    return () => animation.pause();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-10">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (squaresRef.current[i] = el)}
          className="w-16 h-16 bg-red-500 rounded"
        />
      ))}
    </div>
  );
}
