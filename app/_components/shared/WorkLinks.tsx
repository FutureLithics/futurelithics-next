import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

export type WorkLink = {
  label: string;
  href: string;
};

const isExternalHref = (href: string) =>
  href.startsWith("http://") || href.startsWith("https://");

const WorkLinks = ({ links }: { links: WorkLink[] }) => (
  <ul className="work-links">
    {links.map((link) => {
      const external = isExternalHref(link.href);

      return (
        <li key={link.href}>
          <a
            href={link.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            <span>{link.label}</span>
            <FontAwesomeIcon
              icon={external ? faArrowUpRightFromSquare : faArrowRight}
              className="work-link-icon"
              aria-hidden="true"
            />
          </a>
        </li>
      );
    })}
  </ul>
);

export default WorkLinks;
