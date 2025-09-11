import { faker } from '@faker-js/faker/locale/ko';
import FixedGrid from './grid';

export default function FixedGridPage() {
  const columns = Array.from({ length: 120 }).map((_, index) => ({
    id: `${index + 1}`,
    width: faker.number.int({ min: 90, max: 120 }),
  }));

  const data = Array.from({ length: 150_000 }).map((_, index) => ({
    id: `${index + 1}`,
    value: `${faker.color.human()} ${faker.animal.type()}`,
  }));

  return (
    <div>
      <h1>Tanstack Virtual Fixed Grid</h1>
      <FixedGrid columns={columns} rows={data} />
    </div>
  );
}
