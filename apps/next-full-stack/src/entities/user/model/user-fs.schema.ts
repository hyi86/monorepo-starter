import z from 'zod';

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
