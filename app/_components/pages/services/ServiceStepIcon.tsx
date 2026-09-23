import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getServiceStepIcon,
  type ServiceStepIconName,
} from "@/app/content/services/step-icons";

type ServiceStepIconProps = {
  icon: ServiceStepIconName;
  title: string;
};

const ServiceStepIcon = ({ icon, title }: ServiceStepIconProps) => (
  <div className="step-icon" role="img" aria-label={`${title} icon`}>
    <FontAwesomeIcon icon={getServiceStepIcon(icon)} />
  </div>
);

export default ServiceStepIcon;
