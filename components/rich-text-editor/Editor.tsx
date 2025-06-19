'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { EditorBar } from './EditorBar'
import TextAlign from '@tiptap/extension-text-align'

const RichTextEditor = ({ field }: { field: any }) => {
    const editor = useEditor({
        extensions: [StarterKit, TextAlign.configure({
            types: ['heading', 'paragraph'],
        })],
        editorProps: {
            attributes: {
                class: 'min-h-[300px] p-4 focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert !w-full !max-w-none'
            }
        },
        onUpdate: ({ editor}) => {
            field.onChange(JSON.stringify(editor.getJSON()))
        },
        content: field.value ? JSON.parse(field.value) : '<p>Hello World</p>',
        immediatelyRender: false,
    });

    return (
        <div className='w-full border border-input rounded-lg overflow-hidden dark:bg-input/30'>
            <EditorBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}

export default RichTextEditor
