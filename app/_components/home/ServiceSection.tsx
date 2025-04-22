import React from "react";
import cardRoutes from "../../service-routes";
import ServiceCard from "../shared/ServiceCard";

const ServiceSection = () => {
  return (
    <div className="custom-layer-bg">
      <div className="transition-layer-node">
        <img src="images/NodeGraphic2.svg" />
      </div>
      <h3 className="py-4 text-center text-primary-data">Services</h3>
      <div className="container w-100 row justify-content-between mx-auto">
        {cardRoutes.map((route) => {
          return <ServiceCard card={route} key={route.name} />;
        })}
      </div>
    </div>
  );
};

export default ServiceSection;