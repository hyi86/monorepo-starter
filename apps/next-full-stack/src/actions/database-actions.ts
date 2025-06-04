'use server';

import { revalidateTag } from 'next/cache';
import { getTypedPath } from '~/app-path-types';
import { getUserById } from '~/db/users/get';
import { createRandomUsers, deleteUser, updateUser } from '~/db/users/set';
import { createRandomUser } from '~/db/utils';

/**
 * Action: 랜덤 유저 생성
 */
export const createRandomUserAction = async (formData: FormData) => {
  const count = formData.get('count');

  let countNumber = 1;
  if (count !== null) {
    countNumber = parseInt(count as string);
  }

  await createRandomUsers(countNumber);
  revalidateTag(getTypedPath('/example/db/crud'));
};

/**
 * Action: 유저 삭제
 */
export const deleteUserAction = async (id: number) => {
  await deleteUser(id);
  revalidateTag(getTypedPath('/example/db/crud'));
};

/**
 * Action: 유저 수정
 */
export const updateUserAction = async (id: number) => {
  const randomInfo = createRandomUser();
  await updateUser(id, { bio: randomInfo.bio });
  revalidateTag(getTypedPath('/example/db/crud'));
};

/**
 * Action: Toggle 유저 상태
 */
export const toggleUserStatusAction = async (id: number) => {
  const user = await getUserById(id);
  if (!user) {
    throw new Error('User not found');
  }

  await updateUser(id, { status: user.status === 'active' ? 'inactive' : 'active' });
  revalidateTag(getTypedPath('/example/db/crud'));
};
