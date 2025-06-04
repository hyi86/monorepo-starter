import { colors, devLog } from '@monorepo-starter/utils/console';
import { Table } from 'console-table-printer';
import path from 'node:path';

export function reportResult(
  workspace: string,
  result: { local: Record<string, number>; external: Record<string, number> },
) {
  devLog('info', `report result ${colors.green(workspace)}...`);

  const table = new Table({
    columns: [
      { name: 'Types', alignment: 'center' },
      { name: 'Path', alignment: 'left' },
      { name: 'Count', alignment: 'right' },
    ],
  });

  Object.entries(result.local).forEach(([key, value], index) => {
    const workspacePath = path.join(workspace, key);
    const formattedKey = value === 0 ? colors.dim2(workspacePath) : colors.white(workspacePath);
    const formattedValue = formatNumber(value);

    table.addRow(
      {
        Types: colors.cyan('Local'),
        Path: formattedKey,
        Count: formattedValue,
      },
      {
        separator: index === Object.entries(result.local).length - 1,
      },
    );
  });

  Object.entries(result.external).forEach(([key, value]) => {
    const formattedKey = value === 0 ? colors.dim2(key) : colors.white(key);
    const formattedValue = formatNumber(value);

    table.addRow({
      Types: colors.yellow('External'),
      Path: formattedKey,
      Count: formattedValue,
    });
  });

  console.log('\n');
  table.printTable();
}

function formatNumber(value: number) {
  if (value === 0) {
    return colors.dim(value.toString());
  }

  if (value < 5) {
    return colors.info(value.toString());
  }

  return colors.success(value.toString());
}
