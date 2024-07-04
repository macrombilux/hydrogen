import { renderWarning, renderSuccess } from '@shopify/cli-kit/node/ui';

const REQUIRED_ROUTES = [
  "",
  "cart",
  // 'products',
  "products/:productHandle",
  "collections",
  //   'collections/all',
  "collections/:collectionHandle",
  //   'collections/:collectionHandle/:constraint',
  //   'collections/:collectionHandle/products/:productHandle',
  "sitemap.xml",
  "robots.txt",
  "pages/:pageHandle",
  //   'blogs/:blogHandle/tagged/:tagHandle',
  //   'blogs/:blogHandle/:articleHandle',
  //   'blogs/:blogHandle/:articleHandle/comments',
  "policies/:policyHandle",
  //   'variants/:variantId',
  "search",
  //   'gift_cards/:storeId/:cardId',
  // 'discount/:discountCode', => Handled in storefrontRedirect
  "account",
  "account/login",
  // 'account/addresses',
  // 'account/orders',
  "account/orders/:orderId",
  // -- Added for CAAPI:
  "account/authorize"
  // -- These were removed when migrating to CAAPI:
  // 'account/register',
  // 'account/reset/:id/:token',
  // 'account/activate/:id/:token',
  //   'password',
  //   'opening_soon',
];
function findMissingRoutes(config, requiredRoutes = REQUIRED_ROUTES) {
  const userRoutes = Object.values(config.routes);
  const missingRoutes = new Set(requiredRoutes);
  for (const requiredRoute of requiredRoutes) {
    for (const userRoute of userRoutes) {
      if (!requiredRoute && !userRoute.path) {
        missingRoutes.delete(requiredRoute);
      } else if (requiredRoute && userRoute.path) {
        const currentRoute = {
          path: userRoute.path,
          parentId: userRoute.parentId
        };
        while (currentRoute.parentId && currentRoute.parentId !== "root") {
          const parentRoute = userRoutes.find(
            (r) => r.id === currentRoute.parentId
          );
          if (!parentRoute) break;
          currentRoute.path = `${parentRoute.path}/${currentRoute.path}`;
          currentRoute.parentId = parentRoute.parentId;
        }
        const optionalSegment = ":?[^\\/\\?]+\\?";
        const reString = `^(${optionalSegment}\\/)?` + // Starts with an optional segment
        requiredRoute.replaceAll(".", "\\.").replace(/\//g, `\\/(${optionalSegment}\\/)?`).replace(/:[^/)?]+/g, "(:[^\\/]+|\\*)") + // Replace params with regex
        `(\\/${optionalSegment})?$`;
        if (new RegExp(reString).test(currentRoute.path)) {
          missingRoutes.delete(requiredRoute);
        }
      }
    }
  }
  return [...missingRoutes];
}
const LINE_LIMIT = 100;
function logMissingRoutes(routes) {
  if (routes.length) {
    renderWarning({
      headline: "Standard Shopify routes missing",
      body: `Your Hydrogen project is missing ${routes.length} standard Shopify route${routes.length > 1 ? "s" : ""}.
Including these routes improves compatibility with Shopify\u2019s platform:

` + routes.slice(0, LINE_LIMIT - (routes.length <= LINE_LIMIT ? 0 : 1)).map((route) => `\u2022 /${route}`).join("\n") + (routes.length > LINE_LIMIT ? `
\u2022 ...and ${routes.length - LINE_LIMIT + 1} more` : "")
    });
  } else {
    renderSuccess({
      headline: "All standard Shopify routes present"
    });
  }
}

export { findMissingRoutes, logMissingRoutes };
