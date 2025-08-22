'use client';

import { Jsx, toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Fragment, JSX, useLayoutEffect, useState } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { BundledLanguage } from 'shiki';
import { codeToHast } from 'shiki/bundle/web';
import { themes, transformers } from '~/common/config/code-block';

async function highlight(code: string, lang: BundledLanguage) {
  const out = await codeToHast(code, {
    lang,
    themes,
    transformers,
  });

  return toJsxRuntime(out, {
    Fragment,
    jsx: jsx as unknown as Jsx,
    jsxs: jsxs as unknown as Jsx,
  }) as unknown as JSX.Element;
}

export function CodeBlock({ code, initial }: { code: string; initial?: JSX.Element }) {
  const [nodes, setNodes] = useState(initial);

  useLayoutEffect(() => {
    void highlight(code, 'ts').then(setNodes);
  }, [code]);

  return nodes ?? <p>Loading...</p>;
}
