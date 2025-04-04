import React from "react";

const ResponsiveStripePattern = () => {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        height: "72px",
        width: "100%",
        transform: "skewY(-6deg)",
        overflow: "hidden",
        top: 0,
        left: 0,
        transformOrigin: "100% 0",
        boxSizing: "border-box",
        zIndex: 1,
      }}
    >
      {/* Light blue stripe (background) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          height: "40px",
          width: "45vw",
          left: "20vw",
          background: "#80e9ff",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      />

      {/* Dark blue intersection */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          height: "40px",
          width: "15vw",
          left: "30vw",
          top: "32px",
          background: "#0048e5",
          overflow: "hidden",
          transform: "translateY(-5.25px)",
          boxSizing: "border-box",
        }}
      />

      {/* Purple stripe (bottom) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          height: "40px",
          width: "20vw",
          left: "25vw",
          top: "32px",
          background: "#7a73ff",
          overflow: "hidden",
          transform: "translateY(-5px)",
          boxSizing: "border-box",
          zIndex: -1,
        }}
      />
    </div>
  );
};

export default ResponsiveStripePattern;
