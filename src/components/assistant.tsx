'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MessageSquare, RotateCcw, Send, X } from 'lucide-react';
import type { Answer } from '@/lib/assistant';

type Turn = { id: number; query: string; answer: Answer };

const STARTER_QUESTIONS = [
  'What is your education?',
  'Tell me about citizen science.',
  'What professional interests are listed?',
];

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [turns, setTurns] = useState<Turn[]>([]);
  const [searching, setSearching] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const nextTurnId = useRef(0);
  const lastQuery = turns.at(-1)?.query;

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  function close() {
    setOpen(false);
    trigger.current?.focus();
  }

  async function ask(value: string) {
    const cleaned = value.trim().slice(0, 500);
    if (!cleaned || searching) return;
    setQuery('');
    setSearching(true);
    const id = nextTurnId.current++;
    try {
      const { answerQuestion } = await import('@/lib/assistant');
      const answer = answerQuestion(cleaned, lastQuery);
      setTurns((current) => [...current, { id, query: cleaned, answer }].slice(-8));
    } finally {
      setSearching(false);
    }
  }

  return (
    <aside className="assistant" aria-label="Portfolio question assistant">
      {open ? (
        <section
          className="assistant-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="assistant-title"
          onKeyDown={(event) => {
            if (event.key === 'Escape') close();
          }}
        >
          <div className="assistant-top">
            <div>
              <strong id="assistant-title">Ask about the portfolio</strong>
              <p>Local BM25 search · No external AI service</p>
            </div>
            <div className="assistant-tools">
              {turns.length > 0 ? (
                <button
                  className="icon-button"
                  type="button"
                  aria-label="Reset conversation"
                  onClick={() => {
                    setTurns([]);
                    input.current?.focus();
                  }}
                >
                  <RotateCcw size={17} />
                </button>
              ) : null}
              <button
                className="icon-button"
                type="button"
                onClick={close}
                aria-label="Close assistant"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          <p className="assistant-description">
            Answers are excerpts from public portfolio pages. I’ll say when the
            site does not contain enough evidence.
          </p>
          <div className="assistant-transcript" role="log" aria-live="polite" aria-relevant="additions">
            {turns.length === 0 ? (
              <div className="suggestions" aria-label="Suggested questions">
                {STARTER_QUESTIONS.map((question) => (
                  <button key={question} type="button" disabled={searching} onClick={() => void ask(question)}>
                    {question}
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
                        <span>Sources</span>
                        {answer.sources.map((source) => (
                          <Link href={source.href} key={`${id}-${source.href}`}>
                            {source.label}
                          </Link>
                        ))}
                      </nav>
                    ) : null}
                    <div role="status" className="sr-only">
                      {answer.abstained ? 'No supported answer found.' : 'Answer found in portfolio content.'}
                    </div>
                    {answer.suggestions.length > 0 ? (
                      <div className="assistant-followups" aria-label="Related questions">
                        {answer.suggestions.slice(0, 2).map((suggestion) => (
                          <button
                            key={`${id}-${suggestion}`}
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
              placeholder="Ask about work, research, skills…"
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
      ) : null}
      <button
        ref={trigger}
        className="assistant-trigger"
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        title="Ask about the portfolio"
      >
        <MessageSquare size={18} />
        <span className="assistant-label">Ask about my work</span>
        <span className="assistant-local">LOCAL</span>
      </button>
    </aside>
  );
}
