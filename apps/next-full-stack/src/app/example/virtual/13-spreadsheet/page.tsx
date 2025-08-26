import { generateRandomData } from '~/common/lib/faker/utils';
import SpreadsheetGrid from './grid';

export default function FixedGridPage() {
  const columns = generateRandomData(120, (index, generator) => ({
    id: `${index + 1}`,
    width: generator.number.int({ min: 90, max: 120 }),
  }));

  const data = generateRandomData(150_000, (index, generator) => ({
    id: `${index + 1}`,
    value: `${generator.color.human()} ${generator.animal.type()}`,
  }));

  return (
    <div>
      <h1>Tanstack Virtual Spreadsheet Grid</h1>
      <SpreadsheetGrid columns={columns} rows={data} />
    </div>
  );
}
