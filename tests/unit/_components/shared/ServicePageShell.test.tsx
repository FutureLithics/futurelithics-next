import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import ServicePageShell from "@/app/_components/shared/ServicePageShell";
import type { ServiceRoute } from "@/app/types/service";

afterEach(() => {
  cleanup();
});

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => <img src={src} alt={alt} className={className} />,
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

vi.mock("@/app/_components/home/ContactSection", () => ({
  default: () => <div id="contact-section">Contact form</div>,
}));

const heroImage = {
  src: "/images/analytics-stock.jpg",
  alt: "Analytics and insights",
};

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
  it("renders the service hero and child cards", () => {
    render(
      <ServicePageShell
        title="Data Visualization & Analysis"
        description="Explore data through interactive visuals."
        image={heroImage}
        routes={[childRoute]}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Data Visualization & Analysis",
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Explore data through interactive visuals."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "D3.js Chart Library", level: 5 }),
    ).toBeInTheDocument();
  });

  it("renders the hero image as a decorative background", () => {
    const { container } = render(
      <ServicePageShell
        title="UI/UX & Design"
        description="Design services."
        image={heroImage}
      />,
    );

    const background = container.querySelector(".service-hero-bg");
    expect(background).toHaveAttribute("src", heroImage.src);
    expect(background).toHaveAttribute("alt", "");
  });

  it("links the hero CTA to the contact section rendered below", () => {
    const { container } = render(
      <ServicePageShell
        title="UI/UX & Design"
        description="Design services."
        image={heroImage}
      />,
    );

    expect(
      screen.getByRole("link", { name: "Schedule Consultation" }),
    ).toHaveAttribute("href", "#contact-section");
    expect(container.querySelector("#contact-section")).toBeInTheDocument();
  });

  it("does not render a Go Back button", () => {
    render(
      <ServicePageShell
        title="Full Stack Web Development"
        description="End-to-end application delivery."
        image={heroImage}
      />,
    );

    expect(screen.queryByRole("button", { name: "Go Back" })).not.toBeInTheDocument();
  });
});
