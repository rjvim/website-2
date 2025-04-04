import React from "react";
import "../../stripe.css";

const StripePattern = () => {
  return (
    <div className="stripe-set" aria-hidden="true">
      <div className="stripe-background" aria-hidden="true"></div>
      <div className="stripe-foreground" aria-hidden="true"></div>
      <div className="stripe-intersection-container" aria-hidden="true">
        <div className="stripe-intersection"></div>
      </div>
    </div>
  );
};

export default StripePattern;
