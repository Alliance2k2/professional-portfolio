import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageIntro, Timeline } from '@/components/shared';
import { ProjectBrowser } from '@/components/project-browser';
import { ContactForm } from '@/components/contact-form';
import { PrintButton } from '@/components/print-button';
import {
  profile,
  experience,
  education,
  projects,
  research,
  skills,
  development,
  interests,
  routes,
} from '@/lib/content';
import { getArticles } from '@/lib/blog';
const descriptions: Record<string, [string, string, string]> = {
  about: [
    'THE PERSON BEHIND THE WORK',
    'Curiosity, grounded in purpose.',
    'Mathematical thinking, practical engineering and a commitment to evidence.',
  ],
  experience: [
    'PROFESSIONAL JOURNEY',
    'Learning through contribution.',
    'Research, data science and engineering experience across institutions and teams.',
  ],
  education: [
    'ACADEMIC FOUNDATION',
    'A foundation in mathematics.',
    'From statistical reasoning to data science and applied research.',
  ],
  projects: [
    'PROJECT PORTFOLIO',
    'Work with real-world purpose.',
    'Explore research, analytical work and engineered systems. Each case study distinguishes documented implementation from pending validation.',
  ],
  research: [
    'RESEARCH & ACADEMIC WORK',
    'Questions that matter.',
    'Exploring public health, community evidence and data-driven approaches to sustainable development.',
  ],
  skills: [
    'TECHNICAL EXPERTISE',
    'A connected toolkit.',
    'Skills grounded in projects and professional experience, without arbitrary proficiency scores.',
  ],
  certifications: [
    'PROFESSIONAL DEVELOPMENT',
    'Always a student.',
    'Courses, summer schools and professional development recorded in the supplied CV. Certificate documents have not yet been supplied.',
  ],
  blog: [
    'THE WRITING DESK',
    'Thinking out loud.',
    'Notes on data, research and useful technology — published only after author review.',
  ],
  resume: [
    'PROFESSIONAL RÉSUMÉ',
    'Irigenera Alliance',
    'Data Science Professional | Data Systems, Applied AI & RAG · Kigali, Rwanda',
  ],
  contact: [
    'START A CONVERSATION',
    'Let’s make an impact.',
    'Research collaborations, data science opportunities and thoughtful engineering projects.',
  ],
  privacy: [
    'PRIVACY',
    'Clear about your information.',
    'How this portfolio handles visitor information. Updated 24 November 2026.',
  ],
};
export function generateStaticParams() {
  return routes.map((section) => ({ section }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const d = descriptions[section];
  return d
    ? {
        title:
          section === 'resume'
            ? 'Résumé'
            : section.charAt(0).toUpperCase() + section.slice(1),
        description: d[2],
        ...(process.env.SITE_URL
          ? { alternates: { canonical: `/${section}` } }
          : {}),
      }
    : {};
}
export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const d = descriptions[section];
  if (!d) notFound();
  const articles = section === 'blog' ? await getArticles() : [];
  return (
    <div className="container page-content">
      <PageIntro eyebrow={d[0]} title={d[1]} description={d[2]} />
      {section === 'about' ? (
        <div className="two-columns">
          <div className="prose">
            <h2>From mathematical foundations to useful systems.</h2>
            <p>{profile.summary}</p>
            <p>
              My interests connect agriculture, public health and sustainable
              development. I value reproducible analysis, clear documentation
              and systems that make their evidence and limitations visible.
            </p>
            <h2>Beyond the code</h2>
            <p>
              Coach and Mentor, Rwanda Mathematical Olympiad (2022–Present).
              Social Club Coordinator and Event Lead, AIMS Rwanda Student
              Association (2025–2026).
            </p>
            <p>English — Excellent · Kinyarwanda — Native · French — Fair.</p>
            <h2>Areas of interest</h2>
            <div className="tags">
              {interests.map((i) => (
                <span key={i}>{i}</span>
              ))}
            </div>
          </div>
          <aside>
            <div className="portrait-placeholder">
              <span aria-hidden="true">IA</span>
              <p>Professional portrait to be added</p>
            </div>
            <div className="info-panel">
              <h2>
                Based in Kigali.
                <br />
                Thinking beyond borders.
              </h2>
              <p>
                Interested in research, applied data science and collaborations
                that connect ideas with practical needs.
              </p>
              <Link href="/contact">Get in touch</Link>
            </div>
          </aside>
        </div>
      ) : null}
      {section === 'experience' ? (
        <>
          <Timeline items={experience} />
          <div className="prose">
            <h2>Leadership & community</h2>
            <p>
              Rwanda Mathematical Olympiad coaching and mentoring since 2022,
              and student community coordination at AIMS Rwanda during
              2025–2026.
            </p>
          </div>
        </>
      ) : null}
      {section === 'education' ? (
        <>
          <Timeline items={education} />
          <div className="prose">
            <h2>Research as a learning practice</h2>
            <p>
              My academic work connects statistical methods, computational tools
              and real-world questions.
            </p>
            <Link href="/research">Explore research</Link>
          </div>
        </>
      ) : null}
      {section === 'projects' ? <ProjectBrowser projects={projects} /> : null}
      {section === 'research' ? (
        <>
          <div className="project-grid">
            {research.map((r) => (
              <Link
                href={`/research/${r.slug}`}
                className="project-card"
                key={r.slug}
              >
                <span className="eyebrow">{r.status}</span>
                <h2>{r.title}</h2>
                <p>{r.description}</p>
                <span className="text-link">Explore research</span>
              </Link>
            ))}
          </div>
          <div className="prose">
            <h2>Research interests</h2>
            <div className="tags">
              {interests.map((i) => (
                <span key={i}>{i}</span>
              ))}
            </div>
            <h2>Publication record</h2>
            <p>
              No published articles, DOI records, accepted manuscripts or
              academic presentations have been supplied for verification.
              Research is described without inferring publication status.
            </p>
          </div>
        </>
      ) : null}
      {section === 'skills' ? (
        <>
          <div className="project-grid">
            {skills.map((s) => (
              <section className="info-panel" key={s.title}>
                <h2>{s.title}</h2>
                <div className="tags">
                  {s.items.map((i) => (
                    <span key={i}>{i}</span>
                  ))}
                </div>
                <Link href={s.evidence}>Explore associated work</Link>
              </section>
            ))}
          </div>
          <div className="prose">
            <h2>Evidence before labels</h2>
            <p>
              These tools are recorded in the CV or verified project
              documentation. A listing does not imply equal depth across every
              tool. Advanced geospatial workflows and future portfolio RAG
              integrations remain areas for continued development.
            </p>
          </div>
        </>
      ) : null}
      {section === 'certifications' ? (
        <div className="development-list">
          {development.map(([title, org, date]) => (
            <section className="development-item" key={title}>
              <p className="eyebrow">{date}</p>
              <h2>{title}</h2>
              <p>{org}</p>
            </section>
          ))}
        </div>
      ) : null}
      {section === 'blog' ? (
        articles.length ? (
          <div className="project-grid">
            {articles.map((a) => (
              <Link
                className="project-card"
                key={a.slug}
                href={`/blog/${a.slug}`}
              >
                <p className="eyebrow">
                  {a.category} · {a.readingTime} MIN READ
                </p>
                <h2>{a.title}</h2>
                <p>{a.description}</p>
                <span>{a.date}</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p className="eyebrow">IN THE NOTEBOOK</p>
            <h2>Good writing takes reflection.</h2>
            <p>
              There are no published articles yet. Draft templates for
              retrieval-augmented generation, public health analytics and
              citizen science are kept in the source repository for author
              review and are excluded from the published site.
            </p>
            <Link href="/research" className="text-link">
              Explore the research behind the ideas
            </Link>
          </div>
        )
      ) : null}
      {section === 'resume' ? (
        <>
          <PrintButton />
          <div className="prose">
            <h2>Professional profile</h2>
            <p>{profile.summary}</p>
            <p>
              <a href={`mailto:${profile.email}`}>{profile.email}</a> ·{' '}
              <a href={profile.github}>GitHub</a> ·{' '}
              <a href={profile.linkedin}>LinkedIn</a>
            </p>
            <h2>Experience</h2>
            <Timeline items={experience} />
            <h2>Education</h2>
            <Timeline items={education} />
            <h2>Technical skills</h2>
            {skills.map((s) => (
              <p key={s.title}>
                <strong>{s.title}:</strong> {s.items.join(', ')}.
              </p>
            ))}
            <h2>Selected projects</h2>
            {projects.slice(0, 4).map((p) => (
              <p key={p.slug}>
                <Link href={`/projects/${p.slug}`}>{p.title}</Link> —{' '}
                {p.summary}
              </p>
            ))}
            <h2>Professional development</h2>
            {development.map(([t, o, date]) => (
              <p key={t}>
                {t} · {o} · {date}
              </p>
            ))}
            <p className="no-print">
              The original CV is kept private because it includes a telephone
              number. Use Print / Save as PDF for this public résumé. A reviewed
              public CV PDF can be added later.
            </p>
          </div>
        </>
      ) : null}
      {section === 'contact' ? (
        <div className="two-columns">
          <ContactForm />
          <aside className="info-panel">
            <h2>Let’s connect.</h2>
            <p>
              Based in {profile.location}. For a reliable direct contact method,
              email me with a brief introduction and the context of your
              opportunity.
            </p>
            <div className="contact-links">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.github}>GitHub · Alliance2k2</a>
              <a href={profile.linkedin}>LinkedIn · Irigenera Alliance</a>
            </div>
            <p className="small" style={{ marginTop: 25 }}>
              Your message is used only to respond to your inquiry.{' '}
              <Link href="/privacy">Read the privacy notice.</Link>
            </p>
          </aside>
        </div>
      ) : null}
      {section === 'privacy' ? (
        <div className="prose">
          <h2>Browsing</h2>
          <p>
            This application does not install analytics or advertising trackers.
            Your chosen color theme is stored locally in your browser. The
            hosting provider may process request metadata in operational logs.
          </p>
          <h2>Portfolio assistant</h2>
          <p>
            Alliance AI uses deterministic search of public portfolio content in
            your browser. Questions are not sent to an LLM or stored by this
            application. Conversation state clears when you leave or reload the
            page.
          </p>
          <h2>Contact messages</h2>
          <p>
            If email delivery is configured, submitted contact information and
            message content are sent through Resend to the portfolio owner
            solely to respond to your inquiry. Do not include sensitive personal
            information. If delivery is unavailable, the form reports that fact
            and directs you to email. No messages are stored in an application
            database.
          </p>
          <h2>External services</h2>
          <p>
            Public repository data is retrieved server-side from GitHub and
            cached. Following external GitHub, LinkedIn or email links is
            subject to those services’ policies. Deployment-specific
            email-provider and retention details should be reviewed before
            enabling message delivery.
          </p>
          <h2>Questions</h2>
          <p>
            Contact <a href={`mailto:${profile.email}`}>{profile.email}</a> for
            questions about information sent through this site.
          </p>
        </div>
      ) : null}
    </div>
  );
}
