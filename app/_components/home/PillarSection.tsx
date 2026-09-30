import React from "react";
import { homePillars } from "@/app/content/home-pillars";
import HomePillarCard from "./HomePillarCard";

const PillarSection = () => (
  <section
    id="primary-pillars"
    aria-labelledby="primary-pillars-heading"
    className="pillar-section py-8"
  >
    <div className="container">
      <div className="pillar-section-intro mx-auto text-center mb-5">
        <h2 id="primary-pillars-heading" className="text-primary-data mb-4">
          Core Engineering Pillars
        </h2>
        <p className="mb-0">
          Future Lithics is organized around three core areas where deep
          implementation experience and long-term advisory work overlap:
          application modernization, business systems and automation, and
          software architecture.
        </p>
      </div>
      <div className="row g-4">
        {homePillars.map((pillar) => (
          <div className="col-lg-4 col-md-6" key={pillar.id}>
            <HomePillarCard pillar={pillar} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PillarSection;
