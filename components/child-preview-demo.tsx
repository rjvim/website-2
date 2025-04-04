"use client";

import ContainerQueryCard from "@/components/container-query-card";
import { ChildPreview } from "@locospec/responsive-preview-react";

export default function ChildPreviewDemo() {
  return (
    <ChildPreview>
      <ContainerQueryCard />
    </ChildPreview>
  );
}
