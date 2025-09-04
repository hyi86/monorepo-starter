import { faker } from '@faker-js/faker';
import fs from 'fs';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { JsonFileDB } from './instance';

type JsonRow = Record<string, any>;

const TEST_FILE = 'test.jsonld';

describe('JsonFileDB', () => {
  let db: JsonFileDB<JsonRow>;
  let templateData: JsonRow[] = [];

  beforeEach(() => {
    db = new JsonFileDB(TEST_FILE);
    if (fs.existsSync(TEST_FILE)) fs.unlinkSync(TEST_FILE);
    templateData = Array.from({ length: 1000 }, () => ({
      uuid: faker.string.uuid(),
      balance: faker.number.int({ min: 1_111_111_111_111, max: 9_999_999_999_999 }),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
      company: faker.company.name(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.past().toISOString(),
    }));
  });

  afterEach(() => {
    if (fs.existsSync(TEST_FILE)) fs.unlinkSync(TEST_FILE);
  });

  [50, 100].forEach((N) => {
    it(`모든 행을 쓰고 읽을 수 있어야 함 (${new Intl.NumberFormat('ko-KR').format(N * 1000)}개 행)`, async () => {
      const rows = Array.from({ length: N }, () => templateData).flat();
      await db.writeAll(rows);

      // const stat = fs.statSync(db.filePath);
      // console.log((stat.size / 1024 / 1024).toFixed(2), 'MB');

      const result = await db.readAll();
      expect(result).toEqual(rows);
    });
  });

  it('행을 추가할 수 있어야 함 (100,000 + 20,000개 행)', async () => {
    const rows1: JsonRow[] = Array.from({ length: 100 }, () => templateData).flat();
    const rows2: JsonRow[] = Array.from({ length: 10 }, () => templateData).flat();
    const rows3: JsonRow[] = Array.from({ length: 10 }, () => templateData).flat();
    await db.writeAll(rows1);
    await db.append(rows2);
    await db.append(rows3);

    // const stat = fs.statSync(db.filePath);
    // console.log((stat.size / 1024 / 1024).toFixed(2), 'MB');

    const result = await db.readAll();
    expect(result).toEqual(rows1.concat(rows2).concat(rows3));
  });

  it('행을 업데이트하고 정렬할 수 있어야 함 (500,000개 행)', async () => {
    const rows: JsonRow[] = Array.from({ length: 300 }, () => templateData).flat();
    await db.writeAll(rows);
    const updatedRows = rows.map((row) => ({ ...row, name: row.name + 'updated' }));
    await db.writeAll(updatedRows);

    const result = await db.readAll();
    const sortedResult = result.sort((a: JsonRow, b: JsonRow) => Number(a.balance) - Number(b.balance));

    // const stat = fs.statSync(db.filePath);
    // console.log((stat.size / 1024 / 1024).toFixed(2), 'MB');

    expect(sortedResult[0]?.balance).toBeLessThanOrEqual(sortedResult[0]?.balance);
  });
}, 10_000);
