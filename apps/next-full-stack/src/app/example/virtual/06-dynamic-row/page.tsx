import { generateRandomData } from '~/common/lib/faker/utils';
import VirtualDynamicRow from './row';

export default function VirtualDynamicRowPage() {
  const sentences = generateRandomData(10_000, (_index, faker) => faker.lorem.sentence());
  return (
    <div>
      <h1>Tanstack Virtual Dynamic Row</h1>
      <VirtualDynamicRow sentences={sentences} />
    </div>
  );
}
