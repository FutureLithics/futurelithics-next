import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import ServiceCard from "./ServiceCard";

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
    className,
    target,
  }: {
    href: string | { pathname: string };
    children: React.ReactNode;
    className?: string;
    target?: string;
  }) => (
    <a
      href={typeof href === "string" ? href : href.pathname}
      className={className}
      target={target}
    >
      {children}
    </a>
  ),
}));

import type { ServiceCardData } from "@/app/types/service";

const baseCard: ServiceCardData = {
  name: "data",
  title: "Data Visualization & Analysis",
  description: "Interactive visualizations for data exploration.",
  path: "/services/data-viz",
  type: "active",
  image: {
    src: "/images/analytics-stock.jpg",
    alt: "Analytics and insights",
  },
};

describe("ServiceCard", () => {
  it("renders title, description, and image alt text", () => {
    render(<ServiceCard card={baseCard} />);

    expect(
      screen.getByRole("heading", { name: baseCard.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(baseCard.description)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: baseCard.image.alt })).toHaveAttribute(
      "src",
      baseCard.image.src,
    );
  });

  it("links active cards to their service path", () => {
    const { container } = render(<ServiceCard card={baseCard} />);

    expect(container.querySelector("a")).toHaveAttribute("href", baseCard.path);
  });

  it("does not link inactive cards", () => {
    const { container } = render(
      <ServiceCard card={{ ...baseCard, type: "inactive" }} />,
    );

    expect(container.querySelector("a")).not.toBeInTheDocument();
    expect(screen.getByText(baseCard.title)).toBeInTheDocument();
  });

  it("opens external cards in a new tab", () => {
    const { container } = render(
      <ServiceCard
        card={{
          ...baseCard,
          type: "external",
          path: "https://example.com",
        }}
      />,
    );
    const link = container.querySelector("a");

    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
