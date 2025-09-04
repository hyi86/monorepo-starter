'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Input } from '@monorepo-starter/ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@monorepo-starter/ui/components/popover';
import { Toggle } from '@monorepo-starter/ui/components/toggle';
import { type Editor } from '@tiptap/react';
import { ChevronDownIcon, LinkIcon, SaveIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

export function LinkBlock({ editor }: { editor: Editor }) {
  const [linkUrl, setLinkUrl] = useState('');

  // link 제거
  const handleRemoveLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  // link 추가
  const handleAddLink = () => {
    if (linkUrl.trim().length < 1) return;

    let href = linkUrl;
    if (!href.startsWith('http')) {
      href = `https://${href}`;
    }

    editor.chain().focus().setLink({ href }).run();
    setLinkUrl('');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Toggle pressed={editor.isActive('link')}>
          <LinkIcon className="size-4" />
          <ChevronDownIcon className="size-3 opacity-50" />
        </Toggle>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={3}
        alignOffset={-172}
        className="flex flex-col items-start gap-4"
      >
        <Input
          type="text"
          placeholder="링크 입력"
          className="w-full"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && linkUrl.trim().length > 0) {
              handleAddLink();
              e.preventDefault();
            }
          }}
        />
        <div className="flex w-full items-center justify-end gap-2">
          <Button variant="outline" size="sm" disabled={linkUrl.trim().length < 1} onClick={handleAddLink}>
            <SaveIcon className="size-4" /> 저장
          </Button>
          <Button variant="ghost" size="sm" onClick={handleRemoveLink} disabled={!editor.isActive('link')}>
            <TrashIcon className="size-4" /> 링크 제거
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
