import { floor } from '@henry-hong/common-utils/math';
import { createRandomUser } from '~/db/utils';
import { getGlobalUserList, setGlobalUserList, User } from './get';

export type InsertUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

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
