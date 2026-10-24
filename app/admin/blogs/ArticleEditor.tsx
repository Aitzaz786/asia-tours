"use client";

import { useEffect, type ReactNode } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyleKit } from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import {
  AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold,
  ChevronDown, Italic, Link2, List, ListOrdered, Pilcrow,
  Quote, Redo2, RemoveFormatting, Underline, Undo2, Unlink2,
} from "lucide-react";
import "./editor.css";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const initialHtml = (value: string) =>
  /<\/?(?:p|h[1-6]|ul|ol|table|blockquote)\b/i.test(value)
    ? value
    : value.split(/\n\s*\n/).map((paragraph) =>
        `<p>${paragraph.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`,
      ).join("");

function ToolButton({ label, children, onClick, active = false, disabled = false }: {
  label: string; children: ReactNode; onClick: () => void; active?: boolean; disabled?: boolean;
}) {
  return <button type="button" className="editor-tool" title={label} aria-label={label} aria-pressed={active} disabled={disabled} onClick={onClick}>{children}</button>;
}

function ToolGroup({ children }: { children: ReactNode }) {
  return <div className="editor-tool-group">{children}</div>;
}

export default function ArticleEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] }, link: { openOnClick: false } }),
      TextStyleKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CharacterCount,
    ],
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    content: initialHtml(value),
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: { attributes: { class: "article-richtext", role: "textbox", "aria-label": "Article body", "aria-multiline": "true" } },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(initialHtml(value), { emitUpdate: false });
  }, [value, editor]);

  if (!editor) return <div className="editor-loading">Loading editor…</div>;
  const activeEditor = editor;
  const headingValue = editor.isActive("heading") ? String(editor.getAttributes("heading").level) : "p";
  const fontSize = editor.getAttributes("textStyle").fontSize || "";

  function editLink() {
    const href = window.prompt("Paste a link", activeEditor.getAttributes("link").href || "https://");
    if (href === null) return;
    if (!href.trim()) { activeEditor.chain().focus().extendMarkRange("link").unsetLink().run(); return; }
    if (!/^(https?:\/\/|mailto:|tel:)/i.test(href)) { window.alert("Use a valid https://, mailto: or tel: link."); return; }
    activeEditor.chain().focus().extendMarkRange("link").setLink({ href }).run();
  }

  return <div className="article-editor">
    <div className="editor-toolbar" role="toolbar" aria-label="Article formatting">
      <ToolGroup>
        <ToolButton label="Undo" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}><Undo2 /></ToolButton>
        <ToolButton label="Redo" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}><Redo2 /></ToolButton>
      </ToolGroup>
      <ToolGroup>
        <Pilcrow className="editor-select-icon" aria-hidden="true" />
        <select className="editor-format-select" aria-label="Text style" value={headingValue} onChange={(event) => { const selected = event.target.value; if (selected === "p") editor.chain().focus().setParagraph().run(); else editor.chain().focus().setHeading({ level: Number(selected) as HeadingLevel }).run(); }}>
          <option value="p">Paragraph</option><option value="1">Heading 1</option><option value="2">Heading 2</option><option value="3">Heading 3</option><option value="4">Heading 4</option><option value="5">Heading 5</option><option value="6">Heading 6</option>
        </select><ChevronDown className="editor-select-chevron" aria-hidden="true" />
      </ToolGroup>
      <ToolGroup>
        <select className="editor-size-select" aria-label="Font size" value={fontSize} onChange={(event) => event.target.value ? editor.chain().focus().setFontSize(event.target.value).run() : editor.chain().focus().unsetFontSize().run()}>
          <option value="">Size</option>{[12, 14, 16, 18, 20, 24, 28, 32, 40, 48].map((size) => <option key={size} value={`${size}px`}>{size}</option>)}
        </select>
      </ToolGroup>
      <ToolGroup>
        <ToolButton label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold /></ToolButton>
        <ToolButton label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic /></ToolButton>
        <ToolButton label="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><Underline /></ToolButton>
      </ToolGroup>
      <ToolGroup>
        <label className="editor-color-tool" title="Text colour"><span>A</span><input aria-label="Text colour" type="color" value={editor.getAttributes("textStyle").color || "#202020"} onChange={(event) => editor.chain().focus().setColor(event.target.value).run()} /></label>
      </ToolGroup>
      <ToolGroup>
        <ToolButton label="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List /></ToolButton>
        <ToolButton label="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered /></ToolButton>
      </ToolGroup>
      <ToolGroup>
        <ToolButton label="Align left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}><AlignLeft /></ToolButton>
        <ToolButton label="Align centre" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}><AlignCenter /></ToolButton>
        <ToolButton label="Align right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}><AlignRight /></ToolButton>
        <ToolButton label="Justify" active={editor.isActive({ textAlign: "justify" })} onClick={() => editor.chain().focus().setTextAlign("justify").run()}><AlignJustify /></ToolButton>
      </ToolGroup>
      <ToolGroup>
        <ToolButton label="Link" active={editor.isActive("link")} onClick={editLink}><Link2 /></ToolButton>
        <ToolButton label="Remove link" disabled={!editor.isActive("link")} onClick={() => editor.chain().focus().unsetLink().run()}><Unlink2 /></ToolButton>
        <ToolButton label="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote /></ToolButton>
      </ToolGroup>
      <ToolGroup>
        <ToolButton label="Clear formatting" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}><RemoveFormatting /></ToolButton>
      </ToolGroup>
    </div>
    <div className="editor-workspace"><div className="editor-page"><EditorContent editor={editor} /></div></div>
    <div className="editor-footer"><span>{editor.storage.characterCount.words()} words</span><span>{editor.storage.characterCount.characters()} characters</span><span className="editor-save-note">Changes are saved with the article</span></div>
  </div>;
}
