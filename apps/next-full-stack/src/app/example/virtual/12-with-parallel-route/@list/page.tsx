import { faker } from '@faker-js/faker/locale/ko';
import { delay } from '@monorepo-starter/utils/fn';
import { format } from '@monorepo-starter/utils/number';
import FixedRow from './row';

export type Row = {
  id: number;
  color: string;
  name: string;
  description: string;
  height: number;
};

export default async function FixedRowPage() {
  await delay(2000);

  const rows = Array.from({ length: 1500 }).map((_, index) => ({
    id: index + 1,
    color: faker.color.hsl({ format: 'css' }),
    name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
    description: faker.commerce.productDescription(),
    height: faker.number.int({ min: 40, max: 50 }),
  }));

  return (
    <div className="">
      <p>
        Total: <strong>{format(rows.length)}</strong> rows
      </p>
      <FixedRow rows={rows} />
    </div>
  );
}
