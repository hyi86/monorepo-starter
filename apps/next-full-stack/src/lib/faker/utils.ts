import { type Faker, fakerKO as faker } from '@faker-js/faker';

export function generateRandomData<T>(count: number, callback: (index: number, generator: Faker) => T) {
  return Array.from({ length: count }, (_, index) => callback(index, generator)) as T[];
}

export const generator = faker;
