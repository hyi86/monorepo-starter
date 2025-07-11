'use client';

import Image from '@tiptap/extension-image';
import { NodeViewContent, type NodeViewProps, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { AlignCenter, AlignLeft, AlignRight, Columns2, Copy, Maximize, MoreVertical, Trash } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@monorepo-starter/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@monorepo-starter/ui/components/dropdown-menu';
import { Separator } from '@monorepo-starter/ui/components/separator';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { Editor } from '@tiptap/core';

export const ImageExtension = Image.extend({
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: '100%',
      },
      height: {
        default: null,
      },
      align: {
        default: 'center',
      },
    };
  },

  addNodeView: () => {
    return ReactNodeViewRenderer(TiptapImage);
  },
});

function TiptapImage({ node, editor, selected, deleteNode, updateAttributes }: NodeViewProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const [resizing, setResizing] = useState(false);
  const [resizingPosition, setResizingPosition] = useState<'left' | 'right'>('left');
  const [resizeInitialWidth, setResizeInitialWidth] = useState(0);
  const [resizeInitialMouseX, setResizeInitialMouseX] = useState(0);
  const [openedMore, setOpenedMore] = useState(false);

  const handleResizingPosition = (position: 'left' | 'right') => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    startResize(e);
    setResizingPosition(position);
  };

  const startResize = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    setResizing(true);

    setResizeInitialMouseX(event.clientX);
    if (imageRef.current) {
      setResizeInitialWidth(imageRef.current.offsetWidth);
    }
  };

  const resize = (event: MouseEvent) => {
    if (!resizing) {
      return;
    }

    let dx = event.clientX - resizeInitialMouseX;
    if (resizingPosition === 'left') {
      dx = resizeInitialMouseX - event.clientX;
    }

    const newWidth = Math.max(resizeInitialWidth + dx, 150); // Minimum width: 150
    const parentWidth = nodeRef.current?.parentElement?.offsetWidth || 0; // Get the parent element's width

    if (newWidth < parentWidth) {
      updateAttributes({
        width: newWidth,
      });
    }
  };

  const endResize = () => {
    setResizing(false);
    setResizeInitialMouseX(0);
    setResizeInitialWidth(0);
  };

  const handleTouchStart = (position: 'left' | 'right') => (event: React.TouchEvent) => {
    event.preventDefault();

    if (!event.touches[0]) {
      return;
    }

    setResizing(true);
    setResizingPosition(position);

    setResizeInitialMouseX(event.touches[0].clientX);
    if (imageRef.current) {
      setResizeInitialWidth(imageRef.current.offsetWidth);
    }
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (!resizing) {
      return;
    }

    if (!event.touches[0]) {
      return;
    }

    let dx = event.touches[0].clientX - resizeInitialMouseX;
    if (resizingPosition === 'left') {
      dx = resizeInitialMouseX - event.touches[0].clientX;
    }

    const newWidth = Math.max(resizeInitialWidth + dx, 150);
    const parentWidth = nodeRef.current?.parentElement?.offsetWidth || 0;

    if (newWidth < parentWidth) {
      updateAttributes({
        width: newWidth,
      });
    }
  };

  const handleTouchEnd = () => {
    setResizing(false);
    setResizeInitialMouseX(0);
    setResizeInitialWidth(0);
  };

  const duplicateContent = (editor: Editor) => {
    const { view } = editor;
    const { state } = view;
    const { selection } = state;

    editor
      .chain()
      .insertContentAt(selection.to, selection.content().content.firstChild?.toJSON(), {
        updateSelection: true,
      })
      .focus(selection.to)
      .run();
  };

  useEffect(() => {
    // Mouse events
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', endResize);
    // Touch events
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // Remove events on unmount
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', endResize);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [resizing, resizeInitialMouseX, resizeInitialWidth]);

  if (!editor) {
    return null;
  }

  return (
    <NodeViewWrapper
      ref={nodeRef}
      className={cn(
        'relative flex flex-col rounded border-2 border-transparent',
        selected ? 'border-blue-400 dark:border-blue-900' : '',
        node.attrs.align === 'left' && 'left-0 -translate-x-0',
        node.attrs.align === 'center' && 'left-1/2 -translate-x-1/2',
        node.attrs.align === 'right' && 'left-full -translate-x-full',
      )}
      style={{ width: node.attrs.width }}
    >
      <div className={cn('group relative flex flex-col rounded-md', resizing && '')}>
        <img
          ref={imageRef}
          src={node.attrs.src}
          alt={node.attrs.alt}
          title={node.attrs.title}
          className="m-0 h-auto w-full"
        />

        <NodeViewContent as="figcaption" className="m-0 text-center">
          {node.attrs.title}
        </NodeViewContent>

        {editor.isEditable && (
          <>
            <div
              aria-label="Resize left"
              className="absolute inset-y-0 z-20 flex w-[25px] cursor-col-resize items-center justify-start p-2"
              style={{ left: 0 }}
              onMouseDown={handleResizingPosition('left')}
              onTouchStart={handleTouchStart('left')}
            >
              <div className="h-18 bg-background z-20 w-1 rounded-xl border opacity-0 transition-all group-hover:opacity-100" />
            </div>
            <div
              aria-label="Resize right grip"
              className="absolute inset-y-0 z-20 flex w-[25px] cursor-col-resize items-center justify-end p-2"
              style={{ right: 0 }}
              onMouseDown={handleResizingPosition('right')}
              onTouchStart={handleTouchStart('right')}
            >
              <div className="h-18 bg-background z-20 w-1 rounded-xl border opacity-0 transition-all group-hover:opacity-100" />
            </div>

            <div
              className={cn(
                'bg-background absolute right-4 top-4 flex items-center gap-1 rounded-md border p-1 opacity-0 transition-opacity',
                !resizing && 'group-hover:opacity-100',
                openedMore && 'opacity-100',
              )}
            >
              <Button
                size="icon"
                className={cn('size-7', node.attrs.align === 'left' && 'bg-accent')}
                variant="ghost"
                onClick={() => {
                  updateAttributes({
                    align: 'left',
                  });
                }}
              >
                <AlignLeft className="size-4" />
              </Button>
              <Button
                size="icon"
                className={cn('size-7', node.attrs.align === 'center' && 'bg-accent')}
                variant="ghost"
                onClick={() => {
                  updateAttributes({
                    align: 'center',
                  });
                }}
              >
                <AlignCenter className="size-4" />
              </Button>
              <Button
                size="icon"
                className={cn('size-7', node.attrs.align === 'right' && 'bg-accent')}
                variant="ghost"
                onClick={() => {
                  updateAttributes({
                    align: 'right',
                  });
                }}
              >
                <AlignRight className="size-4" />
              </Button>
              <Separator orientation="vertical" className="h-[20px]" />
              <DropdownMenu
                open={openedMore}
                onOpenChange={(val) => {
                  setOpenedMore(val);
                }}
              >
                <DropdownMenuTrigger asChild>
                  <Button size="icon" className="size-7" variant="ghost">
                    <MoreVertical className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" alignOffset={-90} className="mt-1 text-sm">
                  <DropdownMenuItem
                    onClick={() => {
                      duplicateContent(editor);
                    }}
                  >
                    <Copy className="mr-2 size-4" /> Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      updateAttributes({
                        width: 'fit-content',
                      });
                    }}
                  >
                    <Maximize className="mr-2 size-4" /> Full Size
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      updateAttributes({
                        width: '50%',
                      });
                    }}
                  >
                    <Columns2 className="mr-2 size-4" /> Half Size
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => {
                      deleteNode();
                    }}
                  >
                    <Trash className="mr-2 size-4" /> Delete Image
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>
    </NodeViewWrapper>
  );
}
