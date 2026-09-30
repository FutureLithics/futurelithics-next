import React from "react";
import Link from "next/link";
import type { HomePillar } from "@/app/content/home-pillars";
import HomePillarIcon from "./HomePillarIcon";

const HomePillarCard = ({ pillar }: { pillar: HomePillar }) => (
  <article className="home-pillar-card h-100 p-4">
    <HomePillarIcon icon={pillar.icon} />
    <h3 className="home-pillar-title">
      <Link href={pillar.href}>{pillar.title}</Link>
    </h3>
    <p className="home-pillar-body mb-0">{pillar.body}</p>
    <Link href={pillar.href} className="home-pillar-link">
      {pillar.linkLabel}
    </Link>
  </article>
);

export default HomePillarCard;
