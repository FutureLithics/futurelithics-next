"use client";

import React from "react";
import { notFound } from "next/navigation";
import cardRoutes from "@/app/service-routes";
import { getRouteDataBySlug } from "@/app/utils/common.utils";
import ServicePageShell from "@/app/_components/shared/ServicePageShell";

type Params = Promise<{ slug: string[] }>;

export default function ServicePage({ params }: { params: Params }) {
  const unwrappedParams = React.use(params as Params) as { slug?: string[] };
  const slug = unwrappedParams.slug || [];
  const currentRoute = getRouteDataBySlug(slug[slug.length - 1], cardRoutes);

  if (!currentRoute) {
    return notFound();
  }

  return (
    <ServicePageShell
      title={currentRoute.title}
      description={currentRoute.description}
      image={currentRoute.image}
      routes={currentRoute.routes}
    />
  );
}
