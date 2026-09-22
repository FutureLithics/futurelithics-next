import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceLandingPage from "@/app/_components/pages/services/ServiceLandingPage";
import { getServicePageContent } from "@/app/content/services";
import { buildPageMetadata } from "@/app/utils/metadata";
import {
  getLandingServiceBySlug,
  getLandingServiceSlugs,
} from "@/app/utils/service.utils";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return getLandingServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getLandingServiceBySlug(slug);
  const content = getServicePageContent(slug);

  if (!service || !content) {
    return {};
  }

  return buildPageMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: service.path,
    image: service.image,
  });
}

export default async function LandingServicePage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const service = getLandingServiceBySlug(slug);
  const content = getServicePageContent(slug);

  if (!service || !content) {
    notFound();
  }

  return <ServiceLandingPage service={service} content={content} />;
}
