import { CodeBlock } from '~/common/ui/shiki/code-block.client';

export default function Page() {
  const code = 'const loader = "Loading...";';

  return (
    <div>
      <h1>Code Highlight JSX</h1>
      <CodeBlock code={code} />
    </div>
  );
}
