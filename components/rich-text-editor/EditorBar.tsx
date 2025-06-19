import { type Editor } from "@tiptap/react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, Bold, Heading1, Heading2, Heading3, Italic, List, ListOrdered, RedoIcon, Strikethrough, UndoIcon } from "lucide-react";
import { cn } from "@/lib/utils"
import { Button } from "../ui/button";

interface EditorBarProps {
    editor: Editor | null;
}

export function EditorBar({ editor }: EditorBarProps) {

    if (!editor) return null;


    return (
        <div className="border border-t-0 border-x-0 rounded-t-lg p-2 bg-card flex flex-wrap gap-1 items-center">
            <TooltipProvider>
                <div className="flex flex-wrap gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive('bold')} onPressedChange={() => editor.chain().focus().toggleBold().run()} className={cn(
                                editor.isActive('bold') && 'bg-primary text-primary-foreground'
                            )}>
                                <Bold />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Bold
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive('italic')} onPressedChange={() => editor.chain().focus().toggleItalic().run()} className={cn(
                                editor.isActive('italic') && 'bg-primary text-primary-foreground'
                            )}>
                                <Italic />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Italic
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive('strike')} onPressedChange={() => editor.chain().focus().toggleStrike().run()} className={cn(
                                editor.isActive('strike') && 'bg-primary text-primary-foreground'
                            )}>
                                <Strikethrough />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Strike
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive('heading', { level: 1 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={cn(
                                editor.isActive('heading', { level: 1 }) && 'bg-primary text-primary-foreground'
                            )}>
                                <Heading1 />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Heading 1
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive('heading', { level: 2 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={cn(
                                editor.isActive('heading', { level: 2 }) && 'bg-primary text-primary-foreground'
                            )}>
                                <Heading2 />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Heading 2
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive('heading', { level: 3 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={cn(
                                editor.isActive('heading', { level: 3 }) && 'bg-primary text-primary-foreground'
                            )}>
                                <Heading3 />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Heading 3
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive('bulletList')} onPressedChange={() => editor.chain().focus().toggleBulletList().run()} className={cn(
                                editor.isActive('bulletList') && 'bg-primary text-primary-foreground'
                            )}>
                                <List />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Bullet List
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive('orderedList')} onPressedChange={() => editor.chain().focus().toggleOrderedList().run()} className={cn(
                                editor.isActive('orderedList') && 'bg-primary text-primary-foreground'
                            )}>
                                <ListOrdered />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Ordered List
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className="w-px h-6 bg-border mx-2" />
                <div className="flex flex-wrap gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive({ textAlign: 'left' })} onPressedChange={() => editor.chain().focus().setTextAlign('left').run()} className={cn(
                                editor.isActive({ textAlign: 'left' }) && 'bg-primary text-primary-foreground'
                            )}>
                                <AlignLeftIcon />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Left Align
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive({ textAlign: 'center' })} onPressedChange={() => editor.chain().focus().setTextAlign('center').run()} className={cn(
                                editor.isActive({ textAlign: 'center' }) && 'bg-primary text-primary-foreground'
                            )}>
                                <AlignCenterIcon />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Center Align
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive({ textAlign: 'right' })} onPressedChange={() => editor.chain().focus().setTextAlign('right').run()} className={cn(
                                editor.isActive({ textAlign: 'right' }) && 'bg-primary text-primary-foreground'
                            )}>
                                <AlignRightIcon />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Right Align
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className="w-px h-6 bg-border mx-2" />
                <div className="flex flex-wrap gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="sm" variant="ghost" type="button"
                                onClick={() => editor.chain().focus().undo().run()}
                                disabled={!editor.can().undo()}
                            >
                                <UndoIcon />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Undo
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="sm" variant="ghost" type="button"
                                onClick={() => editor.chain().focus().redo().run()}
                                disabled={!editor.can().redo()}
                            >
                                <RedoIcon />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Redo
                        </TooltipContent>
                    </Tooltip>
                </div>
            </TooltipProvider>
        </div>
    )
} 