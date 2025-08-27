import { generateRandomData } from '~/common/lib/faker/utils';
import SpreadsheetGrid from './grid';

type Data = {
  id: string;
  value: string;
};

export default function FixedGridPage() {
  const columns = generateRandomData(20, (index, generator) => ({
    id: `${index + 1}`,
    width: generator.number.int({ min: 90, max: 160 }),
  }));

  const data = generateRandomData(500, (index, generator) => ({
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
