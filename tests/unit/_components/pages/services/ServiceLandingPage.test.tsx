import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import ServiceLandingPage from "@/app/_components/pages/services/ServiceLandingPage";
import { servicePages } from "@/app/content/services";
import { getLandingServiceBySlug } from "@/app/utils/service.utils";

afterEach(() => {
  cleanup();
});

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string | { pathname: string };
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={typeof href === "string" ? href : href.pathname} className={className}>
      {children}
    </a>
  ),
}));

vi.mock("@/app/_components/home/ContactSection", () => ({
  default: () => <div id="contact-section">Contact form</div>,
}));

const renderPage = (slug: string) => {
  const service = getLandingServiceBySlug(slug);
  const content = servicePages[slug];

  if (!service) throw new Error(`Missing service for ${slug}`);

  return { content, ...render(<ServiceLandingPage service={service} content={content} />) };
};

describe("ServiceLandingPage", () => {
  it.each(Object.keys(servicePages))("renders every required section for %s", (slug) => {
    const { content, container } = renderPage(slug);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(content.hero.headline)).toBeInTheDocument();

    for (const id of ["problem", "capabilities", content.spotlight.id, "fit", "evidence", "related", "consultation"]) {
      expect(container.querySelector(`section#${id}`)).toBeInTheDocument();
    }

    expect(container.querySelector("#contact-section")).toBeInTheDocument();
  });

  it("links related services to their routes", () => {
    const { container } = renderPage("product-engineering");
    const related = container.querySelector("section#related") as HTMLElement;
    const hrefs = within(related)
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));

    expect(hrefs).toEqual(["/software-architecture", "/services/dev-stack", "/services/design"]);
  });

  it("points both consultation CTAs at the contact form", () => {
    renderPage("technical-strategy");

    const ctas = screen.getAllByRole("link", { name: "Schedule Consultation" });
    expect(ctas).toHaveLength(2);
    for (const cta of ctas) {
      expect(cta).toHaveAttribute("href", "#contact-section");
    }
  });

  it("renders comparison columns for the modernize-or-rewrite decision", () => {
    renderPage("legacy-app-modernization");

    expect(screen.getByRole("heading", { name: "Modernize or rewrite?", level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Modernize when", level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Consider a rewrite when", level: 3 })).toBeInTheDocument();
  });

  it("renders engagement deliverables for technical strategy", () => {
    renderPage("technical-strategy");

    expect(screen.getByRole("heading", { name: "What you receive", level: 3 })).toBeInTheDocument();
  });
});
