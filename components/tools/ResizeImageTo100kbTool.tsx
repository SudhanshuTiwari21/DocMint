"use client";

import { SmartImageOptimizer } from "./SmartImageOptimizer";

export function ResizeImageTo100kbTool() {
  return (
    <SmartImageOptimizer
      defaultMode="smart"
      defaultTargetKb={100}
      heading="Resize image to 100KB"
    />
  );
}
