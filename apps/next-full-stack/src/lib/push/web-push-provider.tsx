'use client';

import { webLog } from '@henry-hong/common-utils/console-web';
import { createContext, ReactNode, useContext, useEffect, useState, useTransition } from 'react';
import type { PushSubscription } from 'web-push';
import { env } from '~/env';
import { sendPushNotificationAction, subscribeAction, unsubscribeAction } from './webpush-actions';

interface SendPushNotificationOptions {
  title: string;
  body: string;
  icon?: string;
}

interface WebPushContextType {
  subscription: PushSubscription | null;
  registration: ServiceWorkerRegistration | null;
  subscribeToNotifications: () => Promise<void>;
  unsubscribeFromNotifications: () => Promise<void>;
  sendPush: (options: SendPushNotificationOptions) => Promise<void>;
  subscribeLoading: boolean;
  unsubscribeLoading: boolean;
  sendPushLoading: boolean;
}

const fileName = 'lib/push/web-push-provider.tsx';
const serviceWorkerPath = '/service-worker.js';

/**
 * 푸시 알림 Context
 */
const WebPushContext = createContext<WebPushContextType | null>(null);

/**
 * 푸시 알림 Provider
 */
export function WebPushProvider({ children }: { children: ReactNode }) {
  // 구독 관련 상태
  const [subscription, setSubscription] = useState<PushSubscription | null>(null); // 푸시 알림 구독
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null); // 서비스 워커 등록

  // 로딩 관련 상태
  const [subscribeLoading, startSubscribeTransition] = useTransition(); // 푸시 알림 구독 로딩
  const [unsubscribeLoading, startUnsubscribeTransition] = useTransition(); // 푸시 알림 구독 취소 로딩
  const [sendPushLoading, startSendPushTransition] = useTransition(); // 푸시 알림 전송 로딩

  // 푸시 알림 구독
  const subscribeToNotifications = async () => {
    startSubscribeTransition(async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          throw new Error('Push notification permission is not granted');
        }

        const vapidPublicKey = env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
        if (!vapidPublicKey) {
          throw new Error('VAPID public key is not set');
        }

        if (!registration) {
          throw new Error('Service worker is not registered');
        }

        webLog('info', `Subscribing to push notifications...`);
        const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey,
        });

        if (subscription) {
          webLog('info', `Push subscription created:`, subscription);
          await subscribeAction(subscription.toJSON() as PushSubscription);
          setSubscription(subscription.toJSON() as PushSubscription);
        }
      } catch (error) {
        webLog('error', `${fileName}`, `Error occurred while subscribing:`, error);
        throw error;
      }
    });
  };

  // 푸시 알림 구독 취소
  const unsubscribeFromNotifications = async () => {
    startUnsubscribeTransition(async () => {
      try {
        if (subscription) {
          await unsubscribeAction(subscription);
          setSubscription(null);
        }
      } catch (error) {
        webLog('error', `${fileName}`, `Error occurred while unsubscribing:`, error);
        throw error;
      }
    });
  };

  // 푸시 알림 전송
  const sendPush = async (options: SendPushNotificationOptions) => {
    startSendPushTransition(async () => {
      try {
        if (!subscription) {
          throw new Error('Subscription is not found');
        }

        await sendPushNotificationAction(subscription, JSON.stringify(options));
      } catch (error) {
        webLog('error', `${fileName}`, `Error occurred while sending push notification:`, error);
        console.log(error);
      }
    });
  };

  useEffect(() => {
    async function registerServiceWorker() {
      try {
        if (
          typeof window === 'undefined' ||
          typeof navigator === 'undefined' ||
          typeof Notification === 'undefined' ||
          typeof ServiceWorkerContainer === 'undefined'
        ) {
          throw new Error('This browser does not support push notifications');
        }

        webLog('process', `Initializing service worker`);

        const registration = await navigator.serviceWorker.register(serviceWorkerPath, {
          scope: '/',
          updateViaCache: 'none',
        });

        webLog('success', `Service Worker registered`);

        // Wait for the service worker to be ready
        await navigator.serviceWorker.ready;
        webLog('success', `Service Worker is ready`);
        setRegistration(registration);

        // Check existing subscription
        const existingSub = await registration.pushManager.getSubscription();
        if (existingSub) {
          webLog('success', `Existing subscription`);
          setSubscription(existingSub.toJSON() as PushSubscription);
        }
      } catch (error) {
        webLog('error', `Service Worker registration failed:`, error);
      }
    }

    registerServiceWorker();
  }, []);

  return (
    <WebPushContext.Provider
      value={{
        subscription,
        registration,
        subscribeToNotifications,
        unsubscribeFromNotifications,
        sendPush,
        subscribeLoading,
        unsubscribeLoading,
        sendPushLoading,
      }}
    >
      {children}
    </WebPushContext.Provider>
  );
}

/**
 * 푸시 알림 Hooks
 * @example
 * ```tsx
 * const {
 *   subscription,
 *   registration,
 *   subscribeToNotifications,
 *   unsubscribeFromNotifications,
 *   sendPush,
 *   subscribeLoading,
 *   unsubscribeLoading,
 *   sendPushLoading,
 * } = useWebPush();
 *
 * if (!registration) {
 *   return null;
 * }
 *
 * return (
 *   <Button
 *     onClick={async () => { await subscribeToNotifications(); }}
 *     disabled={subscribeLoading || !!subscription}
 *   >
 *     {subscribeLoading ? 'Subscribing...' : 'Subscribe'}
 *   </Button>
 *   <Button
 *     onClick={async () => { await unsubscribeFromNotifications(); }}
 *     disabled={unsubscribeLoading || !subscription}
 *   >
 *     {unsubscribeLoading ? 'Unsubscribing...' : 'Unsubscribe'}
 *   </Button>
 *   <Button
 *     onClick={async () => { await sendPush({ title: 'Test Notification', body: 'Test Notification Body...' }); }}
 *     disabled={sendPushLoading}
 *   >
 *     {sendPushLoading ? 'Sending...' : 'Send Push'}
 *   </Button>
 * )
 * ```
 */
export function useWebPush() {
  const context = useContext(WebPushContext);
  if (!context) {
    throw new Error('useWebPush must be used within a WebPushProvider');
  }

  return context;
}

// Base64 문자열을 Uint8Array로 변환
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
