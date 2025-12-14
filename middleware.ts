import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/about',
  '/contact',
  '/help',
]);

const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
  '/products(.*)',
  '/product(.*)',
  '/category(.*)',
  '/search(.*)',
  '/cart',
  '/checkout(.*)',
  '/orders(.*)',
  '/order(.*)',
  '/profile',
  '/account(.*)',
  '/settings(.*)',
  '/wishlist(.*)',
  '/dashboard(.*)',
  '/addresses(.*)',
  '/payment(.*)',
  '/notifications(.*)',
]);

const isTenantProtectedRoute = (pathname: string): boolean => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length < 2) return false;
  
  const systemRoutes = ['admin', 'sign-in', 'sign-up', 'api', 'studio', 'about', 'contact', 'help'];
  if (systemRoutes.includes(segments[0])) return false;
  
  const protectedTenantRoutes = ['products', 'cart', 'checkout', 'orders', 'wishlist', 'profile'];
  return protectedTenantRoutes.includes(segments[1]);
};

export default clerkMiddleware(async (auth, request) => {
  const pathname = request.nextUrl.pathname;
  
  if (isProtectedRoute(request) || isTenantProtectedRoute(pathname)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

