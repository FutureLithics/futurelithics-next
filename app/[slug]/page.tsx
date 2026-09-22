import { notFound } from "next/navigation";
import ServiceLandingPage from "@/app/_components/pages/services/ServiceLandingPage";
import {
  getLandingServiceBySlug,
  getLandingServiceSlugs,
} from "@/app/utils/service.utils";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getLandingServiceSlugs().map((slug) => ({ slug }));
}

export default async function LandingServicePage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const service = getLandingServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceLandingPage service={service} />;
}
