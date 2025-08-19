import { generateRandomData, generator } from '~/shared/lib/faker-utils';
import VirtualDynamicColumn from './column';

export default function DynamicColumnPage() {
  const randomNumber = (min: number, max: number) => generator.number.int({ min, max });
  const sentences = generateRandomData(10_000, (_index, faker) => faker.lorem.sentence(randomNumber(20, 70)));

  return (
    <div>
      <h1>Tanstack Virtual Dynamic Column</h1>
      <VirtualDynamicColumn sentences={sentences} />
    </div>
  );
}
