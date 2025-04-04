"use client";

import { ChildPreview } from "@locospec/responsive-preview-react";

export default function ChildPreviewClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChildPreview>{children}</ChildPreview>;
}
