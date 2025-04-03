import {
  blogSource,
  getPostsByCategoryAndSlug,
  getCategoryBySlug,
} from "@/lib/source";
import React from "react";
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
import Hero from "@/components/hero";
import { Calendar } from "lucide-react";

export default async function Page(props: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const params = await props.params;
  // const page = getBlogPost([params.slug]);
  const page = getPostsByCategoryAndSlug(params.category, params.slug);
  const lastModified = page?.data.lastModified;
  const lastUpdate = lastModified ? new Date(lastModified) : undefined;
  const tags = page?.data.tags ?? [];

  // console.log("tags", params.category, params.slug, tags);

  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <>
      <div className="relative container px-4 py-8 lg:py-12 lg:px-6 text-left">
        <GridBackground maxWidthClass="container" />
        <div className="mb-4 text-gray-600 dark:text-gray-400 text-sm font-medium">
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 capitalize">
              {getCategoryBySlug(params.category).icon &&
                React.createElement(getCategoryBySlug(params.category).icon, {
                  className: "h-4 w-4",
                })}
              {getCategoryBySlug(params.category).label}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Last Updated{" "}
              {lastUpdate?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
        <DocsTitle className="text-left dark:text-white">
          {page.data.title}
        </DocsTitle>
        <DocsDescription className="text-left mt-3 dark:text-gray-300">
          {page.data.description}
        </DocsDescription>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs font-medium">
            {params.category}
          </span>
          {tags.length > 0 &&
            tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-300 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
        </div>
      </div>

      <DocsLayout
        nav={{ enabled: false }}
        tree={{
          name: "Tree",
          children: [],
        }}
        sidebar={{ enabled: false, prefetch: false, tabs: false }}
        containerProps={{
          className: cn(
            "flex-row-reverse",
            "relative container [--fd-nav-height:calc(var(--spacing)*14)] md:[--fd-nav-height:57px]"
          ),
        }}
      >
        <GridBackground maxWidthClass="container" />

        <div className="grid grid-cols-4">
          <DocsPage
            toc={page.data.toc}
            full={page.data.full}
            // lastUpdate={lastUpdate}
            footer={{
              enabled: false,
            }}
            tableOfContent={{
              style: "clerk",
              single: false,
            }}
            article={{
              className: cn(
                "!m-[unset] max-w-none bg-zinc-50/50 dark:bg-zinc-900/50 py-8 md:py-12"
              ),
            }}
          >
            <DocsBody>
              <MDX components={{ ...defaultMdxComponents }} />
            </DocsBody>
          </DocsPage>
        </div>
      </DocsLayout>
    </>
  );
}

export function generateStaticParams(): { category: string; slug: string }[] {
  return blogSource.getPages().map((page) => ({
    category: page.data.category,
    slug: page.slugs[0] || "",
  }));
}
