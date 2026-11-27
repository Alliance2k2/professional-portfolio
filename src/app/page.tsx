import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Github,
  Linkedin,
  BriefcaseBusiness,
  FlaskConical,
} from 'lucide-react';
import { profile } from '@/lib/content';

export default function Home() {
  return (
    <>
      <section className="container home-intro">
        <div className="home-intro-copy">
          <p className="eyebrow">DATA SCIENCE · RESEARCH · ENGINEERING</p>
          <h1>
            Turning complexity into{' '}
            <span className="accent">meaningful impact.</span>
          </h1>
          <p className="home-name">I’m Irigenera Alliance.</p>
          <p className="home-description">
            A data science professional and research fellow in Kigali. I connect
            statistical thinking, practical data systems and applied research.
          </p>
          <div className="hero-actions">
            <Link href="/projects" className="button primary">
              Explore my work
            </Link>
            <Link href="/research" className="button secondary">
              Explore research
            </Link>
          </div>
          <div className="hero-social">
            <span>
              <MapPin size={16} /> Kigali, Rwanda
            </span>
            <a href={profile.github} aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href={profile.linkedin} aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <Link href="/resume">Résumé</Link>
          </div>
        </div>
        <figure className="home-portrait">
          <Image
            src="/alliance-irigenera.jpg"
            alt="Irigenera Alliance"
            width={900}
            height={900}
            sizes="(max-width: 760px) 90vw, 380px"
            preload
          />
          <figcaption>
            <strong>Mathematical thinking.</strong>
            <span>Practical possibilities.</span>
          </figcaption>
        </figure>
      </section>
      <section
        className="container home-destinations"
        aria-label="Explore the portfolio"
      >
        <Link href="/projects" className="home-destination">
          <span className="destination-icon">
            <BriefcaseBusiness size={28} />
          </span>
          <div>
            <p className="eyebrow">WORK</p>
            <h2>Built for real questions.</h2>
            <p>
              Agricultural platforms, analytical dashboards and useful
              applications.
            </p>
            <span className="text-link">Browse projects</span>
          </div>
        </Link>
        <Link href="/research" className="home-destination">
          <span className="destination-icon">
            <FlaskConical size={28} />
          </span>
          <div>
            <p className="eyebrow">RESEARCH</p>
            <h2>Understand the patterns.</h2>
            <p>
              Public health statistics, functional data analysis and community
              evidence.
            </p>
            <span className="text-link">Explore research</span>
          </div>
        </Link>
      </section>
      <div className="container home-contact">
        <p>Interested in working together?</p>
        <Link href="/contact">Let’s connect</Link>
      </div>
    </>
  );
}
