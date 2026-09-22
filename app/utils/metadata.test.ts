import { describe, expect, it } from "vitest";
import { buildPageMetadata, SITE_NAME } from "./metadata";

describe("buildPageMetadata", () => {
  const metadata = buildPageMetadata({
    title: "Product Engineering Services | Future Lithics",
    description: "From idea to production-ready software.",
    path: "/product-engineering",
    image: { src: "/images/product-engineering.jpg", alt: "Product team" },
  });

  it("sets title, description, and canonical path", () => {
    expect(metadata.title).toBe("Product Engineering Services | Future Lithics");
    expect(metadata.description).toBe("From idea to production-ready software.");
    expect(metadata.alternates?.canonical).toBe("/product-engineering");
  });

  it("includes Open Graph and Twitter metadata", () => {
    expect(metadata.openGraph).toMatchObject({
      title: "Product Engineering Services | Future Lithics",
      url: "/product-engineering",
      siteName: SITE_NAME,
      images: [{ url: "/images/product-engineering.jpg", alt: "Product team" }],
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      images: ["/images/product-engineering.jpg"],
    });
  });
});
