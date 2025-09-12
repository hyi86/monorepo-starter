import { delay } from '@monorepo-starter/utils/fn';

export default async function AppRouteParallelLayout(props: LayoutProps<'/example/virtual/12-with-parallel-route'>) {
  await delay(1000);
  return (
    <div>
      <h1>Next.js Parallel Route With Virtualize</h1>
      {props.children}
      <div className="flex">
        <div className="flex-1 md:w-1/2">{props.list}</div>
        <div className="md:w-1/2">{props.detail}</div>
      </div>
    </div>
  );
}
