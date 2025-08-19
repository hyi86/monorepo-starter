'use server';

import { revalidateTag } from 'next/cache';
import { getTypedPath } from '~/app-path-types';
import { createRandomUser } from '~/shared/lib/db-utils';
import { getUserById } from '~/shared/model/users/get';
import { createRandomUsers, deleteUser, updateUser } from '~/shared/model/users/set';

/**
 * 랜덤 유저 생성 Action
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
 * 유저 삭제 Action
 */
export const deleteUserAction = async (id: number) => {
  await deleteUser(id);
  revalidateTag(getTypedPath('/example/db/crud'));
};

/**
 * 유저 수정 Action
 */
export const updateUserAction = async (id: number) => {
  const randomInfo = createRandomUser();
  await updateUser(id, { bio: randomInfo.bio });
  revalidateTag(getTypedPath('/example/db/crud'));
};

/**
 * 유저 상태 Toggle Action
 */
export const toggleUserStatusAction = async (id: number) => {
  const user = await getUserById(id);
  if (!user) {
    throw new Error('User not found');
  }

  await updateUser(id, { status: user.status === 'active' ? 'inactive' : 'active' });
  revalidateTag(getTypedPath('/example/db/crud'));
};
