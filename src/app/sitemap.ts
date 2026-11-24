import type { MetadataRoute } from 'next';
import { routes, projects, research } from '@/lib/content';
import { getArticles } from '@/lib/blog';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.SITE_URL;
  if (!base) return [];
  return [
    '/',
    ...routes.map((r) => `/${r}`),
    ...projects.map((p) => `/projects/${p.slug}`),
    ...research.map((r) => `/research/${r.slug}`),
    ...(await getArticles()).map((a) => `/blog/${a.slug}`),
  ].map((p) => ({ url: new URL(p, base).toString() }));
}
