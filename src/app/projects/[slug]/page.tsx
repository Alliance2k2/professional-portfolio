import { projects } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PageIntro } from '@/components/shared';
import type { Metadata } from 'next';
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p
    ? {
        title: p.title,
        description: p.summary,
        ...(process.env.SITE_URL
          ? { alternates: { canonical: `/projects/${slug}` } }
          : {}),
      }
    : {};
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <article className="container page-content">
      <PageIntro
        eyebrow={p.category.toUpperCase()}
        title={p.title}
        description={p.summary}
      />
      <div className="two-columns">
        <div className="prose">
          {[
            ['Problem & objectives', p.problem],
            ['Methodology & architecture', p.method],
            ['Implementation', p.implementation],
            ['Results & evidence', p.results],
            ['Limitations & future work', p.limitations],
          ].map(([title, body]) => (
            <section key={title}>
              <h2>{title}</h2>
              <p>{body}</p>
            </section>
          ))}
          <h2>Challenges & lessons</h2>
          <p>
            Detailed challenges and retrospective lessons will be added after
            review of supporting engineering notes. No undocumented claims are
            presented.
          </p>
          <h2>Visual evidence</h2>
          <p>
            Reviewed screenshots and research figures have not yet been added to
            this portfolio.
          </p>
          <p className="small">Source: {p.source}</p>
          <Link href="/projects">Back to all projects</Link>
        </div>
        <aside className="info-panel">
          <p className="eyebrow">PROJECT DETAILS</p>
          <h2>{p.status}</h2>
          <div className="tags">
            {p.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          {p.repo ? (
            <a href={p.repo}>Explore source repository</a>
          ) : (
            <p>No public repository supplied.</p>
          )}
          <p className="small" style={{ marginTop: 20 }}>
            No live demonstration URL has been verified.
          </p>
        </aside>
      </div>
    </article>
  );
}
