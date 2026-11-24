import { z } from 'zod';
import { profile } from '@/lib/content';
const reposSchema = z.array(
  z.object({
    name: z.string(),
    html_url: z.url(),
    description: z.string().nullable(),
    language: z.string().nullable(),
    stargazers_count: z.number(),
    forks_count: z.number(),
    updated_at: z.string(),
  }),
);
export async function Github() {
  let repos: z.infer<typeof reposSchema> = [];
  try {
    const response = await fetch(
      'https://api.github.com/users/Alliance2k2/repos?sort=updated&per_page=4',
      {
        next: { revalidate: 3600 },
        headers: { Accept: 'application/vnd.github+json' },
        signal: AbortSignal.timeout(3500),
      },
    );
    if (response.ok) repos = reposSchema.parse(await response.json());
  } catch {}
  return (
    <section className="section github-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">OPEN SOURCE</p>
          <h2>Built in the open.</h2>
        </div>
        <a href={profile.github}>Visit GitHub</a>
      </div>
      {repos.length ? (
        <div className="repo-grid">
          {repos.map((r) => (
            <a href={r.html_url} key={r.name} className="repo-card">
              <h3>{r.name}</h3>
              <p>
                {r.description ??
                  'Explore the source and project documentation.'}
              </p>
              <div className="repo-meta">
                <span>{r.language ?? 'Source code'}</span>
                <span>
                  {r.stargazers_count} stars · {r.forks_count} forks
                </span>
              </div>
              <small>
                Updated {new Date(r.updated_at).toISOString().slice(0, 10)}
              </small>
            </a>
          ))}
        </div>
      ) : (
        <p>
          Live repository information is temporarily unavailable.{' '}
          <a href={profile.github}>
            Explore the public repositories on GitHub.
          </a>
        </p>
      )}
    </section>
  );
}
