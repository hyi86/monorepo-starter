import { PaginationBlock } from '@monorepo-starter/ui/blocks/pagination';
import { TableBody, TableCell, TableHeader, TableRow } from '@monorepo-starter/ui/components/table';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { formatDate } from '@monorepo-starter/utils/date';
import { floor } from '@monorepo-starter/utils/math';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import { cachedGetUsers } from '~/entities/user/model/user.selector';
import { FuzzySearch } from './fuzzy-search';
import { pageSizes, searchParamsCache, serialize } from './search-params';
import { TableFilters } from './server-filters';
import { SortHeader } from './sort-header';

export default async function TableServerControlsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const cookieStore = await cookies();
  const currentUrl = cookieStore.get('next-pathname')?.value || '/';

  const { pageIndex, pageSize, orderBy, sortDirection, email, name, gender, birthFrom, search } =
    await searchParamsCache.parse(searchParams);

  const data = await cachedGetUsers({
    offset: (pageIndex - 1) * Number(pageSize),
    limit: Number(pageSize),
    orderBy,
    sortDirection,
    email: email || undefined,
    name: name || undefined,
    gender: gender || undefined,
    birthFrom: birthFrom || undefined,
    search: search || undefined,
  });

  const totalPages = floor(data.totalCount / Number(pageSize));

  return (
    <div className="size-full">
      <h1 className="mb-4 text-xl font-semibold">Table with Controls - Server Components Only</h1>
      <div className="space-y-3">
        <FuzzySearch currentUrl={currentUrl} allParams={searchParamsCache.all()} />
        <TableFilters currentUrl={currentUrl} />
        <div
          data-slot="table-container"
          className="relative max-h-[65dvh] w-[calc(95vw-var(--sidebar-width))] overflow-auto"
        >
          <table data-slot="table" className={cn('w-full caption-bottom text-sm')}>
            <TableHeader>
              <TableRow>
                <SortHeader name="id" currentUrl={currentUrl}>
                  ID
                </SortHeader>
                <SortHeader name="loginId" currentUrl={currentUrl}>
                  Login ID
                </SortHeader>
                <SortHeader name="name" currentUrl={currentUrl}>
                  Name
                </SortHeader>
                <SortHeader name="email" currentUrl={currentUrl}>
                  Email
                </SortHeader>
                <SortHeader name="gender" currentUrl={currentUrl}>
                  Gender
                </SortHeader>
                <SortHeader name="birth" currentUrl={currentUrl}>
                  Birth
                </SortHeader>
                <SortHeader name="contact" currentUrl={currentUrl}>
                  Contact
                </SortHeader>
                <SortHeader name="bio" currentUrl={currentUrl}>
                  Bio
                </SortHeader>
                <SortHeader name="status" currentUrl={currentUrl}>
                  Status
                </SortHeader>
                <SortHeader name="createdAt" currentUrl={currentUrl}>
                  Created At
                </SortHeader>
                <SortHeader name="updatedAt" currentUrl={currentUrl}>
                  Updated At
                </SortHeader>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.rows.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    <div className="not-prose flex items-center gap-1.5">
                      <Image
                        src={item.profile?.avatar || ''}
                        alt={item.name}
                        width={256}
                        height={256}
                        className="size-8 rounded-full"
                      />
                      <span className="truncate">{item.loginId}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell className="text-center">{item.gender}</TableCell>
                  <TableCell className="text-center">{item.birth}</TableCell>
                  <TableCell className="text-center">{item.contact}</TableCell>
                  <TableCell>{item.bio}</TableCell>
                  <TableCell className="text-center">{item.status}</TableCell>
                  <TableCell className="text-center">{formatDate(item.createdAt * 1000, 'iso9075')}</TableCell>
                  <TableCell className="text-center">{formatDate(item.updatedAt * 1000, 'iso9075')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </table>
        </div>
        <PaginationBlock
          totalPages={totalPages}
          currentPage={pageIndex}
          pageSize={Number(pageSize)}
          pageSizes={pageSizes.map(Number)}
          currentUrl={currentUrl}
          serializeParams={serialize}
          allParams={searchParamsCache.all()}
          LinkComponent={Link}
        />
      </div>
    </div>
  );
}
