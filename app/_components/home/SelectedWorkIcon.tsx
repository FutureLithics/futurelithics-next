import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getSelectedWorkIcon,
  type SelectedWorkIconName,
} from "@/app/content/selected-work-icons";

type SelectedWorkIconProps = {
  icon: SelectedWorkIconName;
};

const SelectedWorkIcon = ({ icon }: SelectedWorkIconProps) => (
  <div className="selected-work-icon" aria-hidden="true">
    <FontAwesomeIcon icon={getSelectedWorkIcon(icon)} />
  </div>
);

export default SelectedWorkIcon;
