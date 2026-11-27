import Link from 'next/link';
import type { Metadata } from 'next';
import { renderToString } from 'katex';
import { PageIntro } from '@/components/shared';
import 'katex/dist/katex.min.css';
import { EvidenceGallery } from '@/components/evidence-gallery';
import { research } from '@/lib/content';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return research.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = research.find((entry) => entry.slug === slug);
  return item
    ? {
        title: item.title,
        description: item.description,
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
  const item = research.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return (
    <article className="container page-content">
      <PageIntro
        eyebrow={item.status.toUpperCase()}
        title={item.title}
        description={item.description}
      />
      {item.figures?.length ? (
        <EvidenceGallery
          key={item.slug}
          title="Research visuals"
          images={item.figures}
        />
      ) : null}
      <div className="research-record prose">
        <section>
          <h2>Research overview</h2>
          <p>{item.body}</p>
          {item.abstract ? (
            <div className="research-abstract">
              <h3>Abstract</h3>
              <p>{item.abstract}</p>
            </div>
          ) : null}
        </section>
        {item.researchInterests?.length ? (
          <section>
            <h2>Research interests</h2>
            <div className="tags">
              {item.researchInterests.map((interest) => (
                <span key={interest}>{interest}</span>
              ))}
            </div>
          </section>
        ) : null}
        {item.methodology?.length ? (
          <section>
            <h2>Methodology</h2>
            <ul>
              {item.methodology.map((method) => (
                <li key={method}>{method}</li>
              ))}
            </ul>
          </section>
        ) : null}
        {item.equations?.length ? (
          <section>
            <h2>Mathematical notation</h2>
            <div className="research-equations">
              {item.equations.map((equation) => (
                <figure key={equation.label}>
                  <figcaption>{equation.label}</figcaption>
                  <div
                    className="research-equation"
                    role="img"
                    aria-label={`${equation.label}: ${equation.tex}`}
                    dangerouslySetInnerHTML={{
                      __html: renderToString(equation.tex, {
                        displayMode: true,
                        throwOnError: false,
                        trust: false,
                      }),
                    }}
                  />
                </figure>
              ))}
            </div>
          </section>
        ) : null}
        <section className="research-materials">
          <h2>Publication and materials</h2>
          <p>
            <strong>Publication status:</strong>{' '}
            {item.publicationStatus ??
              'Not specified in the supplied materials.'}
          </p>
          {item.materialsNote ? <p>{item.materialsNote}</p> : null}
          {item.download ? (
            <p>
              <a href={item.download.href} download>
                {item.download.label}
              </a>
            </p>
          ) : null}
          {item.citation?.apa ? (
            <p>
              <strong>Suggested citation:</strong> {item.citation.apa}
            </p>
          ) : null}
          {item.citation?.bibtex ? (
            <p>
              <a
                href={`data:application/x-bibtex;charset=utf-8,${encodeURIComponent(item.citation.bibtex)}`}
                download={`${item.slug}.bib`}
              >
                Download BibTeX citation
              </a>
            </p>
          ) : null}
        </section>
        <Link href={item.project}>Explore the associated project</Link>
      </div>
    </article>
  );
}
