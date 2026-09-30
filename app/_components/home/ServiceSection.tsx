import React from "react";
import { homepageServices } from "../../service-routes";
import ServiceCard from "../shared/ServiceCard";

const ServiceSection = () => {
  return (
    <section
      id="services-section"
      aria-labelledby="services-heading"
      className="custom-layer-bg"
    >
      <div className="transition-layer-node">
        <img src="images/NodeGraphic2.svg" alt="" />
      </div>
      <h2 id="services-heading" className="py-4 text-center text-primary-data">
        Services
      </h2>
      <div className="container w-100 row justify-content-start mx-auto">
        {homepageServices.map((route) => {
          return <ServiceCard card={route} key={route.name} />;
        })}
      </div>
    </section>
  );
};

export default ServiceSection;