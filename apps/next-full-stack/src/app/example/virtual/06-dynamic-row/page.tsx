import { faker } from '@faker-js/faker/locale/ko';
import VirtualDynamicRow from './row';

export default function VirtualDynamicRowPage() {
  const sentences = Array.from({ length: 10_000 }).map(() => faker.lorem.sentence());
  return (
    <div>
      <h1>Tanstack Virtual Dynamic Row</h1>
      <VirtualDynamicRow sentences={sentences} />
    </div>
  );
}
