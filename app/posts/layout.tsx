import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { docsSource } from "@/lib/source";

const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: docsSource.pageTree,
};

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsLayout {...docsOptions}>{children}</DocsLayout>;
}
