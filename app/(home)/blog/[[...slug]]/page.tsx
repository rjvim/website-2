import {
  blogSource,
  getCategoryBySlug,
  getSortedByDatePosts,
} from "@/lib/source";
import React from "react";
import { notFound } from "next/navigation";
import { blogsMetaImage } from "@/lib/metadata-image";
import { createMetadata } from "@/lib/metadata";
import { BlogPost } from "@/components/blog-post";
import { BlogList } from "@/components/blog-list";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  console.log("params", params);

  if (!params.slug || params.slug.length === 0) {
    return <BlogList page={1} />;
  }

  if (
    params.slug.length === 2 &&
    params.slug[0] === "page" &&
    !isNaN(Number(params.slug[1]))
  ) {
    return <BlogList page={Number(params.slug[1])} />;
  }

  const category = params.slug?.[0] || undefined;
  const postUrl = params.slug?.[1];

  // console.log("postUrl", postUrl, category);

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

  return (
    <BlogPost
      page={page}
      category={category}
      lastUpdate={lastUpdate}
      tags={tags}
    />
  );
}

export { generateBlogStaticParams as generateStaticParams } from "@/app/(home)/blog/[[...slug]]/(components)/blog-static-params";

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
