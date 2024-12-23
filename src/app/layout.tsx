import "@/styles/globals.css";

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Geist, Geist_Mono } from "next/font/google";

import { AppContextProvider } from "@/hooks/useApp";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TailwindIndicator = dynamic(() => import("@/components/helper/tailwind-indicator"));
const ThemeProvider = dynamic(() => import("@/components/helper/theme-provider"));

export const metadata: Metadata = {
  title: "Neighborhood lens",
  description: "Live your daily life in the neighborhood",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen w-full`)}
        suppressHydrationWarning
      >
        <AppContextProvider>
          <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
            {children}
            <TailwindIndicator />
          </ThemeProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
