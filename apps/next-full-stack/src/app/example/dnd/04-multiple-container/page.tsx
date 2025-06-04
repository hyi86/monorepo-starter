import { generateRandomData } from '~/lib/faker/utils';
import { Container } from './container';

export default function ExampleDndMultipleContainerPage() {
  const generateItems = (length: number) => {
    return generateRandomData(length, (index, generator) => ({
      id: `id-${index}`,
      name: [generator.food.adjective(), generator.food.dish()].join('-'),
    }));
  };

  const data = {
    A: generateItems(10),
    B: generateItems(10),
    C: generateItems(10),
  };

  return (
    <div>
      <h1>Sortable Multiple Container</h1>
      <Container data={data} />
    </div>
  );
}
