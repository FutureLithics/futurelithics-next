export const getRouteDataBySlug = (slug: string, routes?: any[]): any => {
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