import { generateRandomData } from '~/shared/lib/faker-utils';
import FixedGrid from './grid';

export default function FixedGridPage() {
  const columns = generateRandomData(120, (index, generator) => ({
    id: `${index + 1}`,
    width: generator.number.int({ min: 100, max: 150 }),
  }));

  const rows = generateRandomData(50_000, (index, generator) => ({
    id: `${index + 1}`,
    text: `Row ${index + 1}`,
    height: generator.number.int({ min: 50, max: 80 }),
  }));

  return (
    <div>
      <h1>Tanstack Virtual Fixed Grid</h1>
      <FixedGrid columns={columns} rows={rows} />
    </div>
  );
}
