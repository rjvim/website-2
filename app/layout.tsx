import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { baseUrl, createMetadata } from "@/lib/metadata";
import { description } from "./layout.config";
import { cn } from "@/lib/utils";

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
    template: "%s | rjv.im",
    default: "rjv.im",
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
        <RootProvider
          search={{
            options: {
              type: "static",
              defaultTag: "docs",
              tags: [
                {
                  name: "Docs",
                  value: "docs",
                },
                {
                  name: "Blog",
                  value: "blog",
                },
              ],
            },
          }}
          theme={{
            enabled: false,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
