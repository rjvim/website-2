import ListWithPagination, {
  generateStaticParams,
} from "@/app/(home)/blog/[[...slug]]/(components)/list-pagination";
import { baseUrl, createMetadata } from "@/lib/metadata";
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
