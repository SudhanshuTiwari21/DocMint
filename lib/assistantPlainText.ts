/**
 * Normalizes model output that often arrives as Markdown into plain text for the chat UI.
 */

export function assistantReplyToPlainText(input: string): string {
  let s = input.replace(/\r\n/g, "\n");

  // Fenced code blocks: keep inner text
  s = s.replace(/```[\w]*\n?([\s\S]*?)```/g, (_, inner: string) => inner.trim() + "\n");

  // Bold **text** and __text__
  s = s.replace(/\*\*([^*]+)\*\*/g, "$1");
  s = s.replace(/__([^_]+)__/g, "$1");

  // Italic *text* (avoid matching **)
  s = s.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "$1");
  s = s.replace(/(?<!_)_([^_\n]+)_(?!_)/g, "$1");

  // ATX headings
  s = s.replace(/^#{1,6}\s+/gm, "");

  // Inline `code`
  s = s.replace(/`([^`]+)`/g, "$1");

  // Strikethrough
  s = s.replace(/~~([^~]+)~~/g, "$1");

  // Markdown list bullets → plain bullet character
  s = s.replace(/^(\s*)[-*+]\s+/gm, "$1• ");

  // Any remaining doubled asterisks
  s = s.replace(/\*\*/g, "");

  s = s
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");

  return s.trim();
}
