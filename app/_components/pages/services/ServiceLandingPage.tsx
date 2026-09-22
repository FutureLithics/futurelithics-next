import React from "react";
import type { HomepageService } from "@/app/types/service";

type ServiceLandingPageProps = {
  service: HomepageService;
};

const ServiceLandingPage = ({ service }: ServiceLandingPageProps) => {
  return (
    <div className="custom-layer-bg service-page py-4 w-100">
      <div className="container pt-4">
        <div className="subheader p-4 mb-4 text-center mx-auto w-sm-75 w-xs-100">
          <h2 className="mb-3 text-center text-primary-data">{service.title}</h2>
          <p>
            <strong>{service.description}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceLandingPage;
