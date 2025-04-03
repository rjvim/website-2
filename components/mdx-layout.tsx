import type { TableOfContents } from "fumadocs-core/server";
import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsBody, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { cn } from "@/lib/utils";
import { Section } from "./section";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { GridBackground } from "./grid-background";

interface MdxLayoutProps {
  children: ReactNode;
  title: string;
  toc?: TableOfContents;
  slug: string;
}

const PageHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className="border-grid border-b">
    <div className="container-wrapper">
      <div className={cn("container py-6 px-4", className)}>{children}</div>
    </div>
  </div>
);

// export default function MdxLayout({
//   children,
//   title,
//   toc,
// }: MdxLayoutProps): ReactNode {
//   return (
//     <>
//       <DocsLayout
//         nav={{ enabled: false }}
//         tree={{
//           name: "JustMDX",
//           children: [],
//         }}
//         sidebar={{ enabled: false, prefetch: false, tabs: false }}
//         containerProps={{
//           className:
//             "relative max-w-7xl mx-auto md:[--fd-nav-height:59px] bg-red-50",
//         }}
//       >
//         <DocsPage
//           // toc={toc}
//           full={false}
//           footer={{
//             enabled: false,
//           }}
//           tableOfContent={{
//             style: "clerk",
//             single: false,
//           }}
//           // article={{
//           //   className: "!max-w-[1120px]",
//           // }}
//         >
//           <DocsTitle>{title}</DocsTitle>

//           <DocsBody>{children}</DocsBody>
//         </DocsPage>
//       </DocsLayout>
//     </>
//   );
// }

export default function MdxLayout({
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
          {/* <Section className="h-full" sectionClassName="flex flex-1">
            <article className="flex min-h-full flex-col lg:flex-row">
              <div className="flex flex-1 flex-col gap-4">
                {toc?.length ? (
                  <InlineTOC
                    items={toc}
                    className="rounded-none border-0 border-border/70 border-b border-dashed dark:border-border"
                  />
                ) : null}
                <div className="prose min-w-0 flex-1 px-4">{children}</div>
              </div>
            </article>
          </Section> */}
        </DocsPage>
      </DocsLayout>
    </>
  );
}
