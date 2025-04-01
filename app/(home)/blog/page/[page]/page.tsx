import {
  ListWithPagination,
  generateStaticParams,
} from "@/components/blog-list";
import { baseUrl, createMetadata } from "@/components/metadata";
import type { Metadata, ResolvingMetadata } from "next";

export default ListWithPagination;

export { generateStaticParams };

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
