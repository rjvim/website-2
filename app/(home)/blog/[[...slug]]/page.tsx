import { blogSource, getCategoryBySlug } from "@/lib/source";
import React from "react";
import { notFound } from "next/navigation";
import { blogsMetaImage } from "@/lib/metadata-image";
import { createMetadata } from "@/lib/metadata";
import { BlogPost } from "@/components/blog-post";

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

  return <BlogPost page={page} category={category} lastUpdate={lastUpdate} tags={tags} />;
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
