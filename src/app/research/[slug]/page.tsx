import { research } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PageIntro } from '@/components/shared';
export function generateStaticParams() {
  return research.map((r) => ({ slug: r.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = research.find((r) => r.slug === slug);
  return r
    ? {
        title: r.title,
        description: r.description,
        ...(process.env.SITE_URL
          ? { alternates: { canonical: `/research/${slug}` } }
          : {}),
      }
    : {};
}
export default async function Research({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = research.find((r) => r.slug === slug);
  if (!r) notFound();
  return (
    <article className="container page-content">
      <PageIntro
        eyebrow={r.status.toUpperCase()}
        title={r.title}
        description={r.description}
      />
      <div className="prose">
        <h2>Research overview</h2>
        <p>{r.body}</p>
        <h2>Supporting materials</h2>
        <p>
          Abstracts, PDF downloads, citations and BibTeX exports will be
          available when reviewed source documents are supplied. No publication
          or acceptance status is assumed.
        </p>
        <Link href={r.project}>Explore the associated project</Link>
      </div>
    </article>
  );
}
