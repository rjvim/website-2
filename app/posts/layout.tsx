import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { docsSource } from "@/lib/source";

const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  // tree: docsSource.pageTree,
  tree: {
    name: "JustMDX",
    children: [],
  },
  links: [],
  nav: { enabled: false },
  sidebar: { enabled: false, prefetch: false, tabs: false },
  containerProps: {
    className: "relative max-w-7xl mx-auto md:[--fd-nav-height:59px] bg-red-50",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsLayout {...docsOptions}>{children}</DocsLayout>;
}
