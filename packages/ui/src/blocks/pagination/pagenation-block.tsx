import { format } from '@henry-hong/common-utils/number';
import { Button } from '@monorepo-starter/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@monorepo-starter/ui/components/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@monorepo-starter/ui/components/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@monorepo-starter/ui/components/select';
import { calculatePaginationRange } from '@monorepo-starter/ui/lib/pagination';
import { Table } from '@tanstack/react-table';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationBlockProps {
  // 공통 props
  totalPages: number;
  currentPage: number;
  pageSize: number;
  pageSizes?: number[];
  onPageSizeChange?: (size: number) => void;
  className?: string;

  // Server-side pagination props
  currentUrl?: string;
  serializeParams?: (url: string, params: any) => string;
  allParams?: any;
  LinkComponent?: React.ComponentType<{ href: string; children: React.ReactNode; [key: string]: any }>;

  // Client-side pagination props
  table?: Table<any>;
}

export function PaginationBlock({
  totalPages,
  currentPage,
  pageSize,
  pageSizes = [10, 20, 30, 50, 100, 200],
  onPageSizeChange,
  className = '',
  currentUrl,
  serializeParams,
  allParams,
  LinkComponent,
  table,
}: PaginationBlockProps) {
  const isServerSide = !!currentUrl && !!serializeParams && !!allParams;
  const isClientSide = !!table;

  if (totalPages <= 1) return null;

  const paginationRange = calculatePaginationRange({
    total: totalPages,
    siblings: 1,
    boundaries: 1,
    activePage: currentPage,
  });

  const handlePageChange = (page: number) => {
    if (isClientSide && table) {
      table.setPageIndex(page - 1);
    }
  };

  const handlePageSizeChange = (size: number) => {
    if (isClientSide && table) {
      table.setPageSize(size);
    } else if (onPageSizeChange) {
      onPageSizeChange(size);
    }
  };

  const canGoPrevious = isClientSide ? table?.getCanPreviousPage() : currentPage > 1;
  const canGoNext = isClientSide ? table?.getCanNextPage() : currentPage < totalPages;

  return (
    <div className={`flex items-center justify-between gap-3 max-sm:flex-col ${className}`}>
      <p className="text-muted-foreground flex-1 space-x-1 whitespace-nowrap text-sm" aria-live="polite">
        <span>Page</span>
        <span className="text-foreground">{currentPage}</span>
        <span>of</span>
        <span className="text-foreground">{format(totalPages)}</span>
      </p>

      <div className="grow">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {isServerSide && LinkComponent ? (
                <PaginationLink asChild>
                  <LinkComponent
                    href={serializeParams!(currentUrl!, { ...allParams, pageIndex: currentPage - 1 })}
                    aria-label="Go to previous page"
                    aria-disabled={!canGoPrevious ? true : undefined}
                    role={!canGoPrevious ? undefined : 'link'}
                  >
                    <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
                  </LinkComponent>
                </PaginationLink>
              ) : (
                <PaginationLink
                  href="#"
                  aria-label="Go to previous page"
                  aria-disabled={!canGoPrevious ? true : undefined}
                  role={canGoPrevious ? 'link' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    if (canGoPrevious) {
                      handlePageChange(currentPage - 1);
                    }
                  }}
                >
                  <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
                </PaginationLink>
              )}
            </PaginationItem>

            {paginationRange.map((page, index) => {
              if (page === 'dots') {
                return (
                  <PaginationItem key={'dots' + index}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem key={'page' + index}>
                  {isServerSide && LinkComponent ? (
                    <PaginationLink asChild isActive={currentPage === page}>
                      <LinkComponent href={serializeParams!(currentUrl!, { ...allParams, pageIndex: page })}>
                        {page}
                      </LinkComponent>
                    </PaginationLink>
                  ) : (
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              );
            })}

            <PaginationItem>
              {isServerSide && LinkComponent ? (
                <PaginationLink asChild>
                  <LinkComponent
                    href={serializeParams!(currentUrl!, { ...allParams, pageIndex: currentPage + 1 })}
                    aria-label="Go to next page"
                    aria-disabled={!canGoNext ? true : undefined}
                    role={!canGoNext ? undefined : 'link'}
                  >
                    <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
                  </LinkComponent>
                </PaginationLink>
              ) : (
                <PaginationLink
                  href="#"
                  aria-label="Go to next page"
                  aria-disabled={!canGoNext ? true : undefined}
                  role={canGoNext ? 'link' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    if (canGoNext) {
                      handlePageChange(currentPage + 1);
                    }
                  }}
                >
                  <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
                </PaginationLink>
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="flex flex-1 justify-end">
        {isServerSide && LinkComponent ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {pageSize}
                <ChevronDown className="-me-1 ms-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {pageSizes.map((size) => (
                <DropdownMenuItem asChild key={size}>
                  <LinkComponent href={serializeParams!(currentUrl!, { ...allParams, pageIndex: 1, pageSize: size })}>
                    {size}
                  </LinkComponent>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Select value={pageSize.toString()} onValueChange={(value) => handlePageSizeChange(Number(value))}>
            <SelectTrigger id="page-size">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {pageSizes.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}
