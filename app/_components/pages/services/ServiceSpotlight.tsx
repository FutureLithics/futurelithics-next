import React from "react";
import type { ServiceSpotlight as Spotlight } from "@/app/content/services/types";
import LandingSection from "./LandingSection";

const SpotlightSection = (props: {
  id: string;
  heading: string;
  children: React.ReactNode;
}) => <LandingSection {...props} className="landing-spotlight" />;

const ServiceSpotlight = ({ spotlight }: { spotlight: Spotlight }) => {
  switch (spotlight.kind) {
    case "steps":
      return (
        <SpotlightSection id={spotlight.id} heading={spotlight.heading}>
          <p>{spotlight.intro}</p>
          <ol className="row g-4 list-unstyled mb-0">
            {spotlight.steps.map((step, index) => (
              <li className="col-md-6 col-lg-3" key={step.title}>
                <div className="landing-item p-4">
                  <span className="step-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{step.title}</h3>
                  <p className="mb-0">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          {spotlight.deliverables && (
            <>
              <h3 className="mt-4">What you receive</h3>
              <ul className="fit-list mb-0">
                {spotlight.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </SpotlightSection>
      );
    case "comparison":
      return (
        <SpotlightSection id={spotlight.id} heading={spotlight.heading}>
          <p>{spotlight.intro}</p>
          <div className="row g-4">
            {spotlight.columns.map((column) => (
              <div className="col-md-6" key={column.title}>
                <div className="landing-item p-4">
                  <h3>{column.title}</h3>
                  <ul className="fit-list mb-0">
                    {column.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 mb-0">{spotlight.closing}</p>
        </SpotlightSection>
      );
    case "assessment":
      return (
        <SpotlightSection id={spotlight.id} heading={spotlight.heading}>
          {spotlight.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="small-text text-secondary mb-0">{spotlight.note}</p>
        </SpotlightSection>
      );
  }
};

export default ServiceSpotlight;
