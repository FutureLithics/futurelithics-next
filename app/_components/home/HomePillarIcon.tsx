import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getHomePillarIcon,
  type HomePillarIconName,
} from "@/app/content/home-pillar-icons";

const HomePillarIcon = ({ icon }: { icon: HomePillarIconName }) => (
  <div className="home-pillar-icon" aria-hidden="true">
    <FontAwesomeIcon icon={getHomePillarIcon(icon)} />
  </div>
);

export default HomePillarIcon;
