'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { parseAsInteger, parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs';
import { useMemo, useState, useTransition } from 'react';
import { db, type Item } from './app-db';

export function BrowserDBPage() {
  const [name, setName] = useState('');

  // nuqs를 사용한 URL 쿼리 파라미터 관리 (객체 형태)
  const [filters, setFilters] = useQueryStates({
    search: parseAsString.withDefault(''),
    sortBy: parseAsStringEnum(['name', 'qty', 'updatedAt']).withDefault('updatedAt'),
    sortOrder: parseAsStringEnum(['asc', 'desc']).withDefault('desc'),
    filterQty: parseAsInteger,
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(5),
  });

  // 개별 필터 값들 추출
  const { search: searchTerm, sortBy, sortOrder, filterQty, page, pageSize } = filters;

  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [editName, setEditName] = useState('');
  const [editQty, setEditQty] = useState(0);
  const [isPending, startTransition] = useTransition();

  // DB의 items 테이블을 실시간 구독
  const allItems = useLiveQuery(() => db.items.toArray(), []);

  // 필터링 및 정렬된 아이템들
  const filteredItems = useMemo(() => {
    if (!allItems) return [];

    let filtered = allItems;

    // 검색 필터
    if (searchTerm) {
      filtered = filtered.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // 수량 필터
    if (filterQty !== null && filterQty > 0) {
      filtered = filtered.filter((item) => item.qty >= filterQty);
    }

    // 정렬
    filtered.sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case 'name':
          aVal = a.name;
          bVal = b.name;
          break;
        case 'qty':
          aVal = a.qty;
          bVal = b.qty;
          break;
        case 'updatedAt':
          aVal = a.updatedAt;
          bVal = b.updatedAt;
          break;
        default:
          return 0;
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [allItems, searchTerm, filterQty, sortBy, sortOrder]);

  // 페이징 계산
  const pagination = useMemo(() => {
    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageItems = filteredItems.slice(startIndex, endIndex);

    return {
      totalItems,
      totalPages,
      currentPage: page,
      pageSize,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, totalItems),
      items: currentPageItems,
    };
  }, [filteredItems, page, pageSize]);

  // 통계 계산
  const stats = useMemo(() => {
    if (!allItems) return { total: 0, totalQty: 0, avgQty: 0, maxQty: 0, minQty: 0 };

    const total = allItems.length;
    const totalQty = allItems.reduce((sum, item) => sum + item.qty, 0);
    const avgQty = total > 0 ? Math.round((totalQty / total) * 100) / 100 : 0;
    const maxQty = Math.max(...allItems.map((item) => item.qty));
    const minQty = Math.min(...allItems.map((item) => item.qty));

    return { total, totalQty, avgQty, maxQty, minQty };
  }, [allItems]);

  // 아이템 추가
  async function addItem() {
    if (!name.trim()) return;

    startTransition(async () => {
      const id = crypto.randomUUID();
      await db.items.put({
        id,
        name: name.trim(),
        qty: Math.floor(Math.random() * 10) + 1,
        updatedAt: Date.now(),
      });
      setName('');
    });
  }

  // 아이템 수정 시작
  function startEdit(item: Item) {
    setEditingItem(item);
    setEditName(item.name);
    setEditQty(item.qty);
  }

  // 아이템 수정 완료
  async function saveEdit() {
    if (!editingItem || !editName.trim()) return;

    startTransition(async () => {
      await db.items.put({
        ...editingItem,
        name: editName.trim(),
        qty: editQty,
        updatedAt: Date.now(),
      });
      setEditingItem(null);
      setEditName('');
      setEditQty(0);
    });
  }

  // 아이템 수정 취소
  function cancelEdit() {
    setEditingItem(null);
    setEditName('');
    setEditQty(0);
  }

  // 아이템 삭제
  async function deleteItem(id: string) {
    startTransition(async () => {
      await db.items.delete(id);
    });
  }

  // 수량 업데이트
  async function updateQty(id: string, newQty: number) {
    startTransition(async () => {
      const item = await db.items.get(id);
      if (item) {
        await db.items.put({
          ...item,
          qty: newQty,
          updatedAt: Date.now(),
        });
      }
    });
  }

  // 일괄 삭제 (수량이 0인 아이템들)
  async function deleteZeroQtyItems() {
    startTransition(async () => {
      await db.items.where('qty').equals(0).delete();
    });
  }

  // 모든 아이템 삭제
  async function deleteAllItems() {
    if (!confirm('정말로 모든 아이템을 삭제하시겠습니까?')) return;

    startTransition(async () => {
      await db.items.clear();
    });
  }

  // 랜덤 아이템 생성 (테스트용)
  async function addRandomItems() {
    startTransition(async () => {
      const randomNames = ['사과', '바나나', '오렌지', '포도', '딸기', '키위', '망고', '파인애플'];
      const items = Array.from({ length: 5 }, () => ({
        id: crypto.randomUUID(),
        name: randomNames[Math.floor(Math.random() * randomNames.length)] || '알 수 없는 아이템',
        qty: Math.floor(Math.random() * 20) + 1,
        updatedAt: Date.now(),
      }));

      await db.items.bulkPut(items);
    });
  }

  // 필터 초기화
  function resetFilters() {
    setFilters(
      {
        search: null,
        filterQty: null,
        sortBy: 'updatedAt',
        sortOrder: 'desc',
        page: 1,
        pageSize: 10,
      },
      { history: 'push' },
    );
  }

  // 페이지 변경
  function goToPage(newPage: number) {
    setFilters({ page: newPage }, { history: 'push' });
  }

  // 페이지 크기 변경
  function changePageSize(newPageSize: number) {
    setFilters({ pageSize: newPageSize, page: 1 }, { history: 'push' });
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4">
      <h1 className="text-2xl font-bold">Dexie 브라우저 DB 예제</h1>

      {/* 통계 섹션 */}
      <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 md:grid-cols-5">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">총 아이템</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{stats.totalQty}</div>
          <div className="text-sm text-gray-600">총 수량</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.avgQty}</div>
          <div className="text-sm text-gray-600">평균 수량</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{stats.maxQty}</div>
          <div className="text-sm text-gray-600">최대 수량</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{stats.minQty}</div>
          <div className="text-sm text-gray-600">최소 수량</div>
        </div>
      </div>

      {/* 추가 섹션 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">아이템 추가</h2>
        <div className="flex gap-2">
          <input
            className="flex-1 rounded border p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="아이템 이름"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addItem();
              }
            }}
          />
          <button
            onClick={addItem}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
            disabled={isPending || !name.trim()}
          >
            추가
          </button>
          <button
            onClick={addRandomItems}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:opacity-50"
            disabled={isPending}
          >
            랜덤 5개 추가
          </button>
        </div>
      </div>

      {/* 검색 및 필터 섹션 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">검색 및 필터</h2>
          <button
            onClick={resetFilters}
            className="rounded bg-gray-500 px-3 py-1 text-sm text-white hover:bg-gray-600"
            disabled={!searchTerm && !filterQty && sortBy === 'updatedAt' && sortOrder === 'desc'}
          >
            필터 초기화
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">검색</label>
            <input
              className="w-full rounded border p-2"
              value={searchTerm}
              onChange={(e) => setFilters({ search: e.target.value || null })}
              placeholder="아이템 이름으로 검색..."
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">수량 필터</label>
            <input
              type="number"
              className="w-full rounded border p-2"
              value={filterQty || ''}
              onChange={(e) => setFilters({ filterQty: e.target.value ? Number(e.target.value) : null })}
              placeholder="최소 수량"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">정렬</label>
            <div className="flex gap-2">
              <select
                className="flex-1 rounded border p-2"
                value={sortBy}
                onChange={(e) => setFilters({ sortBy: e.target.value as 'name' | 'qty' | 'updatedAt' })}
              >
                <option value="updatedAt">수정일</option>
                <option value="name">이름</option>
                <option value="qty">수량</option>
              </select>
              <button
                className="rounded border px-3 py-2 hover:bg-gray-50"
                onClick={() => setFilters({ sortOrder: sortOrder === 'asc' ? 'desc' : 'asc' })}
                title={`정렬 순서: ${sortOrder === 'asc' ? '오름차순' : '내림차순'}`}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>

        {/* 활성 필터 표시 */}
        {(searchTerm || filterQty || sortBy !== 'updatedAt' || sortOrder !== 'desc') && (
          <div className="mt-4 rounded-lg bg-blue-50 p-3">
            <div className="mb-2 text-sm font-medium text-blue-800">활성 필터:</div>
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="rounded bg-blue-200 px-2 py-1 text-xs text-blue-800">
                  검색: &ldquo;{searchTerm}&rdquo;
                </span>
              )}
              {filterQty && (
                <span className="rounded bg-blue-200 px-2 py-1 text-xs text-blue-800">수량 ≥ {filterQty}</span>
              )}
              <span className="rounded bg-blue-200 px-2 py-1 text-xs text-blue-800">
                정렬: {sortBy === 'name' ? '이름' : sortBy === 'qty' ? '수량' : '수정일'}(
                {sortOrder === 'asc' ? '오름차순' : '내림차순'})
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 일괄 작업 섹션 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">일괄 작업</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={deleteZeroQtyItems}
            className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600 disabled:opacity-50"
            disabled={isPending}
          >
            수량 0인 아이템 삭제
          </button>
          <button
            onClick={deleteAllItems}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:opacity-50"
            disabled={isPending}
          >
            모든 아이템 삭제
          </button>
        </div>
      </div>

      {/* 아이템 목록 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">
          아이템 목록 ({pagination.totalItems}개) - {pagination.startIndex}-{pagination.endIndex} 표시
        </h2>

        {isPending ? (
          <div className="py-8 text-center">불러오는 중...</div>
        ) : pagination.items.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            {allItems?.length === 0 ? '아이템이 없습니다.' : '검색 결과가 없습니다.'}
          </div>
        ) : (
          <div className="grid gap-3">
            {pagination.items.map((item) => (
              <div key={item.id} className="rounded-lg border bg-white p-4 shadow-sm">
                {editingItem?.id === item.id ? (
                  // 수정 모드
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        className="flex-1 rounded border p-2"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="아이템 이름"
                      />
                      <input
                        type="number"
                        className="w-20 rounded border p-2"
                        value={editQty}
                        onChange={(e) => setEditQty(Number(e.target.value))}
                        min="0"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
                        disabled={!editName.trim()}
                      >
                        저장
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="rounded bg-gray-500 px-3 py-1 text-sm text-white hover:bg-gray-600"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  // 보기 모드
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600">
                        수량: {item.qty} | 수정일: {new Date(item.updatedAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* 수량 조절 버튼 */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQty(item.id, Math.max(0, item.qty - 1))}
                          className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 text-sm hover:bg-gray-300"
                          disabled={isPending}
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 text-sm hover:bg-gray-300"
                          disabled={isPending}
                        >
                          +
                        </button>
                      </div>

                      {/* 액션 버튼들 */}
                      <button
                        onClick={() => startEdit(item)}
                        className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                        disabled={isPending}
                      >
                        수정
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                        disabled={isPending}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 페이징 UI */}
        {pagination.totalPages > 1 && (
          <div className="mt-6 space-y-4">
            {/* 페이지 크기 선택 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">페이지 크기:</label>
                <select
                  className="rounded border p-1"
                  value={pageSize}
                  onChange={(e) => changePageSize(Number(e.target.value))}
                >
                  <option value={5}>5개</option>
                  <option value={10}>10개</option>
                  <option value={20}>20개</option>
                  <option value={50}>50개</option>
                </select>
              </div>
              <div className="text-sm text-gray-600">
                {pagination.startIndex}-{pagination.endIndex} / {pagination.totalItems}개
              </div>
            </div>

            {/* 페이지 네비게이션 */}
            <div className="flex items-center justify-center gap-2">
              {/* 첫 페이지 */}
              <button
                onClick={() => goToPage(1)}
                disabled={pagination.currentPage === 1}
                className="rounded border px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50"
              >
                «
              </button>

              {/* 이전 페이지 */}
              <button
                onClick={() => goToPage(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="rounded border px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50"
              >
                ‹
              </button>

              {/* 페이지 번호들 */}
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                const startPage = Math.max(1, pagination.currentPage - 2);
                const pageNum = startPage + i;

                if (pageNum > pagination.totalPages) return null;

                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`rounded border px-3 py-1 text-sm ${
                      pageNum === pagination.currentPage ? 'bg-blue-500 text-white' : 'hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* 다음 페이지 */}
              <button
                onClick={() => goToPage(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="rounded border px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50"
              >
                ›
              </button>

              {/* 마지막 페이지 */}
              <button
                onClick={() => goToPage(pagination.totalPages)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="rounded border px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50"
              >
                »
              </button>
            </div>

            {/* 페이지 점프 */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm">페이지로 이동:</span>
              <input
                type="number"
                min="1"
                max={pagination.totalPages}
                className="w-16 rounded border p-1 text-center text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const targetPage = Number((e.target as HTMLInputElement).value);
                    if (targetPage >= 1 && targetPage <= pagination.totalPages) {
                      goToPage(targetPage);
                    }
                  }
                }}
                placeholder={pagination.currentPage.toString()}
              />
              <span className="text-sm text-gray-600">/ {pagination.totalPages}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
