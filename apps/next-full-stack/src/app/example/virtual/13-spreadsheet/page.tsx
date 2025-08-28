import { generateRandomData } from '~/common/lib/faker/utils';
import { Sheet } from './sheet';

export default function FixedGridPage() {
  const columns = generateRandomData(100, (index, generator) => ({
    id: `${index + 1}`,
    width: generator.number.int({ min: 90, max: 160 }),
  }));

  const data = generateRandomData(500_000, (index, generator) => ({
    id: `${index + 1}`,
    value: `${generator.color.human()} ${generator.animal.type()}`,
  }));

  return (
    <div>
      <h1>Tanstack Virtual Spreadsheet Grid</h1>
      <Sheet columns={columns} rows={data} />
    </div>
  );
}
