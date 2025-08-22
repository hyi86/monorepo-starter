import { formatDate } from '@henry-hong/common-utils/date';
import { romanizedSurnames } from '@henry-hong/common-utils/string';
import { generator } from '~/common/lib/faker-utils';

// date to unix epoch
export function toUnix(dateStr: string) {
  return new Date(dateStr).getTime() / 1000;
}

/**
 * 랜덤 유저 정보
 */
export function createRandomUser() {
  const gender = generator.person.sexType();
  const lastName = generator.person.lastName();
  const firstName = generator.person.firstName(gender);
  const romanizedLastName = romanizedSurnames[lastName as keyof typeof romanizedSurnames] ?? undefined;
  const birth = generator.date.birthdate({ min: 16, max: 65, mode: 'age' });

  return {
    loginId: generator.internet.username({ firstName, lastName: romanizedLastName }),
    name: `${lastName}${firstName}`,
    email: generator.internet.email({ lastName: romanizedLastName, allowSpecialCharacters: false }),
    gender,
    birth: formatDate(birth, 'iso9075/date'),
    contact: `010-${generator.finance.pin(4)}-${generator.finance.pin(4)}`,
    profile: {
      avatar: generator.image.personPortrait({ sex: gender, size: 256 }),
    },
    bio: generator.person.bio(),
  };
}
