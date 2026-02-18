import { InternalLinksSection } from "@/components/common/InternalLinksSection";
import {
  resizeToolLinks,
  pdfToolLinks,
  examPhotoGuidesLinks,
} from "@/lib/internalLinks";

type SectionHeadingLevel = 2 | 3;

/** Renders the three standard internal link sections for tool and guide pages. */
export function RelatedToolsLinks({
  headingLevel = 2,
}: {
  headingLevel?: SectionHeadingLevel;
}) {
  return (
    <div className="space-y-8">
      <InternalLinksSection
        title="Related Image Tools"
        links={resizeToolLinks}
        headingLevel={headingLevel}
      />
      <InternalLinksSection
        title="PDF Tools"
        links={pdfToolLinks}
        headingLevel={headingLevel}
      />
      <InternalLinksSection
        title="Exam Photo Guides"
        links={examPhotoGuidesLinks}
        headingLevel={headingLevel}
      />
    </div>
  );
}
