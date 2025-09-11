import { faker } from '@faker-js/faker/locale/ko';
import { format } from '@henry-hong/common-utils/number';
import FixedRow from './row';

export type Row = {
  id: number;
  color: string;
  name: string;
  description: string;
  height: number;
};

export default function FixedRowPage() {
  const rows = Array.from({ length: 100_005 }).map((_, index) => ({
    id: index + 1,
    color: faker.color.hsl({ format: 'css' }),
    name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
    description: faker.commerce.productDescription(),
    height: faker.number.int({ min: 40, max: 50 }),
  }));

  return (
    <div>
      <h1>Tanstack Virtual Fixed Row</h1>
      <p>
        Total: <strong>{format(rows.length)}</strong> rows
      </p>
      <FixedRow rows={rows} />
    </div>
  );
}
