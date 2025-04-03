import { docs, blog } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import type { InferMetaType, InferPageType } from "fumadocs-core/source";
import type { PageTree } from "fumadocs-core/server";
import { Icons } from "@/components/icons";
import {
  Brain,
  Book,
  Code,
  Cog,
  Lightbulb,
  Megaphone,
  Rocket,
  Users,
  Wrench,
} from "lucide-react";

export const docsSource = loader({
  baseUrl: "/posts",
  source: docs.toFumadocsSource(),
});

export const blogSource = loader({
  baseUrl: "/blog",
  source: createMDXSource(blog),
});

export const {
  getPage: getBlogPost,
  getPages: getBlogPosts,
  pageTree: pageBlogTree,
} = blogSource;

export type BlogPost = ReturnType<typeof getBlogPost>;

const posts = getBlogPosts();

const getDate = (url: string) => {
  const slugs = url.replace(/^\/blog\//, "").split("/");
  const post = getBlogPost(slugs);
  if (post === undefined) return 0;
  return post.data.date.getTime();
};

export const sortedByDatePageTree: PageTree.Root = {
  name: "Blogs",
  children: pageBlogTree.children
    .filter((node) => node.type === "page")
    .sort((a, b) => getDate(a.url) - getDate(b.url)),
};

export const getSortedByDatePosts = () =>
  [...posts].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

export const getTags = () => {
  const tagSet = new Set<string>();

  for (const post of posts) {
    if (post.data.tags) {
      for (const tag of post.data.tags) {
        tagSet.add(tag);
      }
    }
  }

  return Array.from(tagSet).sort();
};

export const getPostsByTag = (tag: string) => {
  return [...posts]
    .filter((post) => post.data.tags?.includes(tag))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
};

export const getPostsByCategory = (category: string) => {
  return [...posts]
    .filter((post) => post.data.category === category)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
};

export const getPostsByCategoryAndSlug = (category: string, slug: string) => {
  return (
    [...posts]
      .filter(
        (post) => post.data.category === category && post.slugs[0] === slug
      )
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())[0] ||
    undefined
  );
};

export const getCategoryBySlug = (slug: string) => {
  const categories = {
    "behind-the-scenes": {
      label: "Behind the Scenes",
      icon: Wrench,
      description:
        "Raw process of building—why and how you create tools, launches, updates, redesigns.",
    },
    "dev-life": {
      label: "Dev Life",
      icon: Code,
      description:
        "Personal takes on being a developer/founder—tips, lessons, workflows.",
    },
    plans: {
      label: "Plans",
      icon: Lightbulb,
      description:
        "Public brainstorming—future features, tool concepts, Teurons’ direction.",
    },
    ideas: {
      label: "Ideas",
      icon: Brain,
      description:
        "Exploratory thoughts and wild concepts for Teurons and beyond.",
    },
    "tools-tech": {
      label: "Tools Tech",
      icon: Cog,
      description: "Deep dives into tech stacks, tool mechanics, trends.",
    },
    team: {
      label: "Team",
      icon: Users,
      description: "Teurons’ startup journey, team dynamics, Betalectic roots.",
    },
    startup: {
      label: "Startup",
      icon: Rocket,
      description: "Growth stories and insights from Teurons and Betalectic.",
    },
    opinions: {
      label: "Opinions",
      icon: Megaphone,
      description:
        "Subjective, wild, gut-hunch takes—less informed, out-of-box rants.",
    },
    "deep-domain-problems": {
      label: "Deep Domain Problems",
      icon: Book,
      description:
        "Isolated series like a book/course—tackling big, specific domain issues.",
    },
  };

  return (
    categories[slug as keyof typeof categories] || {
      label: slug.toString().replace(/-/g, " ").toLowerCase(),
      icon: Icons.github,
    }
  );
};
