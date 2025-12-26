'use client';

import { getChoseong, josa } from 'es-hangul';
import { useState } from 'react';

// 예제 데이터
const fruits = ['사과', '바나나', '수박', '딸기', '포도', '오렌지', '키위', '참외'];
const names = ['김철수', '이영희', '박민수', '최지영', '정수진', '한소희'];
const sentences = ['사과를 먹었습니다.', '바나나가 맛있습니다.', '수박은 시원합니다.', '딸기가 달콤합니다.'];

export default function HangulExamplePage() {
  const [choseongInput, setChoseongInput] = useState('');
  const [josaWord, setJosaWord] = useState('사과');
  const [josaType, setJosaType] = useState('을/를');
  const [searchInput, setSearchInput] = useState('');
  const [filterInput, setFilterInput] = useState('');

  // 초성 검색 필터링
  const filteredByChoseong = fruits.filter((word) => getChoseong(word) === choseongInput);

  // 한글 포함 검색 (초성 검색 포함)
  const searchResults = sentences.filter((sentence) => {
    if (!searchInput) return false;
    // 일반 텍스트 포함 검색
    if (sentence.includes(searchInput)) return true;
    // 초성 검색: 문장의 각 단어의 초성과 비교
    const words = sentence.split(/\s+/);
    return words.some((word) => getChoseong(word).includes(searchInput));
  });

  // 초성으로 필터링
  const filteredFruits = fruits.filter((word) => getChoseong(word).includes(filterInput));

  return (
    <div className="space-y-12 p-8">
      <h1 className="text-3xl font-bold">es-hangul 예제 모음</h1>

      {/* 1. 초성 검색 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. 초성 검색</h2>
        <div className="space-y-2">
          <input
            type="text"
            value={choseongInput}
            onChange={(e) => setChoseongInput(e.target.value)}
            placeholder="초성 입력 (예: ㅅㅂ)"
            className="rounded border p-2"
          />
          <div>
            <strong>입력한 초성:</strong> {choseongInput || '(없음)'}
          </div>
          <div>
            <strong>검색 결과:</strong>{' '}
            {filteredByChoseong.length > 0 ? (
              <span className="text-blue-600">{filteredByChoseong.join(', ')}</span>
            ) : (
              <span className="text-gray-500">결과 없음</span>
            )}
          </div>
          <div className="text-sm text-gray-600">
            <div>전체 과일: {fruits.join(', ')}</div>
            <div className="mt-1">각 과일의 초성: {fruits.map((f) => `${f}(${getChoseong(f)})`).join(', ')}</div>
          </div>
        </div>
      </section>

      {/* 2. 조사 붙이기 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. 조사 붙이기</h2>
        <div className="space-y-2">
          <div className="flex gap-4">
            <input
              type="text"
              value={josaWord}
              onChange={(e) => setJosaWord(e.target.value)}
              placeholder="단어 입력"
              className="rounded border p-2"
            />
            <select value={josaType} onChange={(e) => setJosaType(e.target.value)} className="rounded border p-2">
              <option value="을/를">을/를</option>
              <option value="이/가">이/가</option>
              <option value="은/는">은/는</option>
              <option value="으로/로">으로/로</option>
              <option value="의">의</option>
            </select>
          </div>
          <div>
            <strong>결과:</strong>{' '}
            <span className="text-lg text-green-600">{josa(josaWord, josaType as Parameters<typeof josa>[1])}</span>
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            <div>예시 문장들:</div>
            {(['을/를', '이/가', '은/는'] as const).map((type) => (
              <div key={type}>{josa(josaWord, type)} 좋아합니다.</div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 한글 포함 검색 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. 한글 포함 검색 (초성 검색 포함)</h2>
        <div className="space-y-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="검색어 입력 (초성도 가능)"
            className="rounded border p-2"
          />
          <div>
            <strong>검색 결과:</strong>
            {searchResults.length > 0 ? (
              <ul className="mt-2 list-inside list-disc text-blue-600">
                {searchResults.map((result, i) => (
                  <li key={i}>{result}</li>
                ))}
              </ul>
            ) : (
              <span className="ml-2 text-gray-500">결과 없음</span>
            )}
          </div>
          <div className="text-sm text-gray-600">전체 문장: {sentences.join(' | ')}</div>
        </div>
      </section>

      {/* 4. 초성으로 필터링 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. 초성으로 필터링 (부분 일치)</h2>
        <div className="space-y-2">
          <input
            type="text"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
            placeholder="초성 입력 (예: ㅅ)"
            className="rounded border p-2"
          />
          <div>
            <strong>필터링 결과:</strong>{' '}
            {filteredFruits.length > 0 ? (
              <span className="text-purple-600">{filteredFruits.join(', ')}</span>
            ) : (
              <span className="text-gray-500">결과 없음</span>
            )}
          </div>
        </div>
      </section>

      {/* 5. 이름에 조사 붙이기 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">5. 이름에 조사 붙이기</h2>
        <div className="space-y-2">
          <div className="text-sm text-gray-600">
            {names.map((name) => (
              <div key={name} className="mb-1 flex gap-3">
                <span>{josa(name, '이/가' as const)} 왔습니다.</span>
                <span>{josa(name, '을/를' as const)} 만났습니다.</span>
                <span>{josa(name, '은/는' as const)} 좋습니다.</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 초성 추출 비교 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">6. 초성 추출 비교</h2>
        <div className="space-y-2">
          <div className="text-sm">
            {fruits.map((fruit) => (
              <div key={fruit} className="mb-1">
                <strong>{fruit}</strong> → 초성: <code className="rounded bg-gray-100 px-1">{getChoseong(fruit)}</code>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
