import fs from 'node:fs/promises';
import path from 'node:path';
import { z } from 'zod';
const articleSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  description: z.string(),
  date: z.iso.date(),
  author: z.literal('Irigenera Alliance'),
  reviewed: z.boolean(),
  draft: z.boolean(),
  tags: z.array(z.string()),
  category: z.string(),
});
export type Article = z.infer<typeof articleSchema> & {
  body: string;
  readingTime: number;
  headings: { id: string; text: string }[];
};
export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}
export async function getArticles(): Promise<Article[]> {
  const root = path.join(process.cwd(), 'content', 'blog');
  const files = await fs.readdir(root);
  const results = await Promise.all(
    files
      .filter((f) => f.endsWith('.json'))
      .map(async (file) => {
        const meta = articleSchema.parse(
          JSON.parse(await fs.readFile(path.join(root, file), 'utf8')),
        );
        if (meta.draft || !meta.reviewed) return null;
        const body = await fs.readFile(
          path.join(root, `${meta.slug}.mdx`),
          'utf8',
        );
        return {
          ...meta,
          body,
          readingTime: Math.max(1, Math.ceil(body.split(/\s+/).length / 220)),
          headings: [...body.matchAll(/^## (.+)$/gm)].map((m) => ({
            id: headingId(m[1]),
            text: m[1],
          })),
        };
      }),
  );
  return results
    .filter((a): a is Article => a !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}
