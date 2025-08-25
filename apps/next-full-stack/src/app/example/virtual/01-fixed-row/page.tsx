import { format } from '@henry-hong/common-utils/number';
import { generateRandomData } from '~/common/lib/faker/utils';
import FixedRow from './row';

export type Row = {
  id: number;
  color: string;
  name: string;
  description: string;
  height: number;
};

export default function FixedRowPage() {
  const rows = generateRandomData(100_005, (index, generator) => ({
    id: index + 1,
    color: generator.color.hsl({ format: 'css' }),
    name: `${generator.commerce.productAdjective()} ${generator.commerce.product()}`,
    description: generator.commerce.productDescription(),
    height: generator.number.int({ min: 40, max: 50 }),
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
