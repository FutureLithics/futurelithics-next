import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import type { ServiceEvidence } from "@/app/content/services/types";

const isExternalHref = (href: string) =>
  href.startsWith("http://") || href.startsWith("https://");

const EvidenceCard = ({ item }: { item: ServiceEvidence }) => (
  <article className="col-md-6">
    <div className="landing-item p-4">
      <h3>{item.title}</h3>
      <p className={item.links?.length ? "mb-3" : "mb-0"}>{item.body}</p>
      {item.links?.length ? (
        <ul className="evidence-links mb-0">
          {item.links.map((link) => {
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
                    className="evidence-link-icon"
                    aria-hidden="true"
                  />
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  </article>
);

export default EvidenceCard;
