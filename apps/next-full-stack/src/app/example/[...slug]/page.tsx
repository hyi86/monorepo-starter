'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@monorepo-starter/ui/components/empty';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ExampleNotFound() {
  const pathname = usePathname();

  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>Example 페이지를 찾을 수 없습니다</EmptyTitle>
        <EmptyDescription>요청하신 Example 페이지가 존재하지 않거나 이동되었습니다.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="space-y-2">
        <p className="text-muted-foreground text-sm">
          <strong>요청된 경로:</strong> {pathname}
        </p>
        <Button asChild>
          <Link href="/example">Example 홈으로 돌아가기</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">메인 페이지로 돌아가기</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
