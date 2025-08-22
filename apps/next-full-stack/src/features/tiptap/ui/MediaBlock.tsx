'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Input } from '@monorepo-starter/ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@monorepo-starter/ui/components/popover';
import { Toggle } from '@monorepo-starter/ui/components/toggle';
import { type Editor } from '@tiptap/react';
import { ChevronDownIcon, ImagePlusIcon, SaveIcon, VideoIcon } from 'lucide-react';
import { useState } from 'react';

export function MediaBlock({ editor }: { editor: Editor }) {
  const [youtubeUrl, setYoutubeUrl] = useState('');

  // add youtube
  const handleAddYoutube = () => {
    editor.commands.setYoutubeVideo({
      src: youtubeUrl,
      width: 640,
      height: 480,
    });
    setYoutubeUrl('');
  };

  // add image
  const handleAddImage = () => {
    editor.commands.insertImagePlaceholder();
  };

  return (
    <>
      <Button variant="ghost" onClick={handleAddImage}>
        <ImagePlusIcon className="size-4" />
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Toggle pressed={editor.isActive('youtube')}>
            <VideoIcon className="size-4" />
            <ChevronDownIcon className="size-3 opacity-50" />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          side="bottom"
          sideOffset={1}
          alignOffset={-1}
          className="flex flex-col items-start gap-4"
        >
          <Input
            type="text"
            placeholder="영상 링크 입력"
            className="w-full"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && youtubeUrl.trim().length > 0) {
                handleAddYoutube();
                e.preventDefault();
              }
            }}
          />
          <div className="flex w-full items-center justify-end gap-2">
            <Button variant="outline" size="sm" disabled={youtubeUrl.trim().length < 1} onClick={handleAddYoutube}>
              <SaveIcon className="size-4" /> 저장
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
