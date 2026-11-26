import { projects } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PageIntro } from '@/components/shared';
import { ProjectCaseStudy } from '@/components/project-case-study';
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
      <p className="project-subtitle">{p.subtitle}</p>
      <ProjectCaseStudy project={p} />
      <Link className="back-link" href="/projects">Back to all projects</Link>
    </article>
  );
}
