import Link from 'next/link';
import { Suspense } from 'react';
import {
  MapPin,
  Github as GithubIcon,
  Linkedin,
  Database,
  Braces,
  FlaskConical,
  Sprout,
  Layers,
  Globe2,
} from 'lucide-react';
import { profile, projects, skills, experience, research } from '@/lib/content';
import { Collaboration, Timeline } from '@/components/shared';
import { Github } from '@/components/github';
export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <div className="availability">
            <span /> DATA SCIENCE · APPLIED AI · SOFTWARE
          </div>
          <h1>
            Turning complexity
            <br />
            into{' '}
            <span>
              meaningful
              <br className="hero-break" /> impact.
            </span>
          </h1>
          <p className="hero-name">I’m Irigenera Alliance.</p>
          <p className="hero-description">
            A data science professional, researcher and developer building
            intelligent systems at the intersection of{' '}
            <strong>data, people and real-world problems.</strong>
          </p>
          <div className="hero-actions">
            <Link href="/projects" className="button primary">
              Explore my work
            </Link>
            <Link href="/resume" className="button secondary">
              View résumé
            </Link>
          </div>
          <div className="hero-social">
            <span>
              <MapPin size={15} /> Kigali, Rwanda
            </span>
            <a href={profile.github} aria-label="GitHub">
              <GithubIcon size={19} />
            </a>
            <a href={profile.linkedin} aria-label="LinkedIn">
              <Linkedin size={19} />
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-top">
            <span>THE INTERSECTION OF</span>
            <span className="live-indicator">IDEAS & IMPACT</span>
          </div>
          <div className="orbit-field" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="axis axis-x" />
            <div className="axis axis-y" />
            <div className="core">
              IA<span>IRIGENERA ALLIANCE</span>
            </div>
            <span className="orbit-label label-data">
              <Database size={17} /> Data science
            </span>
            <span className="orbit-label label-research">
              <FlaskConical size={17} /> Research
            </span>
            <span className="orbit-label label-code">
              <Braces size={17} /> Engineering
            </span>
            <i className="point p1" />
            <i className="point p2" />
            <i className="point p3" />
          </div>
          <div className="visual-caption">
            <span>
              MATHEMATICAL THINKING.
              <br />
              HUMAN-CENTERED SOLUTIONS.
            </span>
            <span className="coordinate">
              01°56′ S<br />
              30°03′ E
            </span>
          </div>
          <span className="sr-only">
            Original IA monogram. A professional portrait will be added when
            provided.
          </span>
        </div>
      </section>
      <div className="credential-strip">
        <div className="container">
          <span>
            GROUNDED IN RESEARCH.
            <br />
            <strong>BUILT FOR APPLICATION.</strong>
          </span>
          <span>
            AIMS <small>Rwanda</small>
          </span>
          <span>
            University
            <br />
            <strong>of Rwanda</strong>
          </span>
          <span>
            National Bank
            <br />
            <strong>of Rwanda</strong>
          </span>
          <span>
            Arrowstack
            <br />
            <strong>Technologies</strong>
          </span>
        </div>
      </div>
      <section className="section container intro-section">
        <p className="eyebrow">A LITTLE ABOUT MY APPROACH</p>
        <div>
          <h2>
            Rigorous thinking.
            <br />
            <span className="muted">Practical possibilities.</span>
          </h2>
          <p>{profile.summary}</p>
          <Link className="text-link" href="/about">
            More about me
          </Link>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SELECTED WORK</p>
            <h2>Research meets implementation.</h2>
          </div>
          <Link href="/projects">Explore all projects</Link>
        </div>
        <Link className="flagship" href="/projects/cs-ircfs">
          <div className="flagship-visual" aria-hidden="true">
            <div className="map-grid" />
            <div className="map-line line-one" />
            <div className="map-line line-two" />
            <div className="map-region region-one" />
            <div className="map-region region-two" />
            <div className="map-pin pin-one">
              <Sprout size={22} />
            </div>
            <div className="map-pin pin-two">
              <Layers size={20} />
            </div>
            <div className="map-pin pin-three">
              <Globe2 size={20} />
            </div>
            <div className="map-title">
              <span>CS—IRCFS</span>
              <small>COMMUNITY → EVIDENCE → ACTION</small>
            </div>
            <span className="visual-note">CONCEPTUAL SYSTEM ILLUSTRATION</span>
          </div>
          <div className="flagship-copy">
            <span className="eyebrow">FLAGSHIP PROJECT · DATA SYSTEMS</span>
            <h3>{projects[0].title}</h3>
            <p>
              {projects[0].summary} Connecting community reports, geospatial
              insight and accountable workflows.
            </p>
            <div className="tags">
              {projects[0].tags.slice(0, 4).map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <span className="text-link">Explore the case study</span>
          </div>
        </Link>
        <div className="project-grid home-projects">
          {projects.slice(1, 3).map((p, i) => (
            <Link
              className="project-card"
              key={p.slug}
              href={`/projects/${p.slug}`}
            >
              <div className={`project-symbol symbol-${i}`} aria-hidden="true">
                {i === 0 ? <FlaskConical size={34} /> : <Braces size={34} />}
              </div>
              <span className="eyebrow">{p.category}</span>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
              <div className="tags">
                {p.tags.slice(0, 3).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <span className="card-bottom">
                {p.status}
                <span>View case study</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="research-band">
        <div className="container section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">RESEARCH & CURIOSITY</p>
              <h2>
                Better questions.
                <br />
                Deeper understanding.
              </h2>
            </div>
            <p>
              Exploring the patterns behind complex systems
              <br />
              and the people they affect.
            </p>
          </div>
          {research.map((r) => (
            <Link
              className="research-row"
              key={r.slug}
              href={`/research/${r.slug}`}
            >
              <span className="research-status">{r.status}</span>
              <div>
                <h3>{r.title}</h3>
                <p>{r.description}</p>
              </div>
              <span className="text-link">Read more</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A CONNECTED TOOLKIT</p>
            <h2>From analysis to application.</h2>
          </div>
          <Link href="/skills">Technical expertise</Link>
        </div>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div className="skill-card" key={s.title}>
              <span className="skill-icon">
                {
                  [
                    <Database key="d" />,
                    <Layers key="l" />,
                    <Braces key="b" />,
                    <FlaskConical key="f" />,
                  ][i]
                }
              </span>
              <h3>{s.title}</h3>
              <p>{s.items.slice(0, 6).join(' · ')}</p>
              <Link href={s.evidence}>See it in practice</Link>
            </div>
          ))}
        </div>
      </section>
      <section className="section container career-section">
        <div>
          <p className="eyebrow">THE JOURNEY SO FAR</p>
          <h2>
            Learning.
            <br />
            Building.
            <br />
            <span className="accent">Contributing.</span>
          </h2>
          <Link href="/experience" className="text-link">
            View full experience
          </Link>
        </div>
        <Timeline items={experience} />
      </section>
      <div className="container">
        <Suspense fallback={<p>Loading public repositories…</p>}>
          <Github />
        </Suspense>
      </div>
      <section className="section container writing-preview">
        <div>
          <p className="eyebrow">FIELD NOTES</p>
          <h2>Ideas worth exploring.</h2>
        </div>
        <div>
          <p>
            Notes on applied AI, public health analytics and building
            responsible data systems. Articles will appear after review.
          </p>
          <Link href="/blog" className="text-link">
            Visit the writing desk
          </Link>
        </div>
      </section>
      <Collaboration />
    </>
  );
}
