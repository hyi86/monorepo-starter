import { eq } from 'drizzle-orm';
import { db } from '~/db';
import { usersTable } from '~/db/schema';
import { createRandomUser } from '~/db/utils';

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
