import { cachedGetUsers } from '~/db/users/get';
import TableClientBasic from './components/table';

export default async function TableClientFullPage() {
  const data = await cachedGetUsers({ offset: 0, limit: 500 });
  return (
    <>
      <h1>Tanstack Table Data Grid (Client Component)</h1>
      <TableClientBasic data={data.rows} />
    </>
  );
}
