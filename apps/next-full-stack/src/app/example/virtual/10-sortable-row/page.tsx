import { generateRandomData } from '~/shared/lib/faker/utils';
import FixedRow from './rows';

export default function FixedSortableRowPage() {
  const data = generateRandomData(100_000, (index, generator) => {
    const category = generator.food.ethnicCategory();
    const adjective = generator.food.adjective();
    const name = generator.helpers.arrayElement([
      generator.food.fruit(),
      generator.food.vegetable(),
      generator.food.meat(),
    ]);
    const id = (index + 1).toString();
    const text = `${category} ${adjective} ${name}`;

    return {
      id,
      text,
    };
  });

  return (
    <div>
      <h1>Tanstack Virtual + DnD Sortable Row</h1>
      <FixedRow rows={data} />
    </div>
  );
}
