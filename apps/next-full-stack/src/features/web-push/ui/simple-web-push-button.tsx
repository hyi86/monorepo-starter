'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { useWebPush } from '~/features/web-push/lib/web-push-context';

export function SimpleWebPushButton() {
  const { sendPush, subscription } = useWebPush();

  const handleWorkStart = async () => {
    if (subscription) {
      await sendPush({ title: '작업완료 알림', body: `작업이 완료되었습니다` });
    }
  };

  return <Button onClick={handleWorkStart}>작업시작</Button>;
}

SimpleWebPushButton.displayName = 'SimpleWebPushButton';
