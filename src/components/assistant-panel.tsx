'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { RotateCcw, Send, X } from 'lucide-react';
import type { Answer } from '@/lib/assistant';

type Turn = { id: number; query: string; answer: Answer };
type AssistantPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

const STARTER_QUESTIONS = [
  'What is your education?',
  'Tell me about citizen science.',
  'What professional interests are listed?',
];

export function AssistantPanel({
  isOpen,
  onClose,
}: AssistantPanelProps) {
  const [query, setQuery] = useState('');
  const [turns, setTurns] = useState<Turn[]>([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const nextTurnId = useRef(0);
  const lastTurn = turns.at(-1);
  const lastQuery =
    lastTurn && !lastTurn.answer.abstained ? lastTurn.query : undefined;

  useEffect(() => {
    if (isOpen) input.current?.focus();
  }, [isOpen]);

  async function ask(value: string) {
    const cleaned = value.trim().slice(0, 500);
    if (!cleaned || searching) return;
    setQuery('');
    setError('');
    setSearching(true);
    const id = nextTurnId.current++;
    try {
      const { answerQuestion } = await import('@/lib/assistant');
      const answer = answerQuestion(cleaned, lastQuery);
      setTurns((current) => [...current, { id, query: cleaned, answer }].slice(-8));
    } catch {
      setError('The local search index could not load. Please try again.');
    } finally {
      setSearching(false);
    }
  }

  return (
    <section
      id="assistant-panel"
      className="assistant-panel"
      role="dialog"
      aria-modal="false"
      aria-labelledby="assistant-title"
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose();
      }}
    >
      <div className="assistant-top">
        <div>
          <strong id="assistant-title">Ask about the portfolio</strong>
          <p>Deterministic local BM25 retrieval · No external AI service</p>
        </div>
        <div className="assistant-tools">
          {turns.length > 0 ? (
            <button
              className="icon-button"
              type="button"
              aria-label="Reset conversation"
              onClick={() => {
                setTurns([]);
                setError('');
                input.current?.focus();
              }}
            >
              <RotateCcw size={17} />
            </button>
          ) : null}
          <button
            className="icon-button"
            type="button"
            onClick={onClose}
            aria-label="Close assistant"
          >
            <X size={18} />
          </button>
        </div>
      </div>
      <p className="assistant-description">
        Answers are short excerpts from public portfolio pages with a source
        link. I will say when the site does not contain enough evidence.
      </p>
      <div
        className="assistant-transcript"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {turns.length === 0 ? (
          <div className="suggestions" aria-label="Suggested questions">
            {STARTER_QUESTIONS.map((starter) => (
              <button
                key={starter}
                type="button"
                disabled={searching}
                onClick={() => void ask(starter)}
              >
                {starter}
              </button>
            ))}
          </div>
        ) : (
          turns.map(({ id, query: asked, answer }) => (
            <article className="assistant-turn" key={id}>
              <p className="assistant-question">{asked}</p>
              <div className="answer">
                <p>{answer.text}</p>
                {answer.sources.length > 0 ? (
                  <nav className="assistant-sources" aria-label="Answer sources">
                    <span>Source</span>
                    {answer.sources.map((source) => (
                      <Link href={source.href} key={source.href}>
                        {source.label}
                      </Link>
                    ))}
                  </nav>
                ) : null}
                <div role="status" className="sr-only">
                  {answer.abstained
                    ? 'No supported answer found.'
                    : 'Answer found in portfolio content.'}
                </div>
                {answer.suggestions.length > 0 ? (
                  <div
                    className="assistant-followups"
                    aria-label="Related questions"
                  >
                    {answer.suggestions.slice(0, 2).map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        disabled={searching}
                        onClick={() => void ask(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))
        )}
        {searching ? (
          <p role="status" className="sr-only">
            Searching public portfolio content.
          </p>
        ) : null}
        {error ? <p role="alert">{error}</p> : null}
      </div>
      <form
        className="assistant-form"
        onSubmit={(event) => {
          event.preventDefault();
          void ask(query);
        }}
      >
        <label htmlFor="assistant-query" className="sr-only">
          Ask about the portfolio
        </label>
        <input
          id="assistant-query"
          ref={input}
          value={query}
          maxLength={500}
          autoComplete="off"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ask about work, research, skills..."
        />
        <button
          className="icon-button"
          type="submit"
          aria-label="Ask"
          disabled={!query.trim() || searching}
        >
          <Send size={18} />
        </button>
      </form>
    </section>
  );
}
