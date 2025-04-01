import type { Metadata, ResolvingMetadata } from "next";

import { BlogList } from "@/components/blog-list";
import { baseUrl, createMetadata } from "@/lib/metadata";

export default function List() {
  return <BlogList page={1} />;
}

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  return createMetadata({
    title: "Blog",
    description: "Articles which blow your mind",
    alternates: {
      canonical: `${baseUrl}/blog`,
    },
  });
}
