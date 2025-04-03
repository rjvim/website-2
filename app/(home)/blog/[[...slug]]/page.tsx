import { blogSource, getCategoryBySlug } from "@/lib/source";
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
import { Calendar } from "lucide-react";
import Link from "next/link";
import { blogsMetaImage } from "@/lib/metadata-image";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { GridBackground } from "@/components/grid-background";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  if (!params.slug || params.slug.length === 0) {
    return (
      <div className="container px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">All Blog Posts</h1>
        {/* List all blog posts here */}
      </div>
    );
  }

  const category = params.slug?.[0] || undefined;
  const postUrl = params.slug?.[1];

  console.log("postUrl", postUrl, category);

  if (!postUrl) {
    try {
      console.log("Are we here?");
      return <div>The category page! {JSON.stringify(params)}</div>;
    } catch (error) {
      console.error(error);
      return <div>Something went wrong!</div>;
    }
  }

  console.log("Are we also here?");

  const page = blogSource.getPage(params.slug);

  const lastModified = page?.data.lastModified;
  const lastUpdate = lastModified ? new Date(lastModified) : undefined;
  const tags = page?.data.tags ?? [];

  //   console.log("tags", params.category, params.slug, tags);

  // console.log("params", params.slug);

  // if (!page) notFound();

  const MDX = page.data.body;

  return (
    <>
      <div className="relative container px-4 py-8 lg:py-12 lg:px-6 text-left">
        <GridBackground maxWidthClass="container" />
        {category && (
          <div className="mb-4 text-gray-600 dark:text-gray-400 text-sm font-medium">
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 capitalize">
                {getCategoryBySlug(category).icon &&
                  React.createElement(getCategoryBySlug(category).icon, {
                    className: "h-4 w-4",
                  })}
                <Link href={`/blog/${category}`}>
                  {getCategoryBySlug(category).label}
                </Link>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {lastUpdate?.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        )}
        <DocsTitle className="text-left dark:text-white">
          {page.data.title}
        </DocsTitle>
        <DocsDescription className="text-left mt-3 dark:text-gray-300">
          {page.data.description}
        </DocsDescription>
        <div className="flex flex-wrap gap-2 mt-4">
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
            lastUpdate={lastUpdate}
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

export async function generateStaticParams() {
  const staticParams = await blogSource.generateParams();

  // Extract categories from two-part slugs and add them as separate params
  const categories = staticParams
    .filter((param) => param.slug && param.slug.length === 2)
    .map((param) => ({ slug: [param.slug[0]] }))
    .filter(
      (category, index, self) =>
        // Remove duplicates
        index === self.findIndex((c) => c.slug[0] === category.slug[0])
    );

  // Combine original params with category params
  const allParams = [{ slug: [] }, ...staticParams, ...categories];

  console.log("generateStaticParams", allParams);

  return allParams;
}

// export async function generateMetadata(props: {
//   params: Promise<{ slug?: string[] }>;
// }) {
//   const params = await props.params;
//   const page = blogSource.getPage(params.slug);
//   if (!page) notFound();

//   return createMetadata(
//     blogsMetaImage.withImage(page.slugs, {
//       title: page.data.title,
//       description: page.data.description,
//       openGraph: {
//         url: page.url,
//       },
//       alternates: {
//         canonical: page.url,
//       },
//     })
//   );
// }
