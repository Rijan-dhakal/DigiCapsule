"use client";

import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";


const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({
  value,
  onChange,
}: MarkdownEditorProps) {
  return (
    <div data-color-mode="dark">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || "")}
        height={400}
        preview="live"
        previewOptions={{
          skipHtml: true,
          rehypePlugins: [[rehypeSanitize]],
          remarkPlugins: [remarkGfm],
          components: {
            img: () => null,
          },
        }}
      />
    </div>
  );
}
