'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Input } from '@monorepo-starter/ui/components/input';
import { useState } from 'react';
import { useWebPush } from '~/features/web-push/model/web-push.context';

export default function WebPushControlsPage() {
  const [message, setMessage] = useState('');
  const {
    registration,
    subscription,
    subscribeToNotifications,
    unsubscribeFromNotifications,
    sendPush,
    subscribeLoading,
    unsubscribeLoading,
    sendPushLoading,
  } = useWebPush();

  const handleSendPush = (iconPath?: string) => async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await sendPush({ title: '기본 아이콘', body: message, icon: iconPath });
    setMessage('');
  };

  if (!registration) {
    return (
      <div className="not-prose p-8">
        <p>Service Worker is not registered</p>
      </div>
    );
  }

  return (
    <div className="not-prose flex flex-col gap-2 p-8">
      <h1>Simple Web Push Example</h1>
      <div className="flex gap-2">
        <Button
          onClick={async () => {
            await subscribeToNotifications();
          }}
          disabled={subscribeLoading || !!subscription}
        >
          {subscribeLoading ? 'Subscribing...' : 'Subscribe'}
        </Button>
        <Button
          onClick={async () => {
            await unsubscribeFromNotifications();
          }}
          disabled={unsubscribeLoading || !subscription}
        >
          {unsubscribeLoading ? 'Unsubscribing...' : 'Unsubscribe'}
        </Button>
      </div>
      <div className="flex gap-2">
        <Input
          className="flex-1"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSendPush()} disabled={sendPushLoading}>
          {sendPushLoading ? 'Sending...' : 'Send Push(No Icon)'}
        </Button>
        <Button onClick={handleSendPush('/images/angry-face.png')} disabled={sendPushLoading}>
          {sendPushLoading ? 'Sending...' : 'Send Push(Icon)'}
        </Button>
      </div>
    </div>
  );
}
