import { and, asc, desc, eq, getTableColumns, gte, like, lte } from 'drizzle-orm';
import Fuse from 'fuse.js';
import { cache } from 'react';
import { z } from 'zod';
import { db } from '~/common/lib/db-client';
import { usersTable } from '~/common/model/schema';
import { createRandomUser, toUnix } from '~/features/user/lib/db-utils';

export type User = typeof usersTable.$inferSelect;
export type Gender = (typeof usersTable.gender.enumValues)[number];
export type Status = (typeof usersTable.status.enumValues)[number];

export const keys = Object.keys(getTableColumns(usersTable)) as (keyof User)[];

export const findUsersSchema = z.object({
  // pagination
  offset: z.coerce.number().default(0),
  limit: z.coerce.number().default(50),
  // sorting
  orderBy: z.enum(Object.keys(getTableColumns(usersTable)) as [string, ...string[]]).default('id'),
  sortDirection: z.enum(['asc', 'desc']).default('desc'),
  // filters
  idFrom: z.coerce.number().optional(), // range start
  idTo: z.coerce.number().optional(), // range end
  loginId: z.string().optional(), // like
  name: z.string().optional(), // like
  email: z.string().optional(), // like
  gender: z.enum(['male', 'female']).optional(), // eq
  birthFrom: z.iso.date().optional(), // range start
  birthTo: z.iso.date().optional(), // range end
  contact: z.string().optional(), // like
  bio: z.string().optional(), // like
  status: z.enum(['active', 'inactive']).optional(), // eq enum
  createdAtFrom: z.coerce.number().optional(), // range start(unix epoch) e.g. 1746594475
  createdAtTo: z.coerce.number().optional(), // range end(unix epoch) e.g. 1746594475
  updatedAtFrom: z.coerce.number().optional(), // range start(unix epoch) e.g. 1746594475
  updatedAtTo: z.coerce.number().optional(), // range end(unix epoch) e.g. 1746594475
  createdAtKstFrom: z.string().optional(), // range start(kst) e.g. 2025-05-07%2010:27:55
  createdAtKstTo: z.string().optional(), // range end(kst) e.g. 2025-05-07%2010:27:55
  updatedAtKstFrom: z.string().optional(), // range start(kst) e.g. 2025-05-07%2010:27:55
  updatedAtKstTo: z.string().optional(), // range end(kst) e.g. 2025-05-07%2010:27:55
  // fuzzy search
  search: z.string().optional(),
});

/**
 * 유저 목록 조회
 */
export async function getUsers(queryParams: Partial<z.infer<typeof findUsersSchema>>) {
  try {
    const params = findUsersSchema.safeParse(queryParams).data;
    if (!params) {
      return { totalCount: 0, rows: [] };
    }

    const filters = [
      params.idFrom ? gte(usersTable.id, params.idFrom) : undefined,
      params.idTo ? lte(usersTable.id, params.idTo) : undefined,
      params.loginId ? like(usersTable.loginId, `%${params.loginId}%`) : undefined,
      params.name ? like(usersTable.name, `%${params.name}%`) : undefined,
      params.email ? like(usersTable.email, `%${params.email}%`) : undefined,
      params.gender ? eq(usersTable.gender, params.gender) : undefined,
      params.birthFrom ? gte(usersTable.birth, params.birthFrom) : undefined,
      params.birthTo ? lte(usersTable.birth, params.birthTo) : undefined,
      params.contact ? like(usersTable.contact, `%${params.contact}%`) : undefined,
      params.bio ? like(usersTable.bio, `%${params.bio}%`) : undefined,
      params.status ? eq(usersTable.status, params.status) : undefined,
      params.createdAtFrom ? gte(usersTable.createdAt, params.createdAtFrom) : undefined,
      params.createdAtTo ? lte(usersTable.createdAt, params.createdAtTo) : undefined,
      params.updatedAtFrom ? gte(usersTable.updatedAt, params.updatedAtFrom) : undefined,
      params.updatedAtTo ? lte(usersTable.updatedAt, params.updatedAtTo) : undefined,
      params.createdAtKstFrom ? gte(usersTable.createdAt, toUnix(params.createdAtKstFrom)) : undefined,
      params.createdAtKstTo ? lte(usersTable.createdAt, toUnix(params.createdAtKstTo)) : undefined,
      params.updatedAtKstFrom ? gte(usersTable.updatedAt, toUnix(params.updatedAtKstFrom)) : undefined,
      params.updatedAtKstTo ? lte(usersTable.updatedAt, toUnix(params.updatedAtKstTo)) : undefined,
    ].filter(Boolean);

    const whereQuery = and(...filters.filter(Boolean));
    const totalCount = await db.$count(usersTable, whereQuery);
    if (totalCount === 0) {
      return { totalCount, rows: [] };
    }

    const orderByValue = params.orderBy as keyof User;

    const rows = await db
      .select(getTableColumns(usersTable))
      .from(usersTable)
      .where(whereQuery)
      .orderBy(params.sortDirection === 'asc' ? asc(usersTable[orderByValue]) : desc(usersTable[orderByValue]))
      .offset(params.offset)
      .limit(params.limit);

    if (params.search) {
      const fuse = new Fuse(rows, {
        keys: ['loginId', 'name', 'email', 'contact', 'bio'],
        threshold: 0.3, // 0 = 정확, 1 = 느슨
        includeScore: true,
      });
      const result = fuse.search(params.search);
      return {
        totalCount,
        rows: result.map((row) => {
          row.item.profile = {
            avatar: row.item.profile?.avatar ?? '',
            score: row.score?.toString() ?? '0',
          };
          return row.item;
        }),
      };
    }

    return { totalCount, rows };
  } catch (error) {
    console.error(error);
    return { totalCount: 0, rows: [] };
  }
}

/**
 * 유저 목록 조회 (Cache)
 */
export const cachedGetUsers = cache(getUsers);

/**
 * 유저 조회
 */
export async function getUserById(id: number) {
  const row = await db.select().from(usersTable).where(eq(usersTable.id, id));
  return row[0] || null;
}

/**
 * 유저 생성(Multiple)
 */
export async function createUsers(users: (typeof usersTable.$inferInsert)[]) {
  const row = await db.insert(usersTable).values(users);
  return row.changes;
}

/**
 * 유저 수정
 */
export async function updateUser(id: number, user: Partial<typeof usersTable.$inferSelect>) {
  const row = await db.update(usersTable).set(user).where(eq(usersTable.id, id));
  return row.changes;
}

/**
 * 유저 삭제
 */
export async function deleteUser(id: number) {
  const row = await db.delete(usersTable).where(eq(usersTable.id, id));
  return row.changes;
}

/**
 * 랜덤 유저 생성
 */
export async function createRandomUsers(count: number = 1) {
  const users: (typeof usersTable.$inferInsert)[] = [];
  for (let i = 0; i < count; i++) {
    users.push(createRandomUser());
  }

  await createUsers(users);
}
