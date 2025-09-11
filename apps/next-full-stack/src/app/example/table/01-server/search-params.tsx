import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  type UrlKeys,
} from 'nuqs/server';

const keys = [
  'id',
  'loginId',
  'name',
  'email',
  'gender',
  'birth',
  'contact',
  'profile',
  'bio',
  'status',
  'createdAt',
  'updatedAt',
] as const;
export type OrderByKey = (typeof keys)[number];

export const pageSizes = ['5', '10', '20', '30', '50', '100'] as const;
export type PageSizes = (typeof pageSizes)[number];

export const parsers = {
  // pagination
  pageIndex: parseAsInteger.withDefault(1),
  pageSize: parseAsStringLiteral(pageSizes).withDefault('5'),
  // sorting
  orderBy: parseAsStringLiteral(keys).withDefault('id'),
  sortDirection: parseAsStringLiteral(['asc', 'desc']).withDefault('desc'),
  // filters
  email: parseAsString,
  name: parseAsString,
  gender: parseAsStringLiteral(['male', 'female']),
  birthFrom: parseAsString,
  search: parseAsString.withDefault(''),
};

export const urlKeys: UrlKeys<typeof parsers> = {
  sortDirection: 'orderDir',
  pageIndex: 'page',
  pageSize: 'size',
};

export const searchParamsCache = createSearchParamsCache(parsers, {
  urlKeys,
});

export const serialize = createSerializer(parsers, {
  urlKeys,
});
