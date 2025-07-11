'use client';

import { Skeleton } from '@monorepo-starter/ui/components/skeleton';
import { Textarea } from '@monorepo-starter/ui/components/textarea';
import { EditorContent, useEditor } from '@tiptap/react';
import prettierHtml from 'prettier/plugins/html';
import prettier from 'prettier/standalone';
import { useEffect, useState } from 'react';
import { extensions } from '~/lib/tiptap/extensions';
import { WysiwygToolbar } from '~/lib/tiptap/toolbar';

export default function WysiwygBasicPage() {
  const [content, setContent] = useState(
    /* html */ `
    <h2>Discover the riches of our editor ✨</h2>
    <blockquote>
      <p>
        Tiptap is so easy <span style="color: rgb(225, 162, 0)">to make</span>
        <code>rich-text-editor</code>
      </p>
    </blockquote>
    <p>
      <img
        class=""
        src="https://images.pexels.com/photos/32805822/pexels-photo-32805822.jpeg"
      />
    </p>
    <pre><code class="language-tsx">const tsx = () =&gt; {
      return (
        &lt;div&gt;Hello world&lt;/div&gt;
      )
    }</code></pre>    
    `.trim(),
  );
  const [code, setCode] = useState('');

  const editor = useEditor({
    editable: true,
    autofocus: true,
    immediatelyRender: false,
    extensions,
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'p-4 mt-8 focus-visible:outline-none max-w-xl mx-auto prose dark:prose-invert border rounded transition-all focus-visible:border-foreground/30 focus-visible:border focus-visible:ring-3 focus-visible:ring-foreground/10',
      },
    },
  });

  const handleBlur = () => {
    if (!editor) return;
    editor.commands.setContent(code);
  };

  useEffect(() => {
    const formatContent = async () => {
      const formatted = await prettier.format(content, {
        parser: 'html',
        plugins: [prettierHtml],
      });
      setCode(formatted);
    };
    formatContent();
  }, [content]);

  if (!editor) {
    return (
      <div>
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  return (
    <div className="relative">
      <WysiwygToolbar editor={editor} />
      <div className="flex items-start gap-2">
        <EditorContent className="flex-1" editor={editor} />
        <Textarea
          className="mt-8 w-full flex-1 font-mono"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={10}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}
