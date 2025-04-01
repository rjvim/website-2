import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { baseUrl, createMetadata } from "@/components/metadata";
import { description } from "./layout.config";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata = createMetadata({
  title: {
    template: "%s | SaaS Foundations",
    default: "SaaS Foundations",
  },
  description: description,
  metadataBase: baseUrl,
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          crossOrigin="anonymous"
          src="//cdn.jsdelivr.net/npm/meta-scan@0.10.2/dist/auto.global.js"
          data-auto-enable={"true"}
        />
      </head>
      <body
        className={cn(
          "bg-background overscroll-none font-sans antialiased",
          `${geistSans.variable} ${geistMono.variable}`
        )}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
