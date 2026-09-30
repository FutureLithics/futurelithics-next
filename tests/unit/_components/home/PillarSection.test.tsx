import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import PillarSection from "@/app/_components/home/PillarSection";
import { homePillars } from "@/app/content/home-pillars";

afterEach(() => {
  cleanup();
});

describe("PillarSection", () => {
  it("renders the section heading and three pillar cards", () => {
    render(<PillarSection />);

    const section = screen.getByRole("region", {
      name: "Core Engineering Pillars",
    });
    expect(section).toBeInTheDocument();
    expect(within(section).getAllByRole("article")).toHaveLength(3);

    for (const pillar of homePillars) {
      const card = screen
        .getByRole("heading", { name: pillar.title })
        .closest("article");
      expect(card).not.toBeNull();

      expect(
        within(card as HTMLElement).getByText(pillar.body),
      ).toBeInTheDocument();
      expect(
        within(card as HTMLElement).getByRole("link", {
          name: pillar.title,
        }),
      ).toHaveAttribute("href", pillar.href);
      expect(
        within(card as HTMLElement).getByRole("link", {
          name: pillar.linkLabel,
        }),
      ).toHaveAttribute("href", pillar.href);
    }
  });

  it("marks icons as decorative", () => {
    const { container } = render(<PillarSection />);

    expect(
      container.querySelectorAll(".home-pillar-icon[aria-hidden='true']"),
    ).toHaveLength(3);
  });
});
