"use client";

import React, { useEffect, useState, useRef } from "react";
import { animate, createTimeline, stagger } from "animejs";

const FinancialServicesAnimation = () => {
  const [step, setStep] = useState(0);
  const timelineRef = useRef(null);

  // Grid layout for placeholder squares
  const grid = {
    cols: 4,
    rows: 4,
    spacing: 100,
    startX: 400,
    startY: 220,
    squareSize: 80,
  };

  // Generate grid placeholders
  const gridSquares = [];
  for (let row = 0; row < grid.rows; row++) {
    for (let col = 0; col < grid.cols; col++) {
      gridSquares.push({
        id: `square-${row}-${col}`,
        x: grid.startX + col * grid.spacing,
        y: grid.startY + row * grid.spacing,
        width: grid.squareSize,
        height: grid.squareSize,
      });
    }
  }

  // Services data - each service maps to a grid position
  const services = [
    {
      id: "tax",
      name: "Tax",
      color: "#9E6CF7",
      gridPos: { row: 0, col: 1 },
      letter: "T",
    },
    {
      id: "capital",
      name: "Capital",
      color: "#6CD3A0",
      gridPos: { row: 0, col: 3 },
      letter: "C",
    },
    {
      id: "billing",
      name: "Billing",
      color: "#EDAD38",
      gridPos: { row: 1, col: 0 },
      letter: "B",
    },
    {
      id: "invoicing",
      name: "Invoicing",
      color: "#5BC89A",
      gridPos: { row: 1, col: 2 },
      letter: "I",
    },
    {
      id: "payments",
      name: "Payments",
      color: "#8A63F8",
      gridPos: { row: 2, col: 1 },
      letter: "P",
    },
    {
      id: "connect",
      name: "Connect",
      color: "#4FD1D9",
      gridPos: { row: 3, col: 0 },
      letter: "C",
    },
    {
      id: "radar",
      name: "Radar",
      color: "#F5598D",
      gridPos: { row: 3, col: 2 },
      letter: "R",
    },
    {
      id: "issuing",
      name: "Issuing",
      color: "#AE7BF7",
      gridPos: { row: 3, col: 3 },
      letter: "I",
    },
    {
      id: "terminal",
      name: "Terminal",
      color: "#7B57F6",
      gridPos: { row: 3, col: 1 },
      letter: "T",
    },
    {
      id: "treasury",
      name: "Treasury",
      color: "#65E3A9",
      gridPos: { row: 2, col: 3 },
      letter: "T",
    },
  ];

  // Calculate actual positions from grid positions
  services.forEach((service) => {
    service.x = grid.startX + service.gridPos.col * grid.spacing;
    service.y = grid.startY + service.gridPos.row * grid.spacing;
    service.width = grid.squareSize;
    service.height = grid.squareSize;
  });

  // Animation sequence of service pairs to activate
  const animationSteps = [
    { pair: ["billing", "invoicing"], connectionColor: "#7FDCAC" },
    { pair: ["tax", "payments"], connectionColor: "#9D6AF7" },
    { pair: ["capital", "treasury"], connectionColor: "#6FE8AE" },
    { pair: ["connect", "payments"], connectionColor: "#9470F5" },
    { pair: ["connect", "terminal"], connectionColor: "#60D4D9" },
    { pair: ["payments", "terminal"], connectionColor: "#7C58F7" },
    { pair: ["payments", "radar"], connectionColor: "#F16E9E" },
    { pair: ["payments", "issuing"], connectionColor: "#B080F7" },
  ];

  // Get the grid square position from service ID
  const getServicePosition = (serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return null;

    return {
      x: service.x,
      y: service.y,
      width: service.width,
      height: service.height,
    };
  };

  // Generate connection path between two services
  const getPath = (from, to) => {
    const fromPos = getServicePosition(from);
    const toPos = getServicePosition(to);

    if (!fromPos || !toPos) return "";

    const fromX = fromPos.x + fromPos.width / 2;
    const fromY = fromPos.y + fromPos.height / 2;
    const toX = toPos.x + toPos.width / 2;
    const toY = toPos.y + toPos.height / 2;

    // Calculate path depending on relative positions
    const dx = toX - fromX;
    const dy = toY - fromY;
    const isHorizontal = Math.abs(dx) > Math.abs(dy);

    if (isHorizontal) {
      return `M${fromX},${fromY} C${fromX + dx * 0.4},${fromY} ${
        toX - dx * 0.4
      },${toY} ${toX},${toY}`;
    } else {
      return `M${fromX},${fromY} C${fromX},${fromY + dy * 0.4} ${toX},${
        toY - dy * 0.4
      } ${toX},${toY}`;
    }
  };

  useEffect(() => {
    // Animation sequence to create the grid
    const setupTimeline = createTimeline({
      defaults: {
        duration: 600,
        ease: "easeOutQuart",
      },
      autoplay: true,
      onComplete: () => {
        // Start the main animation sequence after grid appears
        startAnimationSequence();
      },
    });

    // First, animate in all grid placeholders
    setupTimeline
      .add(
        ".grid-square",
        {
          opacity: [0, 1],
          scale: [0.5, 1],
          duration: 600,
        },
        stagger(40)
      )
      .init();
  }, []);

  const startAnimationSequence = () => {
    if (timelineRef.current) {
      timelineRef.current.restart();
      return;
    }

    // Create the main animation timeline
    const mainTimeline = createTimeline({
      defaults: {
        duration: 600,
        ease: "easeOutQuart",
      },
      autoplay: true,
      loop: true,
    });

    // Add each pair animation as a sequence
    let delay = 0;

    animationSteps.forEach((step, index) => {
      const [service1, service2] = step.pair;
      const connectionId = `connection-${service1}-${service2}`;

      // Show first service
      mainTimeline.add(
        `#${service1}`,
        {
          opacity: [0, 1],
          scale: [0.5, 1],
          duration: 400,
        },
        delay
      );

      // Show second service
      mainTimeline.add(
        `#${service2}`,
        {
          opacity: [0, 1],
          scale: [0.5, 1],
          duration: 400,
        },
        delay + 200
      );

      // Draw connection line
      mainTimeline.add(
        `#${connectionId}`,
        {
          opacity: [0, 1],
          strokeDashoffset: [1000, 0],
          duration: 600,
        },
        delay + 400
      );

      // Hold for a moment
      delay += 1000;

      // Hide all three elements
      mainTimeline.add(
        [`#${service1}`, `#${service2}`, `#${connectionId}`],
        {
          opacity: 0,
          duration: 400,
        },
        delay
      );

      // Delay before next pair
      delay += 600;
    });

    timelineRef.current = mainTimeline;
  };

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      <div className="absolute left-10 top-10 z-10 max-w-md">
        <p className="text-indigo-600 font-medium mb-2">Modular solutions</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          A fully integrated suite of financial and payments products
        </h1>
        <p className="text-lg text-gray-700">
          Reduce costs, grow revenue, and run your business more efficiently on
          a fully integrated platform. Use Stripe to handle all of your
          payments-related needs, manage revenue operations, and launch (or
          invent) new business models.
        </p>
      </div>

      <div className="relative w-full max-w-6xl h-full mx-auto">
        {/* Grid placeholders */}
        {gridSquares.map((square) => (
          <div
            key={square.id}
            className="grid-square absolute border border-gray-200 rounded-lg"
            style={{
              left: square.x,
              top: square.y,
              width: square.width,
              height: square.height,
              opacity: 0,
            }}
          />
        ))}

        {/* SVG for connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {animationSteps.map((step) => {
            const [service1, service2] = step.pair;
            return (
              <path
                key={`connection-${service1}-${service2}`}
                id={`connection-${service1}-${service2}`}
                className="connection-path"
                d={getPath(service1, service2)}
                fill="none"
                stroke={step.connectionColor}
                strokeWidth="2"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                strokeLinecap="round"
                opacity="0"
              />
            );
          })}
        </svg>

        {/* Service cards */}
        {services.map((service) => (
          <div
            key={service.id}
            id={service.id}
            className="service-card absolute shadow-md rounded-lg flex flex-col items-center justify-center opacity-0 bg-white"
            style={{
              left: service.x,
              top: service.y,
              width: service.width,
              height: service.height,
            }}
          >
            <div
              className="w-10 h-10 mb-2 rounded flex items-center justify-center"
              style={{ backgroundColor: service.color }}
            >
              <span className="text-white font-bold text-lg">
                {service.letter}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700">
              {service.name}
            </span>
          </div>
        ))}
      </div>

      {/* Footer elements */}
      <div className="absolute bottom-10 left-10 flex items-center">
        <div className="flex items-center text-indigo-600 font-medium">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" />
            <path d="M2 17L12 22L22 17" />
            <path d="M2 12L12 17L22 12" />
          </svg>
          Payments
        </div>
      </div>
    </div>
  );
};

export default FinancialServicesAnimation;
