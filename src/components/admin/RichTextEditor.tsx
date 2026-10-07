"use client";

import { useRef } from "react";
import { Heading1, Heading2, Heading3, Bold, List, Type, Eraser } from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  placeholder?: string;
}

/** Tiny heading/bold/list toolbar over a plain textarea.
 *  Stores simple HTML (h1/h2/h3/strong/ul) which the site renders as-is. */
export default function RichTextEditor({
  label,
  name,
  value,
  onChange,
  rows = 6,
  placeholder,
}: RichTextEditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  function surround(before: string, after: string, fallback = "text") {
    const el = ref.current;
    if (!el) return;
    const s = el.selectionStart ?? value.length;
    const e = el.selectionEnd ?? value.length;
    const sel = value.slice(s, e) || fallback;
    const next = value.slice(0, s) + before + sel + after + value.slice(e);
    onChange({ target: { name, value: next } } as React.ChangeEvent<HTMLTextAreaElement>);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + before.length, s + before.length + sel.length);
    });
  }

  function bulletList() {
    const el = ref.current;
    if (!el) return;
    const s = el.selectionStart ?? value.length;
    const e = el.selectionEnd ?? value.length;
    const sel = value.slice(s, e) || "First point\nSecond point";
    const items = sel
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => `<li>${l.replace(/^[-•]\s*/, "")}</li>`)
      .join("\n");
    const next = value.slice(0, s) + `<ul>\n${items}\n</ul>` + value.slice(e);
    onChange({ target: { name, value: next } } as React.ChangeEvent<HTMLTextAreaElement>);
    requestAnimationFrame(() => el.focus());
  }

  function clearFormatting() {
    const el = ref.current;
    if (!el) return;
    const s = el.selectionStart ?? 0;
    const e = el.selectionEnd ?? value.length;
    const sel = s === e ? value : value.slice(s, e);
    const clean = sel.replace(/<\/?[^>]+>/g, "");
    const next = s === e ? clean : value.slice(0, s) + clean + value.slice(e);
    onChange({ target: { name, value: next } } as React.ChangeEvent<HTMLTextAreaElement>);
    requestAnimationFrame(() => el.focus());
  }

  const buttons = [
    { icon: Heading1, title: "Big heading", action: () => surround("<h1>", "</h1>", "Big heading") },
    { icon: Heading2, title: "Medium heading", action: () => surround("<h2>", "</h2>", "Medium heading") },
    { icon: Heading3, title: "Small heading", action: () => surround("<h3>", "</h3>", "Small heading") },
    { icon: Bold, title: "Bold", action: () => surround("<strong>", "</strong>", "bold text") },
    { icon: List, title: "Bullet list", action: bulletList },
    { icon: Type, title: "Normal text", action: () => surround("<p>", "</p>", "paragraph") },
    { icon: Eraser, title: "Remove formatting", action: clearFormatting },
  ];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-navy-700 mb-1.5">{label}</label>
      <div className="border border-cream-dark/20 rounded-lg overflow-hidden bg-cream/50 focus-within:ring-2 focus-within:ring-accent/40 focus-within:border-accent transition-all">
        <div className="flex items-center gap-1 px-2 py-1.5 border-b border-cream-dark/20 bg-cream/60">
          {buttons.map(({ icon: Icon, title, action }, i) => (
            <button
              key={i}
              type="button"
              title={title}
              onClick={action}
              className={cn(
                "p-1.5 rounded-md text-navy-500 hover:text-accent hover:bg-accent/10 transition-colors",
                i === 5 && "border-l border-cream-dark/20 ml-1 pl-2.5"
              )}
            >
              <Icon size={16} />
            </button>
          ))}
          <span className="ml-auto text-[10px] text-navy-400 hidden sm:inline pr-1">
            Select text, then tap a style
          </span>
        </div>
        <textarea
          ref={ref}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder || "Write here… select text and use H1/H2/H3 for headings"}
          className="w-full px-4 py-2.5 text-sm bg-transparent focus:outline-none transition-all text-navy-900 placeholder:text-navy-400 resize-vertical min-h-[120px]"
        />
      </div>
    </div>
  );
}
