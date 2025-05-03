'use client'
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

interface TiptapViewerProps {
    content: any 
  }

const TipTapViewer : React.FC<TiptapViewerProps>= ({content}) => {
  const editor = useEditor({
    extensions : [StarterKit],
    content,
    editable:false
  });
  if(!editor) return null;

    return (
    <EditorContent content={content} editor={editor} />
  )
}

export default TipTapViewer