import { blogSource, getPostsByCategoryAndSlug } from "@/lib/source";
import { notFound } from "next/navigation";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { cn } from "@/lib/utils";
import { GridBackground } from "@/components/grid-background";

export default async function Page(props: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const params = await props.params;
  // const page = getBlogPost([params.slug]);
  const page = getPostsByCategoryAndSlug(params.category, params.slug);
  const lastModified = page?.data.lastModified;
  const lastUpdate = lastModified ? new Date(lastModified) : undefined;
  const tags = page?.data.tags ?? [];

  console.log("tags", params.category, params.slug, tags);

  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsLayout
      nav={{ enabled: false }}
      tree={{
        name: "Tree",
        children: [],
      }}
      sidebar={{ enabled: false, prefetch: false, tabs: false }}
      containerProps={{
        className: cn("relative container md:[--fd-nav-height:57px]"),
      }}
    >
      <GridBackground maxWidthClass="container" />
      <DocsPage
        toc={page.data.toc}
        full={page.data.full}
        lastUpdate={lastUpdate}
        footer={{
          enabled: false,
        }}
        tableOfContent={{
          style: "clerk",
          single: false,
        }}
        article={{
          className: "!m-[unset] max-w-none py-12",
        }}
      >
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <MDX components={{ ...defaultMdxComponents }} />
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  );
}

export function generateStaticParams(): { category: string; slug: string }[] {
  return blogSource.getPages().map((page) => ({
    category: page.data.category,
    slug: page.slugs[0] || "",
  }));
}
