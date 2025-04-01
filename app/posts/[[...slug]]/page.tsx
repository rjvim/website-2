import { docsSource } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
  DocsCategory,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultMdxComponents, { createRelativeLink } from "fumadocs-ui/mdx";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = docsSource.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{
        style: "clerk",
        single: false,
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={{
            ...defaultMdxComponents,
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(docsSource, page),
            // you can add other MDX components here,
          }}
        />
        {page.data.index ? (
          <DocsCategory page={page} from={docsSource} />
        ) : null}
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return docsSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = docsSource.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
