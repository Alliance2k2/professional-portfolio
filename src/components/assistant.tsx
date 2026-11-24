'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, X, Send } from 'lucide-react';
import { answerQuestion, type Answer } from '@/lib/assistant';
export function Assistant() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState<Answer>();
  const input = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const viewport = window.visualViewport;
    const updateInset = () => {
      const inset = viewport
        ? Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)
        : 0;
      document.documentElement.style.setProperty(
        '--visual-inset-bottom',
        `${inset}px`,
      );
    };
    updateInset();
    viewport?.addEventListener('resize', updateInset);
    viewport?.addEventListener('scroll', updateInset);
    window.addEventListener('resize', updateInset);
    return () => {
      viewport?.removeEventListener('resize', updateInset);
      viewport?.removeEventListener('scroll', updateInset);
      window.removeEventListener('resize', updateInset);
      document.documentElement.style.removeProperty('--visual-inset-bottom');
    };
  }, []);
  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);
  function close() {
    setOpen(false);
    trigger.current?.focus();
  }
  return (
    <aside className="assistant" aria-label="Alliance AI">
      {open ? (
        <section
          className="assistant-panel"
          aria-label="Alliance AI local search"
          onKeyDown={(e) => {
            if (e.key === 'Escape') close();
          }}
        >
          <div className="assistant-top">
            <div>
              <strong>Alliance AI</strong>
              <p>Local search · No LLM</p>
            </div>
            <button
              className="icon-button"
              onClick={close}
              aria-label="Close assistant"
            >
              <X size={18} />
            </button>
          </div>
          <p>
            Explore my work, research and background. Answers come from this
            portfolio’s public content.
          </p>
          <div role="status" aria-live="polite">
            {answer ? (
              <div className="answer">
                <p>{answer.text}</p>
                <Link href={answer.href}>{answer.label}</Link>
              </div>
            ) : (
              <div className="suggestions">
                {[
                  'What is your education?',
                  'Tell me about citizen science',
                  'How can we collaborate?',
                ].map((q) => (
                  <button key={q} onClick={() => setAnswer(answerQuestion(q))}>
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query.trim()) {
                setAnswer(answerQuestion(query));
                setQuery('');
              }
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
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about my work…"
            />
            <button className="icon-button" type="submit" aria-label="Ask">
              <Send size={18} />
            </button>
          </form>
        </section>
      ) : null}
      <button
        ref={trigger}
        className="assistant-trigger"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        title="Ask Alliance AI"
      >
        <MessageSquare size={18} />
        <span className="assistant-label">Ask Alliance AI</span>
        <span className="assistant-local">LOCAL</span>
      </button>
    </aside>
  );
}
