import Link from 'next/link';
import { profile, routes } from '@/lib/content';
export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lead">{description}</p>
    </div>
  );
}
export function Timeline({
  items,
}: {
  items: {
    title: string;
    organization: string;
    date: string;
    detail: string;
  }[];
}) {
  return (
    <div className="timeline">
      {items.map((e) => (
        <details key={e.title} open>
          <summary>
            <span className="timeline-date">{e.date}</span>
            <span>
              <strong>{e.title}</strong>
              <span className="timeline-org">{e.organization}</span>
            </span>
            <span className="expand" aria-hidden="true">
              +
            </span>
          </summary>
          <p>{e.detail}</p>
        </details>
      ))}
    </div>
  );
}
export function Footer() {
  return (
    <footer className="footer container">
      <div className="footer-top">
        <div>
          <Link href="/" className="monogram">
            IA<span>•</span>
          </Link>
          <p>
            Thoughtful research.
            <br />
            Useful technology. Real-world purpose.
          </p>
        </div>
        <div className="footer-links">
          {routes.map((r) => (
            <Link href={`/${r}`} key={r}>
              {r === 'resume'
                ? 'Résumé'
                : r.charAt(0).toUpperCase() + r.slice(1)}
            </Link>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {profile.name} · Kigali, Rwanda
        </span>
        <div>
          <a href={profile.github}>GitHub</a>
          <a href={profile.linkedin}>LinkedIn</a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
      </div>
    </footer>
  );
}
export function Collaboration() {
  return (
    <section className="collaboration">
      <p className="eyebrow">LET’S BUILD SOMETHING MEANINGFUL</p>
      <h2>
        Good questions deserve
        <br />
        thoughtful solutions.
      </h2>
      <p>
        Open to research collaborations, data science opportunities
        <br className="desktop-break" /> and engineering projects with
        real-world purpose.
      </p>
      <Link href="/contact" className="button primary">
        Start a conversation
      </Link>
    </section>
  );
}
