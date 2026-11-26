import { getArticles, headingId } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import { notFound } from 'next/navigation';
import { PageIntro } from '@/components/shared';
import Link from 'next/link';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
// The root layout uses a per-request CSP nonce. Rendering blog slugs on demand
// also lets unpublished/unknown slugs reach notFound() without static fallback.
export const dynamic = 'force-dynamic';
export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = (await getArticles()).find((a) => a.slug === slug);
  return a
    ? {
        title: a.title,
        description: a.description,
        ...(process.env.SITE_URL
          ? { alternates: { canonical: `/blog/${slug}` } }
          : {}),
      }
    : {};
}
export default async function BlogArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = await getArticles();
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  const nonce = (await headers()).get('x-nonce') ?? undefined;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    datePublished: a.date,
    author: { '@type': 'Person', name: a.author },
  };
  return (
    <article className="container page-content">
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
      <PageIntro
        eyebrow={`${a.category} · ${a.readingTime} MIN READ`}
        title={a.title}
        description={a.description}
      />
      <p>
        {a.author} · {a.date}
      </p>
      <div className="two-columns">
        <div className="prose">
          <MDXRemote
            source={a.body}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMath],
                rehypePlugins: [rehypeKatex, rehypePrettyCode],
              },
            }}
            components={{
              h2: ({ children }) => (
                <h2 id={headingId(String(children))}>{children}</h2>
              ),
            }}
          />
          <h2>Related articles</h2>
          {articles
            .filter(
              (b) =>
                b.slug !== a.slug && b.tags.some((t) => a.tags.includes(t)),
            )
            .map((b) => (
              <p key={b.slug}>
                <Link href={`/blog/${b.slug}`}>{b.title}</Link>
              </p>
            ))}
        </div>
        <aside className="info-panel">
          <h2>On this page</h2>
          {a.headings.map((h) => (
            <p key={h.id}>
              <a href={`#${h.id}`}>{h.text}</a>
            </p>
          ))}
        </aside>
      </div>
    </article>
  );
}
