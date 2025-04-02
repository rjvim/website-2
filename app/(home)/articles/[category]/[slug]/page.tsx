import {
  blogSource,
  getBlogPost,
  getPostsByCategoryAndSlug,
} from "@/lib/source";
import { notFound } from "next/navigation";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import defaultMdxComponents from "fumadocs-ui/mdx";

export default async function Page(props: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const params = await props.params;
  // const page = getBlogPost([params.slug]);
  const page = getPostsByCategoryAndSlug(params.category, params.slug);
  const lastModified = page?.data.lastModified;
  const lastUpdate = lastModified ? new Date(lastModified) : undefined;
  const tags = page?.data.tags ?? [];

  if (!page) notFound();

  const MDX = page.data.body;

  return (
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
      // article={{
      //   className: "!max-w-[1120px]",
      // }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams(): { category: string; slug: string }[] {
  return blogSource.getPages().map((page) => ({
    category: page.data.category,
    slug: page.slugs[0] || "",
  }));
}
