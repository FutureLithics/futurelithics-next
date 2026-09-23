import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import SelectedWorkSection from "@/app/_components/home/SelectedWorkSection";
import { selectedWorkItems } from "@/app/content/selected-work";

afterEach(() => {
  cleanup();
});

describe("SelectedWorkSection", () => {
  it("renders the section heading and four evidence cards", () => {
    render(<SelectedWorkSection />);

    expect(
      screen.getByRole("region", { name: "Selected Work" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(4);

    for (const item of selectedWorkItems) {
      const card = screen.getByRole("heading", { name: item.title }).closest("article");
      expect(card).not.toBeNull();

      expect(within(card as HTMLElement).getByText(item.body)).toBeInTheDocument();

      for (const stack of item.stacks) {
        expect(within(card as HTMLElement).getByText(stack)).toBeInTheDocument();
      }

      for (const link of item.links) {
        expect(
          within(card as HTMLElement).getByRole("link", { name: link.label }),
        ).toHaveAttribute("href", link.href);
      }
    }
  });

  it("does not render buttons inside the section", () => {
    render(<SelectedWorkSection />);

    const section = screen.getByRole("region", { name: "Selected Work" });
    expect(within(section).queryByRole("button")).not.toBeInTheDocument();
  });

  it("marks icons as decorative", () => {
    const { container } = render(<SelectedWorkSection />);

    expect(container.querySelectorAll(".selected-work-icon[aria-hidden='true']")).toHaveLength(4);
  });
});
