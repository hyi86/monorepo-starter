# useAutoScroll Hook

자동 스크롤 기능을 제공하는 React Hook입니다. 채팅 메시지, 로그 뷰어, 실시간 데이터 스트림 등에서 새로운 콘텐츠가 추가될 때 자동으로 맨 아래로 스크롤하는 기능을 구현할 때 사용합니다.

> **참고:** 이 Hook은 스크롤 컨테이너의 높이 변화를 감지하여 자동 스크롤을 수행하며, 사용자가 수동으로 스크롤할 때는 자동 스크롤을 비활성화합니다. ResizeObserver를 사용하여 컨테이너 크기 변화에도 대응합니다.

## Features

- 🔄 자동 스크롤 활성화/비활성화
- 📏 하단 인식 오차 범위 설정
- 🎯 부드러운 스크롤 지원
- 👆 사용자 스크롤 감지
- 📐 컨테이너 크기 변화 감지
- 🎛️ 수동 스크롤 제어
- ⚡ 성능 최적화된 스크롤 처리

## Installation

이 Hook은 컴포넌트 라이브러리의 일부이며 별도 설치가 필요하지 않습니다.

## Basic Usage

```tsx
import { useAutoScroll } from '@monorepo-starter/ui/hooks/use-auto-scroll';

function ChatComponent() {
  const [messages, setMessages] = useState<string[]>([]);

  const { scrollRef, isAtBottom, autoScrollEnabled, scrollToBottom, disableAutoScroll } = useAutoScroll({
    offset: 10,
    smooth: true,
    content: messages,
  });

  const addMessage = (message: string) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <div className="flex h-96 flex-col rounded-lg border">
      {/* 메시지 목록 */}
      <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto p-4" onScroll={disableAutoScroll}>
        {messages.map((message, index) => (
          <div key={index} className="rounded bg-blue-100 p-2">
            {message}
          </div>
        ))}
      </div>

      {/* 스크롤 상태 표시 */}
      <div className="bg-gray-100 p-2 text-sm">
        {autoScrollEnabled ? (
          <span className="text-green-600">자동 스크롤 활성화</span>
        ) : (
          <span className="text-red-600">자동 스크롤 비활성화</span>
        )}
        {!isAtBottom && (
          <button onClick={scrollToBottom} className="ml-2 rounded bg-blue-500 px-2 py-1 text-xs text-white">
            맨 아래로
          </button>
        )}
      </div>

      {/* 새 메시지 추가 버튼 */}
      <div className="border-t p-2">
        <button
          onClick={() => addMessage(`새 메시지 ${messages.length + 1}`)}
          className="w-full rounded bg-blue-500 px-4 py-2 text-white"
        >
          메시지 추가
        </button>
      </div>
    </div>
  );
}
```

## API Reference

### Hook Parameters

`useAutoScroll` Hook은 다음 옵션들을 포함한 설정 객체를 받습니다:

| Option    | Type              | Default     | Description                          |
| --------- | ----------------- | ----------- | ------------------------------------ |
| `offset`  | `number`          | `20`        | 하단 인식 오차 범위 (픽셀)           |
| `smooth`  | `boolean`         | `false`     | 부드러운 스크롤 사용 여부            |
| `content` | `React.ReactNode` | `undefined` | 변경을 감지할 콘텐츠 (배열이나 객체) |

### Return Value

Hook은 다음 속성들을 가진 객체를 반환합니다:

| Property            | Type                        | Description                                                   |
| ------------------- | --------------------------- | ------------------------------------------------------------- |
| `scrollRef`         | `React.Ref<HTMLDivElement>` | 스크롤할 요소에 연결할 ref                                    |
| `isAtBottom`        | `boolean`                   | 현재 하단에 있는지 여부                                       |
| `autoScrollEnabled` | `boolean`                   | 자동 스크롤 활성화 상태                                       |
| `scrollToBottom`    | `() => void`                | 수동으로 하단으로 스크롤하는 함수                             |
| `disableAutoScroll` | `() => void`                | 자동 스크롤을 비활성화하는 함수 (스크롤 이벤트 핸들러로 사용) |

### Types

```typescript
type ScrollState = {
  isAtBottom: boolean;
  autoScrollEnabled: boolean;
}

type UseAutoScrollOptions = {
  offset?: number;
  smooth?: boolean;
  content?: React.ReactNode;
}
```

## Advanced Usage

### 실시간 로그 뷰어

```tsx
import React, { useState, useEffect } from 'react';
import { useAutoScroll } from '@monorepo-starter/ui/hooks/use-auto-scroll';

type LogEntry = {
  id: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  timestamp: Date;
}

export function LogViewer() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const { scrollRef, isAtBottom, autoScrollEnabled, scrollToBottom } = useAutoScroll({
    offset: 5,
    smooth: false, // 로그는 즉시 스크롤
    content: logs,
  });

  // 시뮬레이션된 로그 생성
  useEffect(() => {
    const interval = setInterval(() => {
      const levels: LogEntry['level'][] = ['info', 'warn', 'error'];
      const randomLevel = levels[Math.floor(Math.random() * levels.length)];

      const newLog: LogEntry = {
        id: Date.now().toString(),
        level: randomLevel,
        message: `${randomLevel.toUpperCase()}: 시스템 로그 메시지 ${logs.length + 1}`,
        timestamp: new Date(),
      };

      setLogs((prev) => [...prev, newLog]);
    }, 2000);

    return () => clearInterval(interval);
  }, [logs.length]);

  const getLogColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'error':
        return 'text-red-600 bg-red-50';
      case 'warn':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <div className="flex h-80 flex-col rounded-lg border">
      <div className="flex items-center justify-between border-b bg-gray-100 p-2">
        <h3 className="font-semibold">실시간 로그</h3>
        <div className="text-sm">
          {autoScrollEnabled ? (
            <span className="text-green-600">● 자동 스크롤</span>
          ) : (
            <span className="text-gray-500">● 수동 모드</span>
          )}
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-2 font-mono text-sm">
        {logs.map((log) => (
          <div key={log.id} className={`mb-1 rounded p-1 ${getLogColor(log.level)}`}>
            <span className="text-gray-500">[{log.timestamp.toLocaleTimeString()}]</span>
            <span className="ml-2">{log.message}</span>
          </div>
        ))}
      </div>

      {!isAtBottom && (
        <div className="border-t bg-gray-50 p-2">
          <button onClick={scrollToBottom} className="w-full rounded bg-blue-500 px-3 py-1 text-sm text-white">
            최신 로그로 이동
          </button>
        </div>
      )}
    </div>
  );
}
```

### 데이터 스트림 모니터

```tsx
import React, { useState, useEffect } from 'react';
import { useAutoScroll } from '@monorepo-starter/ui/hooks/use-auto-scroll';

type DataPoint = {
  id: string;
  value: number;
  timestamp: Date;
}

export function DataStreamMonitor() {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const { scrollRef, isAtBottom, autoScrollEnabled, scrollToBottom } = useAutoScroll({
    offset: 15,
    smooth: true,
    content: dataPoints,
  });

  // 실시간 데이터 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      const newDataPoint: DataPoint = {
        id: Date.now().toString(),
        value: Math.floor(Math.random() * 100),
        timestamp: new Date(),
      };

      setDataPoints((prev) => [...prev.slice(-50), newDataPoint]); // 최근 50개만 유지
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-96 flex-col rounded-lg border">
      <div className="border-b bg-gray-100 p-3">
        <h3 className="font-semibold">실시간 데이터 모니터</h3>
        <p className="text-sm text-gray-600">
          총 {dataPoints.length}개 데이터 포인트
          {autoScrollEnabled && <span className="ml-2 text-green-600">● 자동 업데이트</span>}
        </p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3">
        {dataPoints.map((point) => (
          <div key={point.id} className="mb-1 flex items-center justify-between rounded bg-gray-50 p-2">
            <span className="text-sm">{point.timestamp.toLocaleTimeString()}</span>
            <span className="font-mono text-lg font-bold">{point.value}</span>
            <div className="h-2 w-20 rounded-full bg-gray-200">
              <div className="h-2 rounded-full bg-blue-500" style={{ width: `${point.value}%` }} />
            </div>
          </div>
        ))}
      </div>

      {!isAtBottom && (
        <div className="border-t p-2">
          <button onClick={scrollToBottom} className="w-full rounded bg-blue-500 px-3 py-2 text-white">
            최신 데이터로 이동
          </button>
        </div>
      )}
    </div>
  );
}
```

### 고급 설정이 포함된 채팅

```tsx
import React, { useState } from 'react';
import { useAutoScroll } from '@monorepo-starter/ui/hooks/use-auto-scroll';

export function AdvancedChat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [smoothScroll, setSmoothScroll] = useState(true);
  const [offset, setOffset] = useState(20);

  const { scrollRef, isAtBottom, autoScrollEnabled, scrollToBottom, disableAutoScroll } = useAutoScroll({
    offset,
    smooth: smoothScroll,
    content: messages,
  });

  const addMessage = () => {
    setMessages((prev) => [...prev, `메시지 ${prev.length + 1}: ${new Date().toLocaleTimeString()}`]);
  };

  return (
    <div className="mx-auto max-w-md rounded-lg border">
      {/* 설정 패널 */}
      <div className="space-y-2 border-b bg-gray-100 p-3">
        <div className="flex items-center space-x-2">
          <label className="text-sm">부드러운 스크롤:</label>
          <input type="checkbox" checked={smoothScroll} onChange={(e) => setSmoothScroll(e.target.checked)} />
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm">오프셋:</label>
          <input
            type="range"
            min="5"
            max="50"
            value={offset}
            onChange={(e) => setOffset(Number(e.target.value))}
            className="flex-1"
          />
          <span className="w-8 text-sm">{offset}</span>
        </div>
      </div>

      {/* 채팅 영역 */}
      <div className="flex h-64 flex-col">
        <div ref={scrollRef} className="flex-1 space-y-1 overflow-y-auto p-3" onScroll={disableAutoScroll}>
          {messages.map((message, index) => (
            <div key={index} className="rounded bg-blue-100 p-2 text-sm">
              {message}
            </div>
          ))}
        </div>

        {/* 상태 표시 */}
        <div className="flex justify-between bg-gray-50 p-2 text-xs">
          <span>{autoScrollEnabled ? '자동 스크롤 ON' : '자동 스크롤 OFF'}</span>
          <span>{isAtBottom ? '맨 아래' : '위쪽'}</span>
        </div>

        {/* 컨트롤 */}
        <div className="flex space-x-2 border-t p-2">
          <button onClick={addMessage} className="flex-1 rounded bg-blue-500 px-3 py-1 text-sm text-white">
            메시지 추가
          </button>
          {!isAtBottom && (
            <button onClick={scrollToBottom} className="rounded bg-gray-500 px-3 py-1 text-sm text-white">
              ↓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
```

## 동작 원리

### 1. 스크롤 감지

- `scroll` 이벤트 리스너를 통해 사용자의 스크롤 동작을 감지
- `offset` 값을 사용하여 하단 근처인지 정확히 판단

### 2. 콘텐츠 변화 감지

- `content` prop이 변경될 때마다 새로운 콘텐츠가 추가되었는지 확인
- `scrollHeight` 변화를 통해 콘텐츠 높이 변화 감지

### 3. 자동 스크롤 제어

- 사용자가 하단에서 벗어나면 자동 스크롤 비활성화
- 사용자가 다시 하단으로 돌아오면 자동 스크롤 재활성화

### 4. 성능 최적화

- `requestAnimationFrame`을 사용하여 부드러운 스크롤 처리
- `ResizeObserver`를 사용하여 컨테이너 크기 변화 감지
- `passive: true` 옵션으로 스크롤 이벤트 성능 최적화

## Best Practices

### 1. 적절한 offset 설정

```tsx
// 채팅 메시지: 작은 offset
const chatScroll = useAutoScroll({ offset: 10 });

// 로그 뷰어: 더 큰 offset
const logScroll = useAutoScroll({ offset: 30 });
```

### 2. smooth 스크롤 사용 시기

```tsx
// 채팅: 부드러운 스크롤
const chatScroll = useAutoScroll({ smooth: true });

// 로그: 즉시 스크롤
const logScroll = useAutoScroll({ smooth: false });
```

### 3. content prop 활용

```tsx
// 배열 데이터 변경 감지
const { scrollRef } = useAutoScroll({ content: messages });

// 객체 데이터 변경 감지
const { scrollRef } = useAutoScroll({ content: { logs, timestamp } });
```

## Troubleshooting

### 자동 스크롤이 작동하지 않는 경우

1. `scrollRef`가 올바르게 연결되었는지 확인
2. `content` prop이 변경되는지 확인
3. 스크롤 컨테이너에 `overflow-y-auto` 클래스가 있는지 확인

### 성능 문제가 있는 경우

1. `offset` 값을 적절히 조정
2. `smooth: false`로 설정하여 즉시 스크롤 사용
3. 불필요한 리렌더링이 발생하지 않는지 확인

### 스크롤이 부자연스러운 경우

1. `offset` 값을 늘려서 하단 인식 범위 확대
2. `smooth: true`로 설정하여 부드러운 스크롤 사용
3. `requestAnimationFrame` 사용으로 성능 개선
