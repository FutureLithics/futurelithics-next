import React from "react";
import Image from 'next/image';

import CircuitLogo1 from "../../assets/images/CircuitLogo1.svg";
import CTAButton from "../shared/CTAButton";

const HeroSection: React.FC = () => {
  return (
    <div className="custom-radial-bg py-4 home-section">
      <div className="container py-4 my-4">
        <div className="row justify-content-between position-relative">
          <div className="col-md-5 col-sm-12 text-secondary px-3 px-sm-4 m-0 m-md-4 pt-0 pt-sm-4">
            <div className="hero-card my-4 mx-auto mx-md-0 p-4 d-flex flex-column justify-content-between">
              <div className="mb-4">
                <h1 className="hero-heading mb-4">
                  Software Engineering, Application Modernization &amp;
                  Automation
                </h1>
                <p className="mb-3">
                  Future Lithics is a US software engineering consultancy
                  helping businesses modernize legacy applications, build
                  custom software, integrate disconnected systems, and
                  automate operational workflows.
                </p>
              </div>
              <CTAButton
                url="#contact-section"
                innerText="Schedule Consultation"
              />
            </div>
          </div>
          <div className="d-sm-none d-none d-md-flex col-md-6 text-primary-data flex-column justify-content-center">
            <div className="hero-image-container">
              <Image src={CircuitLogo1} className="hero-image" alt="circuit logo" />
            </div>
          </div>
          <div className="d-md-none d-sm-block position-absolute text-primary-data hero-image-absolute">
            <div className="hero-image-container">
              <Image src={CircuitLogo1} className="hero-image" alt="circuit logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;