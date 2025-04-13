import type { ReactNode } from "react";
import type { TableOfContents } from "fumadocs-core/server";
// import { cn } from "@repo/shadcn/lib/utils";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
// import { GridBackground } from "@repo/ui/components/grid-background";
import { DocsPage } from "fumadocs-ui/page";
import { GridBackground } from "./grid-background";
import { cn } from "@/lib/utils";
import { Section } from "./section";

interface MdxLayoutProps {
  children: ReactNode;
  title: string;
  toc?: TableOfContents;
  slug: string;
}

export default function VanillaMdx({
  children,
  title,
  toc,
  slug,
}: MdxLayoutProps): ReactNode {
  return (
    <>
      <Section className="p-4 lg:p-6">
        <h1 className="text-center font-bold text-3xl leading-tight tracking-tighter md:text-4xl">
          {title}
        </h1>
      </Section>
      <DocsLayout
        nav={{ enabled: false }}
        tree={{
          name: "JustMDX",
          children: [],
        }}
        sidebar={{ enabled: false, prefetch: false, tabs: false }}
        containerProps={{
          className: cn("relative container md:[--fd-nav-height:57px]"),
        }}
      >
        <GridBackground maxWidthClass="container" />
        <DocsPage
          toc={toc}
          article={{
            className: "!m-[unset] max-w-none",
          }}
          tableOfContent={{
            style: "clerk",
            single: false,
          }}
        >
          <div className="prose min-w-0 flex-1 px-4">{children}</div>
        </DocsPage>
      </DocsLayout>
    </>
  );
}
