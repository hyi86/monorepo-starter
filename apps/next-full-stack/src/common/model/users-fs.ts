import { floor } from '@henry-hong/common-utils/math';
import { sort } from 'fast-sort';
import Fuse from 'fuse.js';
import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import { z } from 'zod';
import { env } from '~/common/config/env';
import { createRandomUser, toUnix } from '~/common/lib/db-utils';

const rootPath = process.cwd();

export type User = {
  id: number;
  loginId: string;
  name: string;
  email: string | null;
  gender: 'male' | 'female' | null;
  birth: string | null;
  contact: string | null;
  profile: Record<string, string> | null;
  bio: string | null;
  status: 'active' | 'inactive';
  createdAt: number;
  updatedAt: number;
};
export type Gender = Exclude<User['gender'], null>;
export type Status = Exclude<User['status'], null>;

export type InsertUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export const keys = [
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

export const findUsersSchema = z.object({
  // pagination
  offset: z.coerce.number().default(0),
  limit: z.coerce.number().default(50),
  // sorting
  orderBy: z.enum(keys).default('id'),
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

export function getGlobalUserList(): User[] {
  const cachePath = path.join(rootPath, env.CACHE_PATH);
  try {
    fs.accessSync(cachePath, fs.constants.F_OK);
  } catch {
    fs.mkdirSync(cachePath, { recursive: true });
  }

  try {
    const dataJson = fs.readFileSync(path.join(cachePath, 'users-data.json'), 'utf8');
    const data = JSON.parse(dataJson) as User[];
    if (data.length === 0) {
      throw new Error('No data');
    }
    return data;
  } catch {
    const users: User[] = [];
    for (let i = 0; i < 10; i++) {
      const userData = createRandomUser();
      users.push({
        id: i + 1,
        ...userData,
        status: 'active',
        createdAt: floor(new Date().getTime() / 1000),
        updatedAt: floor(new Date().getTime() / 1000),
      });
    }
    fs.writeFileSync(path.join(cachePath, 'users-data.json'), JSON.stringify(users, null, 2));
    return users;
  }
}

export function setGlobalUserList(users: User[]) {
  const cachePath = path.join(rootPath, env.CACHE_PATH);
  fs.writeFileSync(path.join(cachePath, 'users-data.json'), JSON.stringify(users, null, 2));
}

/**
 * 유저 목록 조회
 */
export async function getUsers(queryParams: Partial<z.infer<typeof findUsersSchema>>) {
  try {
    const globalUserList = getGlobalUserList();

    const params = findUsersSchema.safeParse(queryParams).data;
    if (!params) {
      return { totalCount: 0, rows: [] };
    }

    let resultRows = [...globalUserList];

    if (params.idFrom) {
      resultRows = resultRows.filter((user) => user.id >= params.idFrom!);
    }
    if (params.idTo) {
      resultRows = resultRows.filter((user) => user.id <= params.idTo!);
    }
    if (params.loginId) {
      resultRows = resultRows.filter((user) => user.loginId.includes(params.loginId!));
    }
    if (params.name) {
      resultRows = resultRows.filter((user) => user.name.includes(params.name!));
    }
    if (params.email) {
      resultRows = resultRows.filter((user) => user.email?.includes(params.email!));
    }
    if (params.gender) {
      resultRows = resultRows.filter((user) => user.gender === params.gender);
    }
    if (params.birthFrom) {
      resultRows = resultRows.filter((user) => user.birth && user.birth >= params.birthFrom!);
    }
    if (params.birthTo) {
      resultRows = resultRows.filter((user) => user.birth && user.birth <= params.birthTo!);
    }
    if (params.contact) {
      resultRows = resultRows.filter((user) => user.contact?.includes(params.contact!));
    }
    if (params.bio) {
      resultRows = resultRows.filter((user) => user.bio?.includes(params.bio!));
    }
    if (params.status) {
      resultRows = resultRows.filter((user) => user.status === params.status);
    }
    if (params.createdAtFrom) {
      resultRows = resultRows.filter((user) => user.createdAt >= params.createdAtFrom!);
    }
    if (params.createdAtTo) {
      resultRows = resultRows.filter((user) => user.createdAt <= params.createdAtTo!);
    }
    if (params.updatedAtFrom) {
      resultRows = resultRows.filter((user) => user.updatedAt >= params.updatedAtFrom!);
    }
    if (params.updatedAtTo) {
      resultRows = resultRows.filter((user) => user.updatedAt <= params.updatedAtTo!);
    }
    if (params.createdAtKstFrom) {
      resultRows = resultRows.filter((user) => user.createdAt >= toUnix(params.createdAtKstFrom!));
    }
    if (params.createdAtKstTo) {
      resultRows = resultRows.filter((user) => user.createdAt <= toUnix(params.createdAtKstTo!));
    }
    if (params.updatedAtKstFrom) {
      resultRows = resultRows.filter((user) => user.updatedAt >= toUnix(params.updatedAtKstFrom!));
    }
    if (params.updatedAtKstTo) {
      resultRows = resultRows.filter((user) => user.updatedAt <= toUnix(params.updatedAtKstTo!));
    }
    if (params.search) {
      const fuse = new Fuse(resultRows, {
        keys: ['loginId', 'name', 'email', 'contact', 'bio'],
        threshold: 0.3, // 0 = 정확, 1 = 느슨
        includeScore: true,
      });
      const result = fuse.search(params.search);
      resultRows = result.map((row) => {
        row.item.profile = {
          avatar: row.item.profile?.avatar ?? '',
          score: row.score?.toString() ?? '0',
        };
        return row.item;
      });
    }

    // 정렬
    if (params.orderBy && params.sortDirection) {
      const orderByColumn = params.orderBy as keyof User;
      if (params.sortDirection === 'asc') {
        resultRows = sort(resultRows).by([{ asc: (a: User) => a[orderByColumn] }]);
      } else {
        resultRows = sort(resultRows).by([{ desc: (a: User) => a[orderByColumn] }]);
      }
    }

    const totalCount = resultRows.length;
    if (totalCount === 0) {
      return { totalCount, rows: [] };
    }

    const rows = resultRows.slice(params.offset, params.offset + params.limit);

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
  const globalUserList = getGlobalUserList();
  return globalUserList.find((user) => user.id === id) || null;
}

/**
 * 유저 생성(Multiple)
 */
export async function createUsers(users: InsertUser[]) {
  const globalUserList = getGlobalUserList();
  let maxId = globalUserList.length;

  for (const user of users) {
    maxId = maxId + 1;
    globalUserList.push({
      id: maxId,
      ...user,
      createdAt: floor(new Date().getTime() / 1000),
      updatedAt: floor(new Date().getTime() / 1000),
    });
  }

  setGlobalUserList(globalUserList);
}

/**
 * 유저 수정
 */
export async function updateUser(id: number, user: Partial<User>) {
  const globalUserList = getGlobalUserList();
  const index = globalUserList.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new Error('User not found');
  }
  globalUserList[index] = { ...globalUserList[index], ...user, updatedAt: floor(new Date().getTime() / 1000) } as User;
  setGlobalUserList(globalUserList);
}

/**
 * 유저 삭제
 */
export async function deleteUser(id: number) {
  const globalUserList = getGlobalUserList();
  const index = globalUserList.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new Error('User not found');
  }
  globalUserList.splice(index, 1);
  setGlobalUserList(globalUserList);
}

/**
 * 랜덤 유저 생성
 */
export async function createRandomUsers(count: number = 1) {
  const users: InsertUser[] = [];
  for (let i = 0; i < count; i++) {
    users.push({ ...createRandomUser(), status: 'active' });
  }
  await createUsers(users);
}
