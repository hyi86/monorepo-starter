'use client';

import { copyToClipboard } from '@monorepo-starter/ui/hooks/copy-clipboard';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';

import { BashIcon } from './icon-bash';
import { CssIcon } from './icon-css';
import { HtmlIcon } from './icon-html';
import { NextIcon } from './icon-next';
import { TsIcon } from './icon-ts';
import { JsonIcon } from './icon.json';

export function CodeHeader({ fileName, lang, code }: { fileName: string; lang: string; code: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard(code);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  if (lang !== 'bash' && !fileName) {
    return null;
  }

  return (
    <div className="bg-muted flex items-center gap-2 border-b px-4 py-3 text-sm">
      <span>{matchIcon(lang, fileName)}</span>
      <span className="text-foreground/70">{lang === 'bash' ? 'Terminal' : fileName}</span>
      <span className="ml-auto">
        {isCopied ? (
          <CheckIcon size={16} strokeWidth={1.5} className="cursor-pointer text-green-600 dark:text-green-400" />
        ) : (
          <CopyIcon size={16} strokeWidth={1.5} className="cursor-pointer" onClick={handleCopy} />
        )}
      </span>
    </div>
  );
}

function matchIcon(lang: string, fileName: string) {
  if (lang === 'bash') {
    return <BashIcon className="size-4 text-blue-700 dark:text-blue-400 dark:opacity-70" />;
  }

  if (fileName.match(/\.json$/)) {
    return <JsonIcon className="size-4 dark:opacity-70" />;
  }

  if (fileName.match(/next\.config\.(ts|js|mjs)/)) {
    return <NextIcon className="size-4 dark:opacity-70" />;
  }

  if (lang === 'ts' || lang === 'tsx') {
    return <TsIcon className="size-4 dark:opacity-70" />;
  }
  if (lang === 'html') {
    return <HtmlIcon className="size-4 dark:opacity-70" />;
  }
  if (lang === 'css') {
    return <CssIcon className="size-4 dark:opacity-70" />;
  }
  if (lang === 'bash') {
    return <BashIcon className="size-4 dark:opacity-70" />;
  }
}
