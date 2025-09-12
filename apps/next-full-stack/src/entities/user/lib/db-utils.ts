import { faker } from '@faker-js/faker/locale/ko';
import { formatDate } from '@monorepo-starter/utils/date';
import { romanizedSurnames } from '@monorepo-starter/utils/string';

/**
 * 랜덤 유저 정보 생성
 */
export function createRandomUser() {
  const gender = faker.person.sexType();
  const lastName = faker.person.lastName();
  const firstName = faker.person.firstName(gender);
  const romanizedLastName = romanizedSurnames[lastName as keyof typeof romanizedSurnames] ?? undefined;
  const birth = faker.date.birthdate({ min: 16, max: 65, mode: 'age' });

  return {
    loginId: faker.internet.username({ firstName, lastName: romanizedLastName }),
    name: `${lastName}${firstName}`,
    email: faker.internet.email({ lastName: romanizedLastName, allowSpecialCharacters: false }),
    gender,
    birth: formatDate(birth, 'iso9075/date'),
    contact: `010-${faker.finance.pin(4)}-${faker.finance.pin(4)}`,
    profile: {
      avatar: faker.image.personPortrait({ sex: gender, size: 256 }),
    },
    bio: faker.person.bio(),
  };
}
