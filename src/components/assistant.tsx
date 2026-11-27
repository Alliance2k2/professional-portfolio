'use client';

import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { MessageSquare } from 'lucide-react';

const AssistantPanel = dynamic(
  () => import('./assistant-panel').then((module) => module.AssistantPanel),
  {
    ssr: false,
    loading: () => (
      <section
        id="assistant-panel"
        className="assistant-panel"
        role="dialog"
        aria-modal="false"
        aria-label="Ask about the portfolio"
        aria-live="polite"
      >
        <p>Loading the local portfolio assistant...</p>
      </section>
    ),
  },
);

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  function close() {
    setOpen(false);
    trigger.current?.focus();
  }

  function toggle() {
    if (open) {
      close();
      return;
    }
    setHasOpened(true);
    setOpen(true);
  }

  return (
    <aside className="assistant" aria-label="Portfolio question assistant">
      {hasOpened ? (
        <div hidden={!open}>
          <AssistantPanel isOpen={open} onClose={close} />
        </div>
      ) : null}
      <button
        ref={trigger}
        className="assistant-trigger"
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={hasOpened ? 'assistant-panel' : undefined}
        title="Ask about the portfolio"
      >
        <MessageSquare size={18} />
        <span className="assistant-label">Ask about my work</span>
        <span className="assistant-local">LOCAL</span>
      </button>
    </aside>
  );
}
