'use client';

import { CodeEditorWithoutState } from '@monorepo-starter/ui/blocks/code-editor/editor-without-state';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@monorepo-starter/ui/components/dialog';
import { ScrollArea, ScrollBar } from '@monorepo-starter/ui/components/scroll-area';
import { copyToClipboard } from '@monorepo-starter/ui/hooks/copy-clipboard';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getCodeFromFile, openInEditor, saveCodeToFile } from '~/actions/cli-actions';
import { appPathRoutes } from '~/app-path-types';
import { ComponentHierarchy } from './component-hierarchy';

export function ComponentInfoPanel() {
  const [openComponentInfoPanel, setOpenComponentInfoPanel] = useState(false);
  const [openCodeEditor, setOpenCodeEditor] = useState(false);

  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [sourceCode, setSourceCode] = useState('');
  const [language, setLanguage] = useState<'typescript' | 'javascript' | 'json' | 'yaml' | 'mdx'>('typescript');

  const pathname = usePathname();
  const currentRouteStructure = appPathRoutes.find((route) => route.href === pathname);

  // 사용중인 IDE로 코드 열기
  const handleOpenInIde = (path: string) => () => {
    openInEditor(path);
  };

  // 웹에디터 모달 열기
  const handleOpenInWebEditor = (path: string) => async () => {
    const code = await getCodeFromFile(path);
    if (!code) return;

    setSelectedPath(path);
    setOpenCodeEditor(true);
    setSourceCode(code);
  };

  // 경로 복사
  const handleCopyToClipboardPath = (path: string) => () => {
    copyToClipboard(path);
    toast.success('Path copied to clipboard', { duration: 1000 });
  };

  // 소스코드 복사
  const handleCopyToClipboardSourceCode = (path: string) => async () => {
    const code = await getCodeFromFile(path);
    if (!code) return;

    copyToClipboard(code);
    toast.success('Source code copied to clipboard', { duration: 1000 });
  };

  // 코드 수정 저장
  const handleSaveCode = async () => {
    if (!selectedPath) return;
    await saveCodeToFile(selectedPath, sourceCode);
    toast.success('Source code saved', { duration: 1000 });
    const code = await getCodeFromFile(selectedPath);
    setSourceCode(code || '');
  };

  // 명령어 키 이벤트 핸들러
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // 개발자 도구 키 조합 먼저 실행
      if (e.key === 'i' && (e.metaKey || e.ctrlKey) && e.altKey) {
        return;
      }

      // 개발도구 모달 토글
      if (e.key === 'i' && (e.metaKey || e.ctrlKey) && !e.shiftKey) {
        e.preventDefault();
        setOpenComponentInfoPanel((open) => !open);
        return;
      }

      // ESC 키 코드 수정 모달 닫기 방지
      if (e.key === 'Escape' && openCodeEditor) {
        console.log('Escape key pressed');
        e.preventDefault();
        return;
      }

      // 코드 수정 저장
      if (e.key === 's' && (e.metaKey || e.ctrlKey) && openCodeEditor) {
        e.preventDefault();
        handleSaveCode();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [openComponentInfoPanel, openCodeEditor, handleSaveCode]);

  useEffect(() => {
    if (selectedPath) {
      const language = selectedPath.split('.').pop();
      if (language === 'tsx') {
        setLanguage('typescript');
      } else if (language === 'jsx') {
        setLanguage('javascript');
      } else if (language === 'json') {
        setLanguage('json');
      } else if (language === 'yaml') {
        setLanguage('yaml');
      } else if (language === 'mdx') {
        setLanguage('mdx');
      }
    }
  }, [selectedPath]);

  return (
    <>
      <Dialog open={openComponentInfoPanel} onOpenChange={setOpenComponentInfoPanel}>
        <DialogContent className="max-h-[calc(100vh-15rem)] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>컴포넌트 정보</DialogTitle>
            <DialogDescription>현재 경로의 파일, 컴포넌트에 대한 상세한 정보를 확인할 수 있습니다</DialogDescription>
          </DialogHeader>
          {currentRouteStructure ? (
            <div>
              <h3 className="text-muted-foreground mb-2 font-semibold">Next Page Hierarchy</h3>
              <ScrollArea className="w-full max-w-[calc(--spacing(42*4)-3.25rem)]">
                <div className="border-muted-foreground/20 w-full rounded border bg-stone-800 p-4 font-mono text-xs leading-5 tracking-normal *:border-l-0">
                  {currentRouteStructure.structures && (
                    <ComponentHierarchy
                      structures={currentRouteStructure.structures}
                      onOpenInIde={handleOpenInIde}
                      onOpenInWebEditor={handleOpenInWebEditor}
                      onCopyToClipboardPath={handleCopyToClipboardPath}
                      onCopyToClipboardSourceCode={handleCopyToClipboardSourceCode}
                    />
                  )}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          ) : (
            <div>
              <p>No component info</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={openCodeEditor} onOpenChange={setOpenCodeEditor}>
        <DialogContent
          className="max-h-[calc(100vh-10rem)] overflow-y-auto sm:max-w-3xl"
          onEscapeKeyDown={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle className="font-mono">{selectedPath}</DialogTitle>
            <DialogDescription>코드 수정 후 Ctrl + S 입력하면 저장됩니다</DialogDescription>
          </DialogHeader>
          <CodeEditorWithoutState language={language} code={sourceCode} setCode={setSourceCode} />
        </DialogContent>
      </Dialog>
    </>
  );
}
