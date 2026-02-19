import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { UserSync } from "@/components/auth/user-sync";
import { Sidebar } from "@/components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitChat",
  description: "AI-powered Git conversation platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="ja">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SignedIn>
            <UserSync />
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 flex flex-col min-h-screen pl-[72px]">
                {children}
              </main>
            </div>
          </SignedIn>

          <SignedOut>{children}</SignedOut>
        </body>
      </html>
    </ClerkProvider>
  );
}