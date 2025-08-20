import { generateRandomData } from '~/shared/lib/faker-utils';
import FixedGrid from './grid';

export default function FixedGridPage() {
  const columns = generateRandomData(120, (index, generator) => ({
    id: `${index + 1}`,
    width: generator.number.int({ min: 90, max: 120 }),
  }));

  const data = generateRandomData(80_000, (index, generator) => ({
    id: `${index + 1}`,
    value: `${generator.color.human()} ${generator.animal.type()}`,
  }));

  return (
    <div>
      <h1>Tanstack Virtual Fixed Grid</h1>
      <FixedGrid columns={columns} rows={data} />
    </div>
  );
}
