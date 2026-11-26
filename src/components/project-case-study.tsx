import type { Project } from '@/lib/content';
import { EvidenceGallery } from '@/components/evidence-gallery';

function TextSection({ title, text }: { title: string; text?: string }) {
  if (!text) return null;
  return (
    <section className="case-study-section">
      <h2>{title}</h2>
      <p>{text}</p>
    </section>
  );
}

function ListSection({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <section className="case-study-section">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function ProjectCaseStudy({ project }: { project: Project }) {
  const technologies = project.technologies ?? project.tags;
  return (
    <div className="case-study-layout">
      <div className="prose case-study-content">
        <TextSection title="Problem" text={project.problem} />
        <ListSection title="Objectives" items={project.objectives} />
        {project.architecture?.length ? (
          <section className="case-study-section">
            <h2>Architecture</h2>
            <ol className="architecture-flow">
              {project.architecture.map((step) => (
                <li key={step.stage}>
                  <strong>{step.stage}</strong>
                  <span>{step.detail}</span>
                </li>
              ))}
            </ol>
            {project.architectureSource ? (
              <p className="small source-note">{project.architectureSource}</p>
            ) : null}
          </section>
        ) : null}
        <TextSection title="Methodology" text={project.method} />
        <TextSection title="Implementation" text={project.implementation} />
        <TextSection title="Personal contribution" text={project.contribution} />
        <TextSection title="Results & evidence" text={project.results} />
        <ListSection title="Technical challenges" items={project.technicalChallenges} />
        <ListSection title="Lessons learned" items={project.lessonsLearned} />
        <TextSection title="Limitations" text={project.limitations} />
        <ListSection title="Future improvements" items={project.futureImprovements} />
        {project.gallery?.length ? (
          <EvidenceGallery title="Project gallery" images={project.gallery} />
        ) : null}
        <p className="small source-note">Content source: {project.source}</p>
      </div>
      <aside className="info-panel case-study-facts" aria-label="Project details">
        <p className="eyebrow">PROJECT DETAILS</p>
        <h2>{project.status}</h2>
        {project.duration ? (
          <p className="project-duration"><strong>Duration</strong>{project.duration}</p>
        ) : null}
        <h3>Technologies</h3>
        <div className="tags">
          {technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
        <div className="case-study-links">
          {project.repo ? (
            <a href={project.repo} target="_blank" rel="noreferrer">
              View source repository
            </a>
          ) : (
            <p>No public repository has been supplied.</p>
          )}
          {project.liveDemo ? (
            <a href={project.liveDemo.href} target="_blank" rel="noreferrer">
              {project.liveDemo.label}
            </a>
          ) : (
            <p>No verified live demonstration is available.</p>
          )}
        </div>
      </aside>
    </div>
  );
}
