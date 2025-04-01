import ListWithPagination, {
  generateStaticParams,
} from "@/components/list-pagination";
import { baseUrl, createMetadata } from "@/lib/metadata";
import type { Metadata, ResolvingMetadata } from "next";

export default ListWithPagination;

export { generateStaticParams };

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];

  //   console.log("previousImages", previousImages);

  return createMetadata({
    title: "Blog",
    description: "Articles which blow your mind",
    alternates: {
      canonical: `${baseUrl}/blog`,
    },
  });
}
