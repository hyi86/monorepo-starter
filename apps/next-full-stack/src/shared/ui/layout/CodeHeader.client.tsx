'use client';

import { copyToClipboard } from '@monorepo-starter/ui/hooks/copy-clipboard';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';

export function CodeHeader({ fileName, lang, code }: { fileName: string; lang: string; code: string }) {
  const [isCopied, setIsCopied] = useState(false);

  /**
   * 코드 복사
   */
  const handleCopy = () => {
    copyToClipboard(code);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  /**
   * 코드 헤더 렌더링
   */
  if (lang !== 'bash' && !fileName) {
    return null;
  }

  return (
    <div className="bg-muted flex items-center gap-2 border-b px-4 py-3 text-sm">
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
