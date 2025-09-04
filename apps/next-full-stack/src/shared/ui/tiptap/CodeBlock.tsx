'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@monorepo-starter/ui/components/dropdown-menu';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { ChevronDownIcon, Code2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

// 지원되는 언어 목록 (일부 주요 언어만 포함)
const supportedLanguages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'jsx', label: 'JSX' },
  { value: 'tsx', label: 'TSX' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'scss', label: 'SCSS' },
  { value: 'json', label: 'JSON' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'scala', label: 'Scala' },
  { value: 'sql', label: 'SQL' },
  { value: 'bash', label: 'Bash' },
  { value: 'shell', label: 'Shell' },
  { value: 'yaml', label: 'YAML' },
  { value: 'toml', label: 'TOML' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'xml', label: 'XML' },
  { value: 'diff', label: 'Diff' },
  { value: 'plaintext', label: 'Plain Text' },
];

export function CodeBlockBlock({ editor }: { editor: any }) {
  const [open, setOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('');

  // 에디터 상태 변화를 실시간으로 감지
  useEffect(() => {
    const updateLanguage = () => {
      if (editor.isActive('codeBlock')) {
        const language = editor.getAttributes('codeBlock').language || 'plaintext';
        setCurrentLanguage(language);
      } else {
        setCurrentLanguage('');
      }
    };

    updateLanguage();
    const onUpdate = () => updateLanguage();
    editor.on('update', onUpdate);
    editor.on('selectionUpdate', onUpdate);

    return () => {
      editor.off('update', onUpdate);
      editor.off('selectionUpdate', onUpdate);
    };
  }, [editor]);

  const handleAddCodeBlock = (lang: string) => {
    editor.chain().focus().setCodeBlock({ language: lang }).run();
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant={currentLanguage ? 'outline' : 'ghost'} className="flex items-center gap-2">
          <Code2Icon className="size-4" />
          <ChevronDownIcon className="size-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {supportedLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            onClick={() => handleAddCodeBlock(lang.value)}
            className={cn(currentLanguage === lang.value && 'bg-muted font-bold')}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
