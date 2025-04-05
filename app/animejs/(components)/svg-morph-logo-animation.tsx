"use client";

import React, { useEffect, useRef } from "react";
import { animate, createTimeline, svg } from "animejs";

const SVGMorphLogo = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const logo = svgRef.current;
    const square = logo.querySelector("#square");
    const circle = logo.querySelector("#circle");
    const star = logo.querySelector("#star");

    const timeline = createTimeline({
      loop: true,
      defaults: {
        duration: 1000,
        ease: "inOutQuad",
      },
    })
      .add(square, {
        points: svg.morphTo("#circle", 0),
      })
      .add(circle, {
        points: svg.morphTo("#star", 0),
      })
      .add(star, {
        points: svg.morphTo("#square", 0),
      });

    // Initial visibility
    square.setAttribute("opacity", "1");
    circle.setAttribute("opacity", "0");
    star.setAttribute("opacity", "0");

    // Show/hide elements at appropriate times
    timeline.add(square, { opacity: 0 }, 900);
    timeline.add(circle, { opacity: 1 }, 900);
    timeline.add(circle, { opacity: 0 }, 1900);
    timeline.add(star, { opacity: 1 }, 1900);
    timeline.add(star, { opacity: 0 }, 2900);
    timeline.add(square, { opacity: 1 }, 2900);

    return () => timeline.pause();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-64 bg-slate-900 p-4">
      <svg ref={svgRef} width="200" height="200" viewBox="0 0 100 100">
        <polygon
          id="square"
          points="20,20 80,20 80,80 20,80"
          fill="#FF4B4B"
          opacity="0"
        />
        <polygon
          id="circle"
          points="50,20 53.9,32.2 66.9,32.2 56.5,39.8 60.4,52.1 50,44.5 39.6,52.1 43.5,39.8 33.1,32.2 46.1,32.2"
          fill="#FF4B4B"
          opacity="0"
        />
        <polygon
          id="star"
          points="50,20 61.8,44.3 88.2,44.3 67.3,59.3 76.5,83.7 50,67.5 23.5,83.7 32.7,59.3 11.8,44.3 38.2,44.3"
          fill="#FF4B4B"
          opacity="0"
        />
      </svg>
    </div>
  );
};

export default SVGMorphLogo;
