'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Input } from '@monorepo-starter/ui/components/input';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { startTransition, useOptimistic, useRef, useState } from 'react';
import { addMessageAction } from './actions';

// 메시지 타입 정의
export type Message = {
  id: number; // 메시지 고유 ID
  pending: boolean; // 서버 처리 중인지 여부 (낙관적 업데이트용)
  message: string; // 메시지 내용
};

/**
 * useOptimistic을 사용한 낙관적 UI 업데이트 예제
 *
 * 낙관적 업데이트란:
 * - 서버 응답을 기다리지 않고 즉시 UI를 업데이트
 * - 사용자 경험 향상 (즉각적인 피드백)
 * - 서버 응답 후 자동으로 실제 데이터로 동기화
 */
export default function ServerActionUseOptimisticPage() {
  // 폼 요소에 대한 참조 (폼 리셋용)
  const formRef = useRef<HTMLFormElement>(null);

  // 실제 메시지 상태 (서버와 동기화된 데이터)
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, pending: false, message: 'Hello' },
    { id: 2, pending: false, message: '안녕하세요' },
    { id: 3, pending: false, message: 'こんにちは' },
    { id: 4, pending: false, message: '你好' },
    { id: 5, pending: false, message: 'Hola' },
  ]);

  // 로딩 상태 관리
  const [isPending, setIsPending] = useState(false);

  // useOptimistic 훅을 사용한 낙관적 상태 관리
  // optimisticMessages: 낙관적으로 업데이트된 메시지 목록
  // addOptimisticMessage: 낙관적 업데이트를 추가하는 함수
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<Message[]>(messages);

  /**
   * 메시지 전송 액션 (간단한 버전)
   * 1. 낙관적 UI 업데이트 (즉시 표시)
   * 2. 서버 액션 호출
   * 3. 서버 응답 후 실제 데이터로 동기화
   */
  const sendMessageAction = async (formData: FormData) => {
    startTransition(async () => {
      const message = formData.get('message') as string;

      // 고유한 ID 생성 (음수로 낙관적 업데이트용 ID 구분)
      const optimisticId = -(Date.now() + Math.random());

      // 1단계: 낙관적 UI 업데이트 (즉시 화면에 표시)
      // pending: true로 설정하여 로딩 상태 표시
      addOptimisticMessage((prev) => [...prev, { id: optimisticId, pending: true, message }]);

      // 로딩 상태 시작
      setIsPending(true);

      try {
        // 2단계: 서버 액션 호출
        const savedMessage = await addMessageAction(message);

        // 3단계: 서버 액션 완료 후 실제 데이터로 상태 업데이트
        setMessages((prev) => [...prev, { id: Date.now(), pending: false, message: savedMessage }]);
      } catch (error) {
        console.error('메시지 전송 실패:', error);
      } finally {
        // 로딩 상태 종료
        setIsPending(false);
      }

      // 폼 초기화
      formRef.current?.reset();
    });
  };

  return (
    <div>
      <h1>Server Action Use Optimistic</h1>

      {/* 액션 상태 표시 */}
      <div className="mb-4 space-y-2">
        {isPending && <div className="text-blue-600">서버에 메시지를 전송 중...</div>}
      </div>

      {/* 메시지 목록 표시 */}
      <div className="bg-foreground/10 mb-4 rounded-lg p-4">
        {optimisticMessages.map((message) => (
          <div key={message.id}>
            {/* pending 상태일 때 애니메이션 효과 적용 */}
            <span className={cn(message.pending && 'animate-pulse text-gray-500')}>{message.message}</span>
          </div>
        ))}
      </div>

      {/* 메시지 입력 폼 */}
      <form action={sendMessageAction} className="flex gap-2" ref={formRef}>
        <Input type="text" name="message" placeholder="Message" disabled={isPending} />
        <Button type="submit" disabled={isPending}>
          {isPending ? '전송 중...' : 'Send'}
        </Button>
      </form>
    </div>
  );
}
