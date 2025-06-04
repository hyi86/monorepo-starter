import { generateRandomData } from '~/lib/faker/utils';
import NestedListForm from './form';
import { type Schema } from './schema';

export default function FormNestedListPage() {
  const generateRandomList = (count: number) => {
    return generateRandomData(count, (index, generator) => ({
      id: `id-${index}`,
      name: generator.person.fullName(),
      age: generator.number.int({ min: 17, max: 99 }),
      status: generator.helpers.arrayElement(['active', 'inactive']),
    }));
  };

  const data: Schema = {
    textInput1: 'test',
    items: generateRandomList(120),
  };

  return (
    <div>
      <h1>Next Server Action with Hook Form List</h1>
      <p>React Hook Form, Zod, Shadcn/UI, Next Server Action with Dnd Sortable, Tanstack Virtual</p>

      <NestedListForm data={data} />
    </div>
  );
}
