'use client';

import {
  basicExample,
  eventSystemExample,
  largeDataExample,
  runAllExamples,
  serializationExample,
  undoRedoExample,
} from '@monorepo-starter/ui/blocks/spreadsheet/core/example';
import { useState } from 'react';

function SpreadsheetExample() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // 콘솔 로그를 캡처하는 함수
  const captureConsoleLog = () => {
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      const message = args
        .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)))
        .join(' ');
      setLogs((prev) => [...prev, message]);
      originalLog(...args);
    };

    console.error = (...args) => {
      const message = args
        .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)))
        .join(' ');
      setLogs((prev) => [...prev, `❌ ${message}`]);
      originalError(...args);
    };

    return () => {
      console.log = originalLog;
      console.error = originalError;
    };
  };

  const runExample = async (exampleFn: () => void, name: string) => {
    setIsRunning(true);
    setLogs([]);

    const cleanup = captureConsoleLog();

    try {
      console.log(`🚀 ${name} 실행 중...`);
      exampleFn();
      console.log(`✅ ${name} 완료!`);
    } catch (error) {
      console.error(`❌ ${name} 실행 중 오류:`, error);
    } finally {
      cleanup();
      setIsRunning(false);
    }
  };

  const runAll = async () => {
    setIsRunning(true);
    setLogs([]);

    const cleanup = captureConsoleLog();

    try {
      console.log('🚀 모든 예제 실행 중...');
      runAllExamples();
      console.log('✅ 모든 예제 완료!');
    } catch (error) {
      console.error('❌ 예제 실행 중 오류:', error);
    } finally {
      cleanup();
      setIsRunning(false);
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">스프레드시트 Core 모듈 예제</h1>
        <p className="mb-6 text-gray-600">Phase 0.1에서 구현된 Core 데이터 모델의 기능들을 테스트해보세요.</p>

        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          <button
            onClick={() => runExample(basicExample, '기본 사용법')}
            disabled={isRunning}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
          >
            기본 사용법
          </button>

          <button
            onClick={() => runExample(undoRedoExample, 'Undo/Redo')}
            disabled={isRunning}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:bg-gray-400"
          >
            Undo/Redo
          </button>

          <button
            onClick={() => runExample(eventSystemExample, '이벤트 시스템')}
            disabled={isRunning}
            className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 disabled:bg-gray-400"
          >
            이벤트 시스템
          </button>

          <button
            onClick={() => runExample(serializationExample, '직렬화/복원')}
            disabled={isRunning}
            className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 disabled:bg-gray-400"
          >
            직렬화/복원
          </button>

          <button
            onClick={() => runExample(largeDataExample, '대용량 데이터')}
            disabled={isRunning}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:bg-gray-400"
          >
            대용량 데이터
          </button>

          <button
            onClick={runAll}
            disabled={isRunning}
            className="rounded bg-indigo-500 px-4 py-2 font-bold text-white hover:bg-indigo-600 disabled:bg-gray-400"
          >
            모든 예제 실행
          </button>
        </div>

        <div className="mb-4 flex gap-4">
          <button onClick={clearLogs} className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
            로그 지우기
          </button>

          {isRunning && (
            <div className="flex items-center text-blue-600">
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-blue-600"></div>
              실행 중...
            </div>
          )}
        </div>
      </div>

      <div className="h-96 overflow-y-auto rounded-lg bg-gray-900 p-4 font-mono text-sm text-green-400">
        {logs.length === 0 ? (
          <div className="text-gray-500">위의 버튼을 클릭하여 예제를 실행하세요.</div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="mb-1">
              {log}
            </div>
          ))
        )}
      </div>

      <div className="mt-6 rounded-lg bg-blue-50 p-4">
        <h3 className="mb-2 font-bold">구현된 기능:</h3>
        <ul className="list-inside list-disc space-y-1 text-sm">
          <li>
            ✅ <strong>타입 정의</strong>: 셀, 행, 열, 선택 모델 등
          </li>
          <li>
            ✅ <strong>데이터 모델</strong>: 불변성 유지, 스냅샷 저장
          </li>
          <li>
            ✅ <strong>Undo/Redo</strong>: 명령 기반 실행 취소/재실행
          </li>
          <li>
            ✅ <strong>이벤트 시스템</strong>: 이벤트 버스 및 리스너
          </li>
          <li>
            ✅ <strong>구독 시스템</strong>: 상태 변경 알림
          </li>
          <li>
            ✅ <strong>직렬화</strong>: JSON 변환 및 복원
          </li>
          <li>
            ✅ <strong>대용량 데이터</strong>: 효율적인 메모리 관리
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function SpreadsheetPage() {
  return <SpreadsheetExample />;
}
