'use client';

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
import { Table } from '@tanstack/react-table';
import { Data } from './columns';

export function PaginationBlock({ table }: { table: Table<Data> }) {
  const totalPages = table.getPageCount();
  const paginationRange = calculatePaginationRange({
    total: totalPages,
    siblings: 1,
    boundaries: 1,
    activePage: table.getState().pagination.pageIndex,
  });

  if (table.getPageCount() <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => {
              if (!table.getCanPreviousPage()) return;
              table.previousPage();
            }}
          />
        </PaginationItem>

        {paginationRange.map((page, index) => {
          if (page === 'dots') {
            return (
              <PaginationItem key={`dots-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              {page === table.getState().pagination.pageIndex + 1 ? (
                <PaginationLink isActive>{page}</PaginationLink>
              ) : (
                <PaginationLink
                  href="#"
                  onClick={() => {
                    table.setPageIndex(page - 1);
                  }}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => {
              if (!table.getCanNextPage()) return;
              table.nextPage();
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
