import { generateOGImage } from "fumadocs-ui/og";
import { docsMetaImage } from "@/lib/metadata-image";
import type { ImageResponse } from "next/og";

export const GET = docsMetaImage.createAPI((page: any): ImageResponse => {
  // console.log("Docs Page URL:", page.url);
  return generateOGImage({
    title: page.data.title,
    description: page.data.description,
    site: "OSS",
  });
});

export function generateStaticParams() {
  return docsMetaImage.generateParams();
}
