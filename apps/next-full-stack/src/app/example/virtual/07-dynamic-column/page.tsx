import { faker } from '@faker-js/faker/locale/ko';
import VirtualDynamicColumn from './client';

export default function DynamicColumnPage() {
  const randomNumber = (min: number, max: number) => faker.number.int({ min, max });
  const sentences = Array.from({ length: 10_000 }).map(() => faker.lorem.sentence(randomNumber(20, 70)));

  return (
    <div>
      <h1>Tanstack Virtual Dynamic Column</h1>
      <VirtualDynamicColumn sentences={sentences} />
    </div>
  );
}
