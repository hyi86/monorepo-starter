'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Skeleton } from '@monorepo-starter/ui/components/skeleton';
import { Textarea } from '@monorepo-starter/ui/components/textarea';
import { EditorContent, useEditor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import prettierHtml from 'prettier/plugins/html';
import prettier from 'prettier/standalone';
import { useEffect, useState } from 'react';
import { TablesBlock } from '~/common/ui/tiptap/blocks/tables';
import { extensions } from '~/common/ui/tiptap/extensions';
import { WysiwygToolbar } from '~/common/ui/tiptap/toolbar';

const initialContent = `
<h2>Discover the riches of our editor ✨</h2>
<blockquote>
  <p>
    Tiptap is so easy <span style="color: rgb(225, 162, 0);">to make</span>
    <code>rich-text-editor</code>
  </p>
</blockquote>
<table style="min-width: 75px;">
  <colgroup>
    <col style="min-width: 25px;" />
    <col style="min-width: 25px;" />
    <col style="min-width: 25px;" />
  </colgroup>
  <tbody>
    <tr>
      <th colspan="1" rowspan="1"><p>1</p></th>
      <th colspan="1" rowspan="1"><p>2</p></th>
      <th colspan="1" rowspan="1"><p>3</p></th>
    </tr>
    <tr>
      <td colspan="1" rowspan="1"><p>6</p></td>
      <td colspan="1" rowspan="1"><p>7</p></td>
      <td colspan="1" rowspan="1"><p>8</p></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1"><p></p></td>
      <td colspan="1" rowspan="1"><p></p></td>
      <td colspan="1" rowspan="1"><p></p></td>
    </tr>
  </tbody>
</table>
<img
  src="https://images.pexels.com/photos/32805822/pexels-photo-32805822.jpeg"
  width="100%"
  align="center"
/>
<pre><code class="language-tsx">const tsx = () =&gt; {
  return (
    &lt;div&gt;Hello world&lt;/div&gt;
  )
}</code></pre>
<p></p>
`;

export default function WysiwygBasicPage() {
  const [content, setContent] = useState(initialContent.trim());
  const [isEditing, setIsEditing] = useState(false);
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
          'p-4 mt-4 focus-visible:outline-none mx-auto prose dark:prose-invert border rounded transition-all focus-visible:border-foreground/30 focus-visible:border focus-visible:ring-3 focus-visible:ring-foreground/10',
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
      <Button className="mb-4" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Edit Source' : 'Edit'}
      </Button>
      <BubbleMenu
        pluginKey="bubble-menu-tables"
        editor={editor}
        options={{ placement: 'bottom-start', strategy: 'fixed' }}
        shouldShow={({ editor }) => {
          return editor.isActive('table');
        }}
      >
        <div className="bg-background rounded border p-2 shadow">
          <TablesBlock editor={editor} isBubbleMenu />
        </div>
      </BubbleMenu>

      <WysiwygToolbar editor={editor} />

      <div className="flex items-start gap-2">
        <EditorContent className="flex-1" editor={editor} />
        {isEditing && (
          <Textarea
            className="mt-8 w-full flex-1 font-mono"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={10}
            onBlur={handleBlur}
          />
        )}
      </div>
    </div>
  );
}
