'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Input } from '@monorepo-starter/ui/components/input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { searchParamsCache, serialize } from './search-params';

type FuzzySearchProps = {
  currentUrl: string;
  allParams: ReturnType<typeof searchParamsCache.all>;
};

export function FuzzySearch({ currentUrl, allParams }: FuzzySearchProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    startTransition(async () => {
      router.push(serialize(currentUrl, { ...allParams, pageIndex: 1, search }));
    });
  };

  useEffect(() => {
    setSearch(allParams.search);
  }, [allParams]);

  return (
    <div className="mb-2 flex items-center gap-2">
      <Input
        disabled={isPending}
        className="w-50"
        placeholder="Search.."
        value={search}
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <Button onClick={handleSearch} disabled={isPending}>
        <Search className="size-4" />
      </Button>
    </div>
  );
}
