import {
  cyan,
  devLog,
  dim,
  dim2,
  green,
  infoColor,
  successColor,
  white,
  yellow,
} from '@henry-hong/common-utils/console';
import { Table } from 'console-table-printer';
import path from 'node:path';

export function reportResult(
  workspace: string,
  result: { local: Record<string, number>; external: Record<string, number> },
) {
  devLog('info', `report result ${green(workspace)}...`);

  const unusedTable = new Table({
    columns: [
      { name: 'Types', alignment: 'center' },
      { name: 'Path', alignment: 'left' },
    ],
  });

  const table = new Table({
    columns: [
      { name: 'Types', alignment: 'center' },
      { name: 'Path', alignment: 'left' },
      { name: 'Count', alignment: 'right' },
    ],
  });

  Object.entries(result.local).forEach(([key, value], index) => {
    const workspacePath = path.join(workspace, key);
    const formattedKey = value === 0 ? dim2(workspacePath) : white(workspacePath);
    const formattedValue = formatNumber(value);

    if (value === 0) {
      unusedTable.addRow({
        Types: cyan('Local'),
        Path: formattedKey,
      });
    }

    table.addRow(
      {
        Types: cyan('Local'),
        Path: formattedKey,
        Count: formattedValue,
      },
      {
        separator: index === Object.entries(result.local).length - 1,
      },
    );
  });

  Object.entries(result.external).forEach(([key, value]) => {
    const formattedKey = value === 0 ? dim2(key) : white(key);
    const formattedValue = formatNumber(value);

    if (value === 0) {
      unusedTable.addRow({
        Types: yellow('External'),
        Path: formattedKey,
      });
    }

    table.addRow({
      Types: yellow('External'),
      Path: formattedKey,
      Count: formattedValue,
    });
  });

  console.log('\n');
  devLog('info', 'unused Imports');
  unusedTable.printTable();
  console.log('\n');
  devLog('info', 'All Imports');
  table.printTable();
}

function formatNumber(value: number) {
  if (value === 0) {
    return dim(value.toString());
  }

  if (value < 5) {
    return infoColor(value.toString());
  }

  return successColor(value.toString());
}
