import { useEffect, useState, type FormEvent } from 'react';
import { Heart, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { backendConfigured, fetchApprovedWishes, submitWish, type Wish } from '../lib/supabase';
import SectionHeading from './SectionHeading';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [fieldError, setFieldError] = useState<{ name?: string; message?: string }>({});

  useEffect(() => {
    fetchApprovedWishes().then(setWishes);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fe: typeof fieldError = {};
    if (name.trim().length < 2) fe.name = 'Please add your name.';
    if (message.trim().length < 2) fe.message = 'Please write a short wish.';
    setFieldError(fe);
    if (fe.name || fe.message) {
      document.getElementById(fe.name ? 'wish-name' : 'wish-message')?.focus();
      return;
    }
    setStatus('loading');
    try {
      await submitWish(name.trim(), message.trim());
      setStatus('success');
      setName('');
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  };

  return (
    <section id="wishes" aria-labelledby="wishes-title" className="cloth">
      <div className="gutter mx-auto max-w-6xl py-20 sm:py-28">
        <SectionHeading id="wishes-title" eyebrow="Duas & blessings" title="Wishes for the Couple" tone="dark" />

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-[1fr_1.1fr]">
          <form noValidate onSubmit={onSubmit} className="paper gilt-frame min-w-0 space-y-5 px-6 py-8 sm:px-8">
            <div>
              <label htmlFor="wish-name" className="label">Your name</label>
              <input
                id="wish-name"
                className="field"
                value={name}
                maxLength={80}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={!!fieldError.name}
                aria-describedby={fieldError.name ? 'wish-name-error' : undefined}
              />
              {fieldError.name && <p id="wish-name-error" className="mt-1.5 font-label text-sm text-[#9B3B2E]">{fieldError.name}</p>}
            </div>
            <div>
              <label htmlFor="wish-message" className="label">Your wish</label>
              <textarea
                id="wish-message"
                className="field min-h-[120px]"
                value={message}
                maxLength={300}
                onChange={(e) => setMessage(e.target.value)}
                aria-invalid={!!fieldError.message}
                aria-describedby={`wish-count${fieldError.message ? ' wish-message-error' : ''}`}
              />
              <div className="mt-1 flex justify-between gap-3 font-label text-xs text-charcoal/60">
                <span id="wish-message-error" className="text-[#9B3B2E]">{fieldError.message}</span>
                <span id="wish-count" className="tabular-nums">{message.length}/300</span>
              </div>
            </div>

            {status === 'success' && (
              <p role="status" className="flex items-start gap-2 font-label text-sm text-olive">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
                Thank you. Your wish has been received and will appear here once the family has approved it.
              </p>
            )}
            {status === 'error' && (
              <p role="alert" className="flex items-start gap-2 font-label text-sm text-[#7A2E24]">
                <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                {error}
              </p>
            )}

            <button type="submit" className="btn-gold w-full rounded-full" disabled={status === 'loading'}>
              {status === 'loading' ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending…
                </>
              ) : (
                <>
                  <Heart size={15} aria-hidden="true" /> Send your wish
                </>
              )}
            </button>
            <p className="text-center font-label text-xs text-charcoal/60">
              Wishes are reviewed by the family before they appear on the site.
            </p>
          </form>

          <div className="min-w-0">
            {wishes.length > 0 ? (
              <ul className="space-y-6">
                {wishes.map((w) => (
                  <li key={w.id} className="border-l border-gold/60 pl-5">
                    <p className="font-display text-xl italic leading-snug text-ivory">“{w.message}”</p>
                    <p className="eyebrow mt-2 text-sage">{w.name}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex h-full flex-col justify-center border border-dashed border-gold/40 px-6 py-10 text-center">
                <p className="font-script text-4xl text-gold">Be the first</p>
                <p className="mx-auto mt-3 max-w-xs text-lg text-ivory/75">
                  {backendConfigured
                    ? 'Approved wishes from family and friends will be shown here.'
                    : 'Wishes will be shown here once the site is connected to its database.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
