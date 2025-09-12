'use server';

import { devLog } from '@monorepo-starter/utils/console';
import webPush from 'web-push';
import { env } from '~/shared/config/env';

/**
 * 푸시 알림 전송
 *
 * @param subscription - 푸시 알림 구독 정보
 * @param payload - 푸시 알림 페이로드
 */
export async function sendPushNotificationAction(subscription: webPush.PushSubscription, payload: string) {
  const vapidPublicKey = env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const vapidPrivateKey = env.NEXT_PUBLIC_VAPID_PRIVATE_KEY;
  const webPushEmail = env.NEXT_PUBLIC_WEB_PUSH_EMAIL;

  if (!vapidPublicKey || !vapidPrivateKey) {
    throw new Error('VAPID keys are not set');
  }

  devLog('process', `Sending push notification`);

  webPush.setVapidDetails(`mailto:${webPushEmail}`, vapidPublicKey, vapidPrivateKey);

  try {
    // 페이로드를 UTF-8 텍스트로 직접 전송
    const result = await webPush.sendNotification(subscription, payload);
    devLog('success', `Push notification sent successfully`);
    return result;
  } catch (error) {
    devLog('error', `Error sending push notification`, error);
    throw error;
  }
}

/**
 * 구독
 */
export async function subscribeAction(subscription: webPush.PushSubscription) {
  try {
    // 구독 정보를 데이터베이스에 저장하는 로직을 추가
    devLog('info', 'Received push notification subscription:', subscription);

    // 테스트를 위한 즉시 알림 전송
    const payload = JSON.stringify({ title: 'Subscription', body: 'Subscription successful' });
    await sendPushNotificationAction(subscription, payload);
  } catch (error) {
    devLog('error', 'Subscription error:', error);
    throw error;
  }
}

/**
 * 구독 취소
 */
export async function unsubscribeAction(subscription: webPush.PushSubscription) {
  try {
    // 구독 정보를 데이터베이스에서 삭제하는 로직을 추가
    devLog('info', 'Received push notification unsubscribe:', subscription);
  } catch (error) {
    devLog('error', 'Unsubscription error:', error);
    throw error;
  }
}
