import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { sortedByDatePageTree } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      nav={{ enabled: false }}
      tree={sortedByDatePageTree}
      sidebar={{ enabled: false, prefetch: false, tabs: false }}
      // containerProps={{
      //   className: "relative max-w-7xl mx-auto md:[--fd-nav-height:59px]",
      // }}
    >
      {children}
    </DocsLayout>
  );
}
