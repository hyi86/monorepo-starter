import { CodeBlockClient } from '~/shared/ui/shiki';

export default function Page() {
  const code = 'const loader = "Loading...";';

  return (
    <div>
      <h1>Code Highlight JSX</h1>
      <CodeBlockClient code={code} />
    </div>
  );
}
