import { Icons } from "@/components/icons";
import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

export const title = "rjv.im";
export const description =
  "Personal website of Rajiv. This is where I articulate my work, open source projects, thoughts, ideas, work, commentary and opinions.";
export const owner = "Rajiv";
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
        <Image
          src="/avatar.png"
          width={24}
          height={24}
          alt="Logo"
          className="rounded-full"
        />
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
    text: "Me",
    url: "/me",
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
