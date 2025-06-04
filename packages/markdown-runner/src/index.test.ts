import { expect, test } from 'vitest';
import { parseMarkdown, parseMeta } from '~/lib/markdown';

const markdownContent = `
---
packagePrefix: "@monorepo-starter"
packageName: "markdown-runner"
---

# Hello, world!

~~~bash
echo "Hello, world!"
~~~

~~~ts filename="src/index.ts"
console.log("Hello, world!");
~~~

~~~ts filename="src/sample.ts" skip
console.log("Hello, world!!!");
~~~
`.trim();

test('parseMarkdown', async () => {
  const commands = await parseMarkdown(markdownContent);
  expect(commands).toHaveLength(2);
});

test('parseMeta', () => {
  const meta = 'filename="example.js" linenos';
  const result = parseMeta(meta);
  expect(result).toEqual({ filename: 'example.js', linenos: true });
});
