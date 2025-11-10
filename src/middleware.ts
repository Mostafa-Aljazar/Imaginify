// middleware.ts (or proxy.ts for Next.js ≤15)
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { ROUTES } from './constants';

const isProtectedRoute = createRouteMatcher([
    ROUTES.PAGES.CREDITS,
    ROUTES.PAGES.PROFILE,
    ROUTES.PAGES.START,
    ROUTES.PAGES.TRANSFORMATIONS,
    ROUTES.PAGES.TRANSFORMATIONS_FILL,
    ROUTES.PAGES.TRANSFORMATIONS_RECOLOR,
    ROUTES.PAGES.TRANSFORMATIONS_REMOVE,
    ROUTES.PAGES.TRANSFORMATIONS_REMOVE_BACKGROUND,
    ROUTES.PAGES.TRANSFORMATIONS_REPLACE_BACKGROUND,
    ROUTES.PAGES.TRANSFORMATIONS_RESTORE,
]);

const isAuthRoute = createRouteMatcher([
    ROUTES.AUTH_ROUTES.SIGN_IN,
    ROUTES.AUTH_ROUTES.SIGN_UP,
]);

export default clerkMiddleware(async (auth, req) => {
    const { userId, redirectToSignIn } = await auth();

    // Signed-in user trying to reach sign-in/up → redirect home
    if (userId && isAuthRoute(req)) {
        return Response.redirect(new URL(ROUTES.PAGES.HOME, req.url));
    }

    // Unauthenticated user trying to reach protected page → redirect to sign-in
    if (!userId && isProtectedRoute(req)) {
        return redirectToSignIn();
    }

    // All other routes continue
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};