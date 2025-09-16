'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@monorepo-starter/ui/components/dropdown-menu';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { type Structure } from '~/route-types';

const classNames = {
  row: cn(`leading-4.5`),
  token: cn(`text-zinc-300`),
  component: cn(`text-yellow-200`),
  attrebuteName: cn(`text-orange-300/80`),
  link: cn(`text-green-500`),
};

export function ComponentHierarchy({
  structures = [],
  onOpenInIde,
  onOpenInWebEditor,
  onCopyToClipboardPath,
}: {
  structures: Structure[];
  onOpenInIde: (path: string) => () => void;
  onOpenInWebEditor: (path: string) => () => void;
  onCopyToClipboardPath: (path: string) => () => void;
}) {
  const LinkSpan = ({ path, children }: { path: string; children: React.ReactNode }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span className={classNames.link}>{children}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onOpenInIde(path)}>Open in IDE</DropdownMenuItem>
          <DropdownMenuItem onClick={onOpenInWebEditor(path)}>Open Code in Web Editor</DropdownMenuItem>
          <DropdownMenuItem onClick={onCopyToClipboardPath(path)}>Copy Path</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className={classNames.row}>
      {structures.map((structure) => {
        const path = structure.path;
        const dirName = path.replace('src/', '');
        const fileName = path.split('/').at(-1) || '';
        const baseName = fileName.split('.').at(0) || '';

        if (baseName === 'page') {
          return (
            <div key={path}>
              <OpenTag component="Page" selfClosing>
                <Attribute name="src" value={<LinkSpan path={path}>{dirName}</LinkSpan>} />
              </OpenTag>
            </div>
          );
        }

        if (baseName === 'layout') {
          return (
            <div key={path}>
              <OpenTag component="Layout">
                <Attribute name="src" value={<LinkSpan path={path}>{dirName}</LinkSpan>} />
              </OpenTag>
              <div className="pl-4">
                <ComponentHierarchy
                  structures={structure.children}
                  onOpenInIde={onOpenInIde}
                  onOpenInWebEditor={onOpenInWebEditor}
                  onCopyToClipboardPath={onCopyToClipboardPath}
                />
              </div>
              <CloseTag component="Layout" />
            </div>
          );
        }

        if (baseName === 'template') {
          return (
            <div key={path}>
              <OpenTag component="Template">
                <Attribute name="src" value={<LinkSpan path={path}>{dirName}</LinkSpan>} />
              </OpenTag>
              <div className="pl-4">
                <ComponentHierarchy
                  structures={structure.children}
                  onOpenInIde={onOpenInIde}
                  onOpenInWebEditor={onOpenInWebEditor}
                  onCopyToClipboardPath={onCopyToClipboardPath}
                />
              </div>
              <CloseTag component="Template" />
            </div>
          );
        }

        if (baseName === 'loading') {
          return (
            <div key={path}>
              <OpenTag component="Suspense">
                <Attribute
                  name="fallback"
                  valueType="object"
                  value={
                    <OpenTag component="Loading" selfClosing>
                      <Attribute name="src" value={<LinkSpan path={path}>{path}</LinkSpan>} />
                    </OpenTag>
                  }
                />
              </OpenTag>
              <div className="pl-4">
                <ComponentHierarchy
                  structures={structure.children}
                  onOpenInIde={onOpenInIde}
                  onOpenInWebEditor={onOpenInWebEditor}
                  onCopyToClipboardPath={onCopyToClipboardPath}
                />
              </div>
              <CloseTag component="Suspense" />
            </div>
          );
        }

        if (baseName === 'error') {
          return (
            <div key={path}>
              <OpenTag component="ErrorBoundary">
                <Attribute
                  name="fallback"
                  valueType="object"
                  value={
                    <OpenTag component="Error" selfClosing>
                      <Attribute name="src" value={<LinkSpan path={path}>{path}</LinkSpan>} />
                    </OpenTag>
                  }
                />
              </OpenTag>
              <div className="pl-4">
                <ComponentHierarchy
                  structures={structure.children}
                  onOpenInIde={onOpenInIde}
                  onOpenInWebEditor={onOpenInWebEditor}
                  onCopyToClipboardPath={onCopyToClipboardPath}
                />
              </div>
              <CloseTag component="ErrorBoundary" />
            </div>
          );
        }

        if (baseName === 'not-found') {
          return (
            <div key={path}>
              <OpenTag component="ErrorBoundary">
                <Attribute
                  name="fallback"
                  valueType="object"
                  value={
                    <OpenTag component="NotFound" selfClosing>
                      <Attribute name="src" value={<LinkSpan path={path}>{path}</LinkSpan>} />
                    </OpenTag>
                  }
                />
              </OpenTag>
              <div className="pl-4">
                <ComponentHierarchy
                  structures={structure.children}
                  onOpenInIde={onOpenInIde}
                  onOpenInWebEditor={onOpenInWebEditor}
                  onCopyToClipboardPath={onCopyToClipboardPath}
                />
              </div>
              <CloseTag component="ErrorBoundary" />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

function OpenTag({
  component,
  selfClosing = false,
  children = null,
}: {
  component: string;
  selfClosing?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="inline-flex whitespace-nowrap">
      <span className={classNames.token}>{`<`}</span>
      <span className={classNames.component}>{component}</span>
      {children}
      <span className={classNames.token}>{selfClosing ? '/>' : '>'}</span>
    </div>
  );
}

function CloseTag({ component }: { component: string }) {
  return (
    <div className="inline-flex whitespace-nowrap">
      <span className={classNames.token}>{`</`}</span>
      <span className={classNames.component}>{component}</span>
      <span className={classNames.token}>{`>`}</span>
    </div>
  );
}

function Attribute({
  name,
  value,
  valueType = 'string',
}: {
  name: string;
  value: React.ReactNode;
  valueType?: string;
}) {
  return (
    <div className="inline-flex pl-1">
      <span className={classNames.attrebuteName}>{name}</span>
      <span className={classNames.token}>=</span>
      <div className={cn(valueType === 'string' && `text-green-600`, valueType === 'object' && `text-blue-400`)}>
        {valueType === 'object' && '{ '}
        {valueType === 'string' && '"'}
        {value}
        {valueType === 'string' && '"'}
        {valueType === 'object' && ' }'}
      </div>
    </div>
  );
}
