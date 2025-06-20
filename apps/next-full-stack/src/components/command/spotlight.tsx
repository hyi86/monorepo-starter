'use client';

import { CodeEditor } from '@monorepo-starter/ui/blocks/code-editor/editor';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@monorepo-starter/ui/components/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@monorepo-starter/ui/components/dialog';
import { ScrollArea, ScrollBar } from '@monorepo-starter/ui/components/scroll-area';
import { copyToClipboard } from '@monorepo-starter/ui/hooks/copy-clipboard';
import { trainCase } from 'change-case';
import { ChevronRight, InfoIcon, MoonIcon, Sidebar, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getCodeFromFilePath, openInEditor, saveCodeToFile } from '~/actions/cli-actions';
import { appPathRoutes } from '~/app-path-types';
import { ComponentHierarchy } from './component-hierarchy';

export function Spotlight() {
  const [openCommandDialog, setOpenCommandDialog] = useState(false);
  const [openComponentInfoPanel, setOpenComponentInfoPanel] = useState(false);
  const [openCodeEditor, setOpenCodeEditor] = useState(false);
  const [sourceCode, setSourceCode] = useState('');
  const [search, setSearch] = useState('');
  const [selectedPath, setSelectedPath] = useState('');
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const allRoutes = appPathRoutes.map((item) => {
    let name = item.href.split('/').at(-2);
    if (item.href === '/') {
      name = 'Home';
    }

    return {
      name,
      path: item.href,
      hasPath: item.href !== null,
    };
  });

  const currentRouteStructure = appPathRoutes.find((route) => route.href === pathname);

  // 사이드바 토글(강제 키 이벤트 발생)
  const handleToggleSidebar = () => {
    const event = new KeyboardEvent('keydown', { key: 'b', metaKey: true, bubbles: true });
    document.dispatchEvent(event);
  };

  // 테마 변경
  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // 컴포넌트 정보 보기
  const handleViewComponentInfo = () => {
    setOpenCommandDialog(false);
    setOpenComponentInfoPanel(true);
  };

  // IDE 열기
  const handleOpenInIde = (path: string) => () => {
    openInEditor(path);
  };

  // 웹에디터 모달 열기
  const handleOpenInWebEditor = (path: string) => async () => {
    const code = await getCodeFromFilePath(path);
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
    const code = await getCodeFromFilePath(path);
    if (!code) return;

    copyToClipboard(code);
    toast.success('Source code copied to clipboard', { duration: 1000 });
  };

  // 코드 수정 저장
  const handleSaveCode = () => {
    if (!selectedPath) return;
    saveCodeToFile(selectedPath, sourceCode);
  };

  // 링크 이동
  const handleGoToPage = (path: string) => {
    router.push(path);
    setOpenCommandDialog(false);
  };

  // 커멘드 필터링
  const handleFilterCommand = (value: string, search: string) => {
    if (value.includes(search)) return 1;
    return 0;
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

      // 커멘트 모달 토글
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenCommandDialog((open) => !open);
      }

      // 테마 변경 토글
      if (e.key === 'e' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleToggleTheme();
      }

      // 코드 수정 저장
      if (e.key === 's' && (e.metaKey || e.ctrlKey) && openCodeEditor) {
        e.preventDefault();
        handleSaveCode();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [handleToggleTheme, handleToggleSidebar, openCodeEditor, handleSaveCode]);

  // Spotlight 모달 닫힐 때 검색어 초기화
  useEffect(() => {
    if (openCommandDialog) {
      setSearch('');
    }
  }, [openCommandDialog]);

  return (
    <>
      <Dialog open={openCommandDialog} onOpenChange={setOpenCommandDialog}>
        <DialogHeader className="sr-only">
          <DialogTitle>Search documentation</DialogTitle>
          <DialogDescription>Search for a command to run...</DialogDescription>
        </DialogHeader>
        <DialogContent className="overflow-hidden p-0">
          <Command
            filter={handleFilterCommand}
            className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
          >
            <CommandInput placeholder="Type a command or search..." value={search} onValueChange={setSearch} />
            <CommandList>
              {allRoutes.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
              {search.length > 0 && (
                <CommandGroup heading="Links">
                  {allRoutes
                    .filter((result) => result.hasPath)
                    .map((result) => {
                      const parent = result.path && result.path.split('/').at(-2);
                      return (
                        <CommandItem key={result.path} value={result.path || ''} onSelect={handleGoToPage}>
                          {parent && <span className="text-foreground/60">{parent}</span>}
                          <span className="size-3.5">
                            <ChevronRight className="!size-3.5" strokeWidth={2} />
                          </span>
                          <span className="text-foreground">{trainCase(result.name || '')}</span>
                        </CommandItem>
                      );
                    })}
                </CommandGroup>
              )}

              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem onSelect={handleToggleSidebar}>
                  <Sidebar />
                  <span>Toggle sidebar</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={handleToggleTheme}>
                  {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                  <span>Toggle theme</span>
                  <CommandShortcut>⌘E</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={handleViewComponentInfo}>
                  <InfoIcon />
                  <span>View Component info</span>
                  <CommandShortcut>⌘I</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
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
        <DialogContent className="sm:max-w-[57rem]">
          <DialogHeader>
            <DialogTitle className="font-mono text-sm">Code Editor</DialogTitle>
            <DialogDescription aria-hidden="true" aria-label="Code Editor Modal">
              코드 수정은 development 모드에서만 가능합니다.
            </DialogDescription>
          </DialogHeader>
          <CodeEditor language="typescript" onChange={setSourceCode}>
            {sourceCode}
          </CodeEditor>
        </DialogContent>
      </Dialog>
    </>
  );
}
