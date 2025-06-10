'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { useWebPush } from '~/lib/push/web-push-provider';

export default function WebPushSimplePage() {
  const { sendPush, subscription } = useWebPush();

  const handleWorkStart = async () => {
    if (subscription) {
      await sendPush({ title: '작업완료 알림', body: `작업이 완료되었습니다` });
    }
  };

  return (
    <div>
      <h1>기본 사용법</h1>
      <Button onClick={handleWorkStart}>작업시작</Button>
    </div>
  );
}
