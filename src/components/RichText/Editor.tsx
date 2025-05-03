'use client';

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';

import { HiOutlineBold } from 'react-icons/hi2';
import { FaItalic } from 'react-icons/fa';
import {
  MdCode,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdOutlineFormatQuote,
  MdOutlineFormatUnderlined,
} from 'react-icons/md';
import { BsTypeH2 } from 'react-icons/bs';

type Props = {
  value: string;
  onChange: (html: string) => void;
};

const Editor = ({ value, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // نوقف heading في StarterKit لتفادي التكرار
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Underline,
    ],
    content: value,
  });

  useEffect(() => {
    if (!editor) return;
    editor.on('update', () => {
      const html = editor.getHTML();
      onChange(html);
    });
  }, [editor, onChange]);

  if (!editor) return null;

  return (
    <div className="space-y-4">
      <style jsx>{`
        .ProseMirror ul {
          list-style: disc;
          margin: 1em 0;
          padding-left: 2em;
        }
        .ProseMirror li {
          margin-bottom: 0.5em;
        }
      `}</style>

      <div className="h-[200px] min-h-[200px]">
        <EditorContent
          editor={editor}
          className="w-full h-full rounded-md border-2 p-2"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-blue-500 text-white p-2 rounded-md' : 'p-2 bg-gray-300 rounded-md'}
        >
          <HiOutlineBold />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ?  'bg-blue-500 text-white p-2 rounded-md' : 'p-2 bg-gray-300 rounded-md'}
        >
          <FaItalic />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ?  'bg-blue-500 text-white p-2 rounded-md' : 'p-2 bg-gray-300 rounded-md'}
        >
          <MdOutlineFormatUnderlined />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ?  'bg-blue-500 text-white p-2 rounded-md' : 'p-2 bg-gray-300 rounded-md'}
        >
          <BsTypeH2 />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-blue-500 text-white p-2 rounded-md' : 'p-2 bg-gray-300 rounded-md'}
        >
          <MdFormatListBulleted />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ?  'bg-blue-500 text-white p-2 rounded-md' : 'p-2 bg-gray-300 rounded-md'}
        >
          <MdFormatListNumbered />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ?  'bg-blue-500 text-white p-2 rounded-md' : 'p-2 bg-gray-300 rounded-md'}
        >
          <MdOutlineFormatQuote />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ?  'bg-blue-500 text-white p-2 rounded-md' : 'p-2 bg-gray-300 rounded-md'}
        >
          <MdCode />
        </button>
      </div>
    </div>
  );
};

export default Editor;
