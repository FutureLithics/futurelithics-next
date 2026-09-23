import React from "react";
import type { SelectedWorkItem } from "@/app/content/selected-work";
import WorkLinks from "@/app/_components/shared/WorkLinks";
import SelectedWorkIcon from "./SelectedWorkIcon";

const SelectedWorkCard = ({ item }: { item: SelectedWorkItem }) => (
  <li className="col-lg-6 col-md-12 d-flex justify-content-center">
    <article className="selected-work-card p-4">
      <SelectedWorkIcon icon={item.icon} />
      <h4 className="selected-work-title">{item.title}</h4>
      <div className="selected-work-details">
        <p className="selected-work-body mb-0">{item.body}</p>
        <WorkLinks links={item.links} />
        <ul className="selected-work-stacks list-unstyled mb-0">
          {item.stacks.map((stack) => (
            <li key={stack}>{stack}</li>
          ))}
        </ul>
      </div>
    </article>
  </li>
);

export default SelectedWorkCard;
