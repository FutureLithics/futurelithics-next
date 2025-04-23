"use client";

import React from 'react';
import { useRouter, notFound } from 'next/navigation';
import ServiceCard from "../../_components/shared/ServiceCard";
import cardRoutes from '@/app/service-routes';

const getRouteDataBySlug = (slug: string, routes?: any[]): any => {
  if (!routes || routes.length === 0) return null;

  // Try to find a direct match first
  const directMatch = routes.find(route => route.path === `/services/${slug}`);
  if (directMatch) return directMatch;

  // Look for a match with just the slug
  const slugMatch = routes.find(route => {
    const routePath = route.path;
    return routePath.endsWith(`/${slug}`);
  });
  if (slugMatch) return slugMatch;

  // Recursive search through child routes
  for (const route of routes) {
    if (route.routes) {
      const childMatch = getRouteDataBySlug(slug, route.routes);
      if (childMatch) return childMatch;
    }
  }

  return null;
}

export default function ServicePage({ params }: { params: { slug?: string[] } }) {
  const router = useRouter();
  
  // Use React.use() with proper type assertions
  const unwrappedParams = React.use(params as any) as { slug?: string[] };
  const slug = unwrappedParams.slug || [];
  
  const currentRoute = getRouteDataBySlug(slug[slug.length - 1], cardRoutes);

  console.log(currentRoute);
  
  if (!currentRoute) {
    return notFound();
  }

  const goBack = () => {
    router.back();
  };

  console.log(slug, currentRoute.routes, currentRoute.info);
  return (
    <div className="custom-layer-bg service-page py-4 w-100">
      <div className="container pt-4">
        <div className="subheader p-4 mb-4 text-center mx-auto w-sm-75 w-xs-100">
          <h2 className="mb-3 text-center text-primary-data">{currentRoute.title}</h2>
          <p>
            <strong>{currentRoute.description}</strong>
          </p>
        </div>
      </div>

      <div className="container p-y w-100 row justify-content-start mx-auto">
        {currentRoute.routes != undefined &&
          currentRoute.routes.map((route: any) => {
            return <ServiceCard card={route} key={route.name} />;
          })}
      </div>
      <div className="container text-center pt-4">
        <button className="btn btn-info" onClick={goBack}>
          Go Back
        </button>
      </div>
    </div>
  );
}