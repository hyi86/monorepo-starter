'use client';

import { CodeBlockClient } from '~/shared/ui/shiki/code-block-client';

export function PreviewProvider({ children, code }: { children: React.ReactNode; code: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div>{children}</div>
      <div>
        <CodeBlockClient code={code} />
      </div>
    </div>
  );
}
