import type { Metadata } from "next";
import type { ServiceImage } from "@/app/types/service";

export const SITE_URL = "https://futurelithics.com";
export const SITE_NAME = "Future Lithics";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image: ServiceImage;
};

export function buildPageMetadata({
  title,
  description,
  path,
  image,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: image.src, alt: image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.src],
    },
  };
}
