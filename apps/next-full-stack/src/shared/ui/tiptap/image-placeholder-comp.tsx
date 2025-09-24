'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Input } from '@monorepo-starter/ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@monorepo-starter/ui/components/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@monorepo-starter/ui/components/tabs';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { NodeViewProps } from '@tiptap/core';
import { NodeViewWrapper } from '@tiptap/react';
import { ImageIcon, LinkIcon, UploadIcon } from 'lucide-react';
import { type FormEvent, useState } from 'react';

export function ImagePlaceholderComponent({ editor, extension, selected }: NodeViewProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isDragReject, setIsDragReject] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    setIsDragReject(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    setIsDragReject(false);

    const { files } = e.dataTransfer;
    const acceptedFiles: File[] = [];
    const rejectedFiles: File[] = [];

    Array.from(files).map((file) => {
      if (
        extension.options.allowedMimeTypes &&
        !Object.keys(extension.options.allowedMimeTypes).some((type) => file.type.match(type))
      ) {
        rejectedFiles.push(file);
      } else if (extension.options.maxSize && file.size > extension.options.maxSize) {
        rejectedFiles.push(file);
      } else {
        acceptedFiles.push(file);
      }
    });

    if (rejectedFiles.length > 0) {
      setIsDragReject(true);
      extension.options.onDropRejected?.(rejectedFiles, editor);
    }

    if (acceptedFiles.length > 0) {
      handleAcceptedFiles(acceptedFiles);
    }
  };

  const handleAcceptedFiles = (acceptedFiles: File[]) => {
    // acceptedFiles.map((file) => {
    //   const reader = new FileReader();

    //   reader.onload = () => {
    //     const src = reader.result as string;
    //     editor.chain().focus().setImage({ src }).run();
    //   };

    //   reader.readAsDataURL(file);
    // });

    if (extension.options.onDrop) {
      extension.options.onDrop(acceptedFiles, editor);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleAcceptedFiles(files);
  };

  const handleInsertEmbed = (e: FormEvent) => {
    e.preventDefault();
    const valid = url.startsWith('http');
    if (!valid) {
      setUrlError(true);
      return;
    }
    if (url !== '') {
      editor.chain().focus().setImage({ src: url }).run();
      extension.options.onEmbed(url, editor);
    }
  };

  return (
    <NodeViewWrapper className="w-full">
      <Popover modal open={open}>
        <PopoverTrigger
          onClick={() => {
            setOpen(true);
          }}
          asChild
          className="w-full"
        >
          <div
            className={cn(
              'bg-accent text-accent-foreground hover:bg-secondary flex cursor-pointer items-center gap-3 rounded-md p-2 py-3 text-sm transition-colors',
              selected && 'bg-primary/10 hover:bg-primary/20',
            )}
          >
            <ImageIcon className="h-6 w-6" />
            Add an image
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[450px] px-0 py-2"
          onPointerDownOutside={() => {
            setOpen(false);
          }}
          onEscapeKeyDown={() => {
            setOpen(false);
          }}
        >
          <Tabs defaultValue="upload" className="px-3">
            <TabsList>
              <TabsTrigger className="px-2 py-1 text-sm" value="upload">
                <UploadIcon className="mr-2 h-4 w-4" />
                Upload
              </TabsTrigger>
              <TabsTrigger className="px-2 py-1 text-sm" value="url">
                <LinkIcon className="mr-2 h-4 w-4" />
                Embed link
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={cn(
                  'my-2 rounded-md border border-dashed text-sm transition-colors',
                  isDragActive && 'border-primary bg-secondary',
                  isDragReject && 'border-destructive bg-destructive/10',
                  'hover:bg-secondary',
                )}
              >
                <input
                  type="file"
                  accept={Object.keys(extension.options.allowedMimeTypes || {}).join(',')}
                  multiple={extension.options.maxFiles !== 1}
                  onChange={handleFileInputChange}
                  className="hidden"
                  id="file-input"
                />
                <label
                  htmlFor="file-input"
                  className="flex h-28 w-full cursor-pointer flex-col items-center justify-center text-center"
                >
                  <UploadIcon className="mx-auto mb-2 h-6 w-6" />
                  Drag & drop or click to upload
                </label>
              </div>
            </TabsContent>
            <TabsContent value="url">
              <form onSubmit={handleInsertEmbed}>
                <Input
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    if (urlError) {
                      setUrlError(false);
                    }
                  }}
                  placeholder="Paste the image link..."
                />
                {urlError && <p className="text-danger-11 py-1.5 text-xs">Please enter a valid URL</p>}
                <Button onClick={handleInsertEmbed} type="button" size="sm" className="my-2 h-8 w-full p-2 text-xs">
                  Embed Image
                </Button>
                <p className="text-gray-11 text-center text-xs">Works with any image from the web</p>
              </form>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
    </NodeViewWrapper>
  );
}
