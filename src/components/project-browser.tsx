'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { Project } from '@/lib/content';
export function ProjectBrowser({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState('All work');
  const [query, setQuery] = useState('');
  const categories = ['All work', ...new Set(projects.map((p) => p.category))];
  const filtered = projects.filter(
    (p) =>
      (filter === 'All work' || p.category === filter) &&
      `${p.title} ${p.summary} ${p.tags.join(' ')}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="project-controls">
        <div className="filters" aria-label="Filter projects">
          {categories.map((c) => (
            <button
              key={c}
              className={filter === c ? 'active' : ''}
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="search">
          <span className="sr-only">Search projects</span>
          <input
            placeholder="Search work or technology"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <div className="project-grid">
        {filtered.map((p) => (
          <Link
            href={`/projects/${p.slug}`}
            className="project-card"
            key={p.slug}
          >
            <span className="eyebrow">{p.category}</span>
            <h2>{p.title}</h2>
            <p>{p.summary}</p>
            <div className="tags">
              {p.tags.map((t) => (
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
      {!filtered.length ? (
        <p role="status">
          No projects match your search. Try another technology or category.
        </p>
      ) : null}
    </>
  );
}
