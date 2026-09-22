import React from "react";
import ServiceCard from "./ServiceCard";
import type { ServiceRoute } from "@/app/types/service";

type ServicePageShellProps = {
  title: string;
  description: string;
  routes?: ServiceRoute[];
  onGoBack: () => void;
};

const ServicePageShell = ({
  title,
  description,
  routes,
  onGoBack,
}: ServicePageShellProps) => {
  return (
    <div className="custom-layer-bg service-page py-4 w-100">
      <div className="container pt-4">
        <div className="subheader p-4 mb-4 text-center mx-auto w-sm-75 w-xs-100">
          <h2 className="mb-3 text-center text-primary-data">{title}</h2>
          <p>
            <strong>{description}</strong>
          </p>
        </div>
      </div>

      <div className="container p-y w-100 row justify-content-start mx-auto">
        {routes?.map((route) => (
          <ServiceCard card={route} key={route.name} />
        ))}
      </div>
      <div className="container text-center pt-4">
        <button className="btn btn-info" onClick={onGoBack}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ServicePageShell;
