import React from "react";

type LandingSectionProps = {
  id: string;
  heading: string;
  className?: string;
  children: React.ReactNode;
};

const LandingSection = ({ id, heading, className = "", children }: LandingSectionProps) => (
  <section id={id} aria-labelledby={`${id}-heading`} className="container landing-section">
    <div className={`landing-panel p-4 p-md-5 ${className}`.trim()}>
      <h2 id={`${id}-heading`} className="text-primary-data mb-3">
        {heading}
      </h2>
      {children}
    </div>
  </section>
);

export default LandingSection;
