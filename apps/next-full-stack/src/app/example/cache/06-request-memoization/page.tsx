/**
 * Request Memoization 예제
 *
 * Next.js는 동일한 요청 내에서 같은 fetch 호출을 자동으로 메모이제이션합니다.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';

export const dynamic = 'force-dynamic';

async function fetchUserData() {
  const res = await fetch('https://api.github.com/users/vercel', {
    next: { revalidate: 60 },
  });
  return res.json();
}

export default async function RequestMemoizationPage() {
  // 같은 함수를 여러 번 호출해도 한 번만 실행됨
  const [user1, user2, user3] = await Promise.all([fetchUserData(), fetchUserData(), fetchUserData()]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Request Memoization</CardTitle>
          <CardDescription>Next.js는 동일한 요청 내에서 같은 fetch 호출을 자동으로 메모이제이션합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium">첫 번째 호출:</p>
            <pre className="bg-muted max-h-40 overflow-auto rounded-md p-3 text-sm">
              {JSON.stringify({ login: user1.login, id: user1.id }, null, 2)}
            </pre>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">두 번째 호출 (메모이제이션됨):</p>
            <pre className="bg-muted max-h-40 overflow-auto rounded-md p-3 text-sm">
              {JSON.stringify({ login: user2.login, id: user2.id }, null, 2)}
            </pre>
            <p className="text-muted-foreground mt-1 text-xs">✅ 동일한 데이터 (실제로는 한 번만 fetch됨)</p>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">세 번째 호출 (메모이제이션됨):</p>
            <pre className="bg-muted max-h-40 overflow-auto rounded-md p-3 text-sm">
              {JSON.stringify({ login: user3.login, id: user3.id }, null, 2)}
            </pre>
          </div>

          <div className="text-muted-foreground space-y-1 text-sm">
            <p>💡 동일한 요청 내에서 같은 fetch 호출은 자동으로 메모이제이션됩니다.</p>
            <p>💡 Promise.all()로 병렬 호출해도 실제로는 한 번만 실행됩니다.</p>
            <p>💡 이는 React의 cache()와 유사하지만 fetch에 특화된 기능입니다.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
