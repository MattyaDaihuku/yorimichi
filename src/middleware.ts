import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
    matcher: [
        // Next.jsの内部ファイルや静的ファイルを除外
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!Â·mjs)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // APIルートやTRPCに常に適用
        '/(api|trpc)(.*)',
    ],
};