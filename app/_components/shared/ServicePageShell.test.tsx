import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import ServicePageShell from "./ServicePageShell";
import type { ServiceRoute } from "@/app/types/service";

afterEach(() => {
  cleanup();
});

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
  }: {
    src: string;
    alt: string;
  }) => <img src={src} alt={alt} />,
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

const childRoute: ServiceRoute = {
  name: "chart_card",
  title: "D3.js Chart Library",
  description: "Interactive chart examples.",
  path: "/services/data-viz/chart-card",
  type: "active",
  image: {
    src: "/images/barCharts.png",
    alt: "Bar charts",
  },
};

describe("ServicePageShell", () => {
  it("renders the service header and child cards", () => {
    render(
      <ServicePageShell
        title="Data Visualization & Analysis"
        description="Explore data through interactive visuals."
        routes={[childRoute]}
        onGoBack={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Data Visualization & Analysis",
        level: 2,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Explore data through interactive visuals."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "D3.js Chart Library", level: 5 }),
    ).toBeInTheDocument();
  });

  it("calls onGoBack when the button is clicked", async () => {
    const onGoBack = vi.fn();

    render(
      <ServicePageShell
        title="Full Stack Web Development"
        description="End-to-end application delivery."
        onGoBack={onGoBack}
      />,
    );

    await screen.getByRole("button", { name: "Go Back" }).click();
    expect(onGoBack).toHaveBeenCalledOnce();
  });
});
