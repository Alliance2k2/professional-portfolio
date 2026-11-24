'use client';
import { useState } from 'react';
export function ContactForm() {
  const [state, setState] = useState('');
  const [busy, setBusy] = useState(false);
  return (
    <form
      className="contact-form"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setState('');
        const data = Object.fromEntries(new FormData(e.currentTarget));
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
          const result = await response.json();
          setState(result.message);
        } catch {
          setState(
            'The service is unavailable. Please use the email link on this page.',
          );
        } finally {
          setBusy(false);
        }
      }}
    >
      <div className="form-row">
        <label>
          Name
          <input
            name="name"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
          />
        </label>
      </div>
      <label>
        Organization <span>(optional)</span>
        <input
          name="organization"
          maxLength={150}
          autoComplete="organization"
        />
      </label>
      <label>
        Subject
        <input name="subject" required minLength={3} maxLength={150} />
      </label>
      <label>
        Message
        <textarea
          name="message"
          rows={6}
          required
          minLength={20}
          maxLength={5000}
        />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="muted small">
        Message delivery is enabled only when an email provider is configured.
        You can always contact me directly by email.
      </p>
      <button className="button primary" disabled={busy}>
        {busy ? 'Sending…' : 'Send message'}
      </button>
      <p role="status" aria-live="polite">
        {state}
      </p>
    </form>
  );
}
