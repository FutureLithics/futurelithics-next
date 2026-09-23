import React from "react";
import type { ServiceEvidence } from "@/app/content/services/types";
import WorkLinks from "@/app/_components/shared/WorkLinks";

const EvidenceCard = ({ item }: { item: ServiceEvidence }) => (
  <article className="col-md-6">
    <div className="landing-item p-4">
      <h3>{item.title}</h3>
      <p className={item.links?.length ? "mb-3" : "mb-0"}>{item.body}</p>
      {item.links?.length ? <WorkLinks links={item.links} /> : null}
    </div>
  </article>
);

export default EvidenceCard;
