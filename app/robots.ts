import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/account',
        '/api',
        '/audio',
        '/confirm-email',
        '/diary',
        '/items',
        '/reset-passworrd',
        '/settings',
      ],
    },
    sitemap: 'https://www.jamjar.site/sitemap.xml',
  };
}
