import { Icons } from "@/components/icons";
import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";

export const title = "SaaS Foundations";
export const description = "NextJS Template to build SaaS applications";
export const owner = "Rajiv I'm";
/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Logo"
        >
          <circle cx={12} cy={12} r={12} fill="currentColor" />
        </svg>
        rjv.im
      </>
    ),
  },
  links: [
    {
      text: "Posts",
      url: "/posts",
    },
  ],
};

export const linkItems: LinkItemType[] = [
  {
    icon: <Icons.info />,
    text: "About",
    url: "/about",
    active: "url",
  },
  {
    icon: <Icons.posts />,
    text: "Posts",
    url: "/posts",
    active: "url",
  },
  {
    icon: <Icons.tags />,
    text: "Tags",
    url: "/tags",
    active: "url",
  },
];

export const postsPerPage = 5;
