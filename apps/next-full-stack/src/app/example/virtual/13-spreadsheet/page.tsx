import { faker } from '@faker-js/faker/locale/ko';
import { Sheet } from './sheet';

export default function FixedGridPage() {
  const columns = Array.from({ length: 100 }).map((_, index) => ({
    id: `${index + 1}`,
    width: faker.number.int({ min: 90, max: 160 }),
  }));

  const data = Array.from({ length: 500_000 }).map((_, index) => ({
    id: `${index + 1}`,
    value: `${faker.color.human()} ${faker.animal.type()}`,
  }));

  return (
    <div>
      <h1>Tanstack Virtual Spreadsheet Grid</h1>
      <Sheet columns={columns} rows={data} />
    </div>
  );
}
