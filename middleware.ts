import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Public routes - accessible without authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/products(.*)',           // Product listings and details
  '/product(.*)',            // Alternative product route
  '/category(.*)',           // Category pages
  '/search(.*)',             // Search results
  '/about',                  // About page
  '/contact',                // Contact page
  '/help',                   // Help/FAQ pages
]);

// Protected routes - require authentication
const isProtectedRoute = createRouteMatcher([
  '/cart',                   // Shopping cart
  '/checkout(.*)',           // Checkout process
  '/orders(.*)',             // Order history and details
  '/order(.*)',              // Alternative order route
  '/profile',                // User profile
  '/account(.*)',            // Account settings
  '/settings(.*)',           // User settings
  '/wishlist(.*)',           // Wishlist
  '/dashboard(.*)',          // User dashboard
  '/addresses(.*)',          // Shipping addresses
  '/payment(.*)',            // Payment methods
  '/notifications(.*)',      // User notifications
]);

export default clerkMiddleware(async (auth, request) => {
  // Protect all routes except public ones
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

