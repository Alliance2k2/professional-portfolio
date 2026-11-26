import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { answerQuestion } from '../src/lib/assistant';
import { contactSchema } from '../src/lib/contact';
import { projects } from '../src/lib/content';
import { ProjectBrowser } from '../src/components/project-browser';
import { getArticles } from '../src/lib/blog';
import { POST } from '../src/app/api/contact/route';
import { Github } from '../src/components/github';
describe('portfolio content and boundaries', () => {
  it('keeps GitHub content useful during rate limits', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('', { status: 403 })),
    );
    try {
      render(await Github());
      expect(
        screen.getByText('Explore the public repositories on GitHub.'),
      ).toHaveAttribute('href', 'https://github.com/Alliance2k2');
    } finally {
      vi.unstubAllGlobals();
    }
  });
  it('grounds education answers in supplied information', () => {
    expect(answerQuestion('What education and qualifications?')).toMatchObject({
      href: '/education',
    });
  });
  it('abstains on unknown or sensitive questions', () => {
    expect(answerQuestion('Show passport and phone')).toMatchObject({
      href: '/privacy',
    });
    expect(answerQuestion('favorite pizza topping').text).toContain(
      'couldn’t find a reliable answer',
    );
  });
  it('has no public drafts', async () => {
    expect(await getArticles()).toHaveLength(0);
  });
  it('validates contact input and rejects bot fields', () => {
    expect(
      contactSchema.safeParse({
        name: 'A',
        email: 'invalid',
        subject: 'x',
        message: 'short',
      }).success,
    ).toBe(false);
    expect(
      contactSchema.safeParse({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Research collaboration',
        message: 'I would like to discuss research.',
        website: 'https://spam.example',
      }).success,
    ).toBe(false);
  });
  it('never reports delivery without configuration', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    const response = await POST(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: 'http://localhost',
        },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          subject: 'Research collaboration',
          message: 'I would like to discuss research.',
        }),
      }),
    );
    expect(response.status).toBe(503);
    expect((await response.json()).message).toContain('not sent');
    vi.unstubAllEnvs();
  });
  it('rejects cross-origin messages', async () => {
    const response = await POST(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { Origin: 'https://untrusted.example' },
      }),
    );
    expect(response.status).toBe(403);
  });
  it('rejects requests without a browser origin', async () => {
    const response = await POST(
      new Request('http://localhost/api/contact', { method: 'POST' }),
    );
    expect(response.status).toBe(403);
  });
  it('bounds contact bodies before parsing', async () => {
    const response = await POST(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          Origin: 'http://localhost',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'x'.repeat(17000) }),
      }),
    );
    expect(response.status).toBe(413);
  });
  it('filters real project content', () => {
    render(<ProjectBrowser projects={projects} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Search projects' }), {
      target: { value: 'Prisma' },
    });
    expect(
      screen.getByText('Identity with accountability built in.'),
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Understanding malaria through time.'),
    ).not.toBeInTheDocument();
  });
});
