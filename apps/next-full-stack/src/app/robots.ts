import type { MetadataRoute } from 'next';
import { env } from '~/shared/config/env';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${env.NEXT_PUBLIC_URL}/sitemap.xml`,
  };
}
