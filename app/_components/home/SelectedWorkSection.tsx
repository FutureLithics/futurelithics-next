import React from "react";
import { selectedWorkItems } from "@/app/content/selected-work";
import SelectedWorkCard from "./SelectedWorkCard";

const SelectedWorkSection = () => (
  <section
    id="selected-work"
    aria-labelledby="selected-work-heading"
    className="selected-work-section"
  >
    <h3
      id="selected-work-heading"
      className="text-center text-primary-data"
    >
      Selected Work
    </h3>
    <div className="container w-100">
      <ul className="row g-4 list-unstyled mb-0 justify-content-center mx-auto">
        {selectedWorkItems.map((item) => (
          <SelectedWorkCard item={item} key={item.id} />
        ))}
      </ul>
    </div>
  </section>
);

export default SelectedWorkSection;
