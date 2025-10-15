'use client';

import { Checkbox } from '@monorepo-starter/ui/components/checkbox';
import { Input } from '@monorepo-starter/ui/components/input';
import { Label } from '@monorepo-starter/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@monorepo-starter/ui/components/select';
import { useQueryStates } from 'nuqs';
import { useTransition } from 'react';
import { Literal, literals, parsers, urlKeys } from './search-params';

/**
 * 클라이언트 컴포넌트 - 실시간 URL 파라미터 업데이트
 * - useQueryStates 훅을 사용하여 URL 파라미터를 상태로 관리
 * - 사용자 입력에 따라 실시간으로 URL 업데이트
 * - React의 useTransition을 사용하여 부드러운 UI 업데이트
 */
export function Client() {
  // React의 useTransition 훅 - 비동기 상태 업데이트를 위한 로딩 상태 관리
  const [isPending, startTransition] = useTransition();

  // nuqs의 useQueryStates 훅 - URL 파라미터를 상태로 관리
  // parsers: 파라미터 파서 정의
  // startTransition: React의 startTransition 함수 전달
  // shallow: false - 전체 페이지 새로고침 없이 URL만 업데이트
  // urlKeys: URL 키 매핑 사용
  const [{ str, int, bool, literal, float }, setParams] = useQueryStates(parsers, {
    startTransition,
    shallow: false,
    urlKeys,
  });

  return (
    <div>
      {/* 로딩 상태 표시 */}
      {isPending}

      <div className="flex max-w-120 flex-col gap-2">
        {/* 문자열 입력 필드 */}
        <Input type="text" value={str} onChange={(e) => setParams({ str: e.target.value })} />

        {/* 정수 입력 필드 */}
        <Input type="number" value={int} onChange={(e) => setParams({ int: Number(e.target.valueAsNumber) })} />

        {/* 불린 체크박스 */}
        <div>
          <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
            <Checkbox
              id="toggle-2"
              checked={bool}
              onCheckedChange={(checked) => setParams({ bool: !!checked })}
              className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
            />
            <div className="grid gap-1.5 font-normal">
              <p className="text-sm leading-none font-medium">Enable Checkbox</p>
              <p className="text-muted-foreground text-sm">You can enable or disable checkbox at any time.</p>
            </div>
          </Label>
        </div>

        {/* 문자열 리터럴 선택 드롭다운 */}
        <Select value={literal} onValueChange={(value) => setParams({ literal: value as Literal })}>
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            {/* literals 배열의 모든 값을 옵션으로 렌더링 */}
            {literals.map((literal) => (
              <SelectItem key={literal} value={literal}>
                {literal}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* 실수 입력 필드 */}
        <Input type="number" value={float} onChange={(e) => setParams({ float: Number(e.target.valueAsNumber) })} />
      </div>
    </div>
  );
}
