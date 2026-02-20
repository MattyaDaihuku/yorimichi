import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, request) => {
    if (!isPublicRoute(request)) {
        // await auth.protect();
    }
});

export const config = {
    matcher: [
        // Next.jsの内部ファイルや静的ファイルを除外
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!Â·mjs)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // APIルートやTRPCに常に適用
        '/(api|trpc)(.*)',
    ],
};
