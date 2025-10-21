import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@monorepo-starter/ui/components/pagination';
import { calculatePaginationRange } from '@monorepo-starter/ui/lib/pagination';
import { ceil } from '@monorepo-starter/utils/math';
import { searchParamsCache, serialize } from './search-params';

export function PaginationBlock({ totalCount, pageSize }: { totalCount: number; pageSize: number }) {
  const totalPages = ceil(totalCount / pageSize);
  const { pageIndex, ...allParams } = searchParamsCache.all();
  const paginationRange = calculatePaginationRange({
    total: totalPages,
    siblings: 1,
    boundaries: 1,
    activePage: pageIndex,
  });

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {pageIndex > 1 ? (
            <PaginationPrevious href={serialize({ ...allParams, pageIndex: pageIndex - 1 })} />
          ) : (
            <PaginationPrevious />
          )}
        </PaginationItem>

        {paginationRange.map((page, index) => {
          if (page === 'dots') {
            return (
              <PaginationItem key={`dots-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const href = serialize({ ...allParams, pageIndex: page });

          return (
            <PaginationItem key={page}>
              {page === pageIndex ? (
                <PaginationLink isActive>{page}</PaginationLink>
              ) : (
                <PaginationLink href={href === '' ? '?' : href}>{page}</PaginationLink>
              )}
            </PaginationItem>
          );
        })}

        <PaginationItem>
          {pageIndex < totalPages ? (
            <PaginationNext href={serialize({ ...allParams, pageIndex: pageIndex + 1 })} />
          ) : (
            <PaginationNext />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
