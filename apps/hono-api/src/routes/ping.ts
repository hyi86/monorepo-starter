import { formatDate } from '@monorepo-starter/utils/date';
import { Hono } from 'hono';

export const ping = new Hono().get('/', (c) => {
  c.header('Cache-Control', 'public, max-age=0, s-maxage=10');
  return c.json({ message: 'pong', timestamp: formatDate(new Date()) });
});
