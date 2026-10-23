import { useState, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle, Loader2, UserRound, Send } from 'lucide-react';
import { wedding, publishedEvents } from '../config/wedding';
import { backendConfigured, submitRsvp, NOT_CONFIGURED_MESSAGE } from '../lib/supabase';
import SectionHeading from './SectionHeading';

type Status = { kind: 'idle' } | { kind: 'loading' } | { kind: 'success'; attending: boolean } | { kind: 'error'; message: string };
type Errors = Partial<Record<'name' | 'phone' | 'attendees' | 'events' | 'attending', string>>;

const EVENT_CHOICES = [
  ...publishedEvents.filter((e) => e.id === 'barat' || e.id === 'walima').map((e) => ({ value: [e.id], label: e.name })),
  { value: ['barat', 'walima'], label: 'Both' },
];

export function RsvpContacts({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <ul className="flex flex-col gap-3">
      {wedding.rsvp.contacts.map((c) => (
        <li key={c.name} className="flex items-center gap-3">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
              tone === 'dark' ? 'border-gold/60 text-gold' : 'border-gold-deep/50 text-gold-deep'
            }`}
          >
            <UserRound size={18} aria-hidden="true" />
          </span>
          <span>
            <span className={`block font-display text-xl ${tone === 'dark' ? 'text-ivory' : 'text-olive'}`}>{c.name}</span>
            {c.phone && (
              <span className={`block select-all font-label text-sm tabular-nums ${tone === 'dark' ? 'text-sage' : 'text-charcoal/75'}`}>
                {c.phone}
              </span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Rsvp() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attendees, setAttendees] = useState('1');
  const [eventsChoice, setEventsChoice] = useState<string>('');
  const [attending, setAttending] = useState<'' | 'yes' | 'no'>('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const validate = (): Errors => {
    const e: Errors = {};
    if (name.trim().length < 2) e.name = 'Please enter your name.';
    if (phone.trim() && !/^[+\d][\d\s\-()]{6,19}$/.test(phone.trim()))
      e.phone = 'Please enter a valid phone number, or leave this blank.';
    const n = Number(attendees);
    if (!Number.isInteger(n) || n < 1 || n > wedding.rsvp.maxAttendees)
      e.attendees = `Please choose between 1 and ${wedding.rsvp.maxAttendees} guests.`;
    if (!eventsChoice) e.events = 'Please choose which event you are replying for.';
    if (!attending) e.attending = 'Please let us know if you can attend.';
    return e;
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      document.getElementById(`rsvp-${first}`)?.focus();
      return;
    }
    setStatus({ kind: 'loading' });
    try {
      await submitRsvp({
        guest_name: name.trim(),
        phone: phone.trim() || null,
        attendees: Number(attendees),
        events: eventsChoice.split(','),
        attending: attending === 'yes',
        message: message.trim() || null,
      });
      setStatus({ kind: 'success', attending: attending === 'yes' });
    } catch (err) {
      setStatus({ kind: 'error', message: err instanceof Error ? err.message : 'Something went wrong. Please try again.' });
    }
  };

  const reset = () => {
    setName('');
    setPhone('');
    setAttendees('1');
    setEventsChoice('');
    setAttending('');
    setMessage('');
    setStatus({ kind: 'idle' });
  };

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`rsvp-${k}-error`} className="mt-1.5 font-label text-sm text-[#9B3B2E]">
        {errors[k]}
      </p>
    ) : null;

  return (
    <section id="rsvp" aria-labelledby="rsvp-title" className="cloth">
      <div className="gutter mx-auto max-w-6xl py-20 sm:py-28">
        <SectionHeading id="rsvp-title" eyebrow={wedding.rsvp.deadlineNote} title="Kindly Reply" tone="dark" />

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-[1fr_300px]">
          <div className="paper gilt-frame min-w-0 px-6 py-10 sm:px-10">
            {!backendConfigured && (
              <div role="note" className="mb-8 border border-gold-deep/40 bg-gold/10 px-4 py-3 font-label text-sm leading-relaxed text-charcoal">
                <strong className="font-semibold">Online RSVP is not connected yet.</strong> Replies sent through this form
                will not be saved until the site owner connects the database. Until then, please reply to one of the
                family contacts listed here.
              </div>
            )}

            {status.kind === 'success' ? (
              <div role="status" className="py-8 text-center">
                <CheckCircle2 size={44} className="mx-auto text-gold-deep" aria-hidden="true" />
                <p className="mt-4 font-script text-5xl text-olive">Thank you</p>
                <p className="mx-auto mt-3 max-w-sm text-lg text-charcoal/85">
                  {status.attending
                    ? 'Your reply has been received. We look forward to celebrating with you.'
                    : 'Your reply has been received. You will be missed, and we are grateful for your prayers.'}
                </p>
                <button type="button" onClick={reset} className="btn-ghost mt-8 rounded-full text-olive hover:bg-olive hover:text-ivory">
                  Send another reply
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="grid gap-6" aria-describedby="rsvp-privacy">
                <div>
                  <label htmlFor="rsvp-name" className="label">
                    Guest name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="rsvp-name"
                    className="field"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'rsvp-name-error' : undefined}
                    required
                    maxLength={120}
                  />
                  {err('name')}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="rsvp-phone" className="label">
                      Phone <span className="normal-case tracking-normal text-charcoal/60">(optional)</span>
                    </label>
                    <input
                      id="rsvp-phone"
                      type="tel"
                      inputMode="tel"
                      className="field"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'rsvp-phone-error' : undefined}
                      maxLength={20}
                    />
                    {err('phone')}
                  </div>
                  <div>
                    <label htmlFor="rsvp-attendees" className="label">
                      Number of guests <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id="rsvp-attendees"
                      className="field"
                      value={attendees}
                      onChange={(e) => setAttendees(e.target.value)}
                      aria-invalid={!!errors.attendees}
                      aria-describedby={errors.attendees ? 'rsvp-attendees-error' : undefined}
                    >
                      {Array.from({ length: wedding.rsvp.maxAttendees }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    {err('attendees')}
                  </div>
                </div>

                <fieldset aria-describedby={errors.events ? 'rsvp-events-error' : undefined}>
                  <legend className="label">
                    Replying for <span aria-hidden="true">*</span>
                  </legend>
                  <div className="grid grid-cols-3 gap-2">
                    {EVENT_CHOICES.map((c, i) => {
                      const v = c.value.join(',');
                      return (
                        <label
                          key={v}
                          className={`flex cursor-pointer items-center justify-center border px-2 py-3 text-center font-display text-lg transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold ${
                            eventsChoice === v ? 'border-olive bg-olive text-ivory' : 'border-olive/30 text-olive hover:border-olive'
                          }`}
                        >
                          <input
                            id={i === 0 ? 'rsvp-events' : undefined}
                            type="radio"
                            name="events"
                            value={v}
                            className="sr-only"
                            checked={eventsChoice === v}
                            onChange={() => setEventsChoice(v)}
                          />
                          {c.label}
                        </label>
                      );
                    })}
                  </div>
                  {err('events')}
                </fieldset>

                <fieldset aria-describedby={errors.attending ? 'rsvp-attending-error' : undefined}>
                  <legend className="label">
                    Your reply <span aria-hidden="true">*</span>
                  </legend>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {[
                      { v: 'yes', label: 'Joyfully Accepts' },
                      { v: 'no', label: 'Regretfully Declines' },
                    ].map((o, i) => (
                      <label
                        key={o.v}
                        className={`flex cursor-pointer items-center justify-center border px-3 py-3 font-display text-lg italic transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold ${
                          attending === o.v ? 'border-olive bg-olive text-ivory' : 'border-olive/30 text-olive hover:border-olive'
                        }`}
                      >
                        <input
                          id={i === 0 ? 'rsvp-attending' : undefined}
                          type="radio"
                          name="attending"
                          value={o.v}
                          className="sr-only"
                          checked={attending === o.v}
                          onChange={() => setAttending(o.v as 'yes' | 'no')}
                        />
                        {o.label}
                      </label>
                    ))}
                  </div>
                  {err('attending')}
                </fieldset>

                <div>
                  <label htmlFor="rsvp-message" className="label">
                    Message <span className="normal-case tracking-normal text-charcoal/60">(optional)</span>
                  </label>
                  <textarea
                    id="rsvp-message"
                    className="field min-h-[110px] resize-y"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={600}
                  />
                </div>

                {status.kind === 'error' && (
                  <div role="alert" className="flex items-start gap-3 border border-[#9B3B2E]/40 bg-[#9B3B2E]/5 px-4 py-3 font-label text-sm text-[#7A2E24]">
                    <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{status.message === NOT_CONFIGURED_MESSAGE ? NOT_CONFIGURED_MESSAGE : status.message}</span>
                  </div>
                )}

                <div className="flex flex-col items-center gap-3 pt-2">
                  <button type="submit" className="btn-gold w-full rounded-full sm:w-auto" disabled={status.kind === 'loading'}>
                    {status.kind === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending…
                      </>
                    ) : (
                      <>
                        <Send size={15} aria-hidden="true" /> Send Reply
                      </>
                    )}
                  </button>
                  <p id="rsvp-privacy" className="text-center font-label text-xs text-charcoal/60">
                    Your reply is seen only by the families. It is never shown on this website.
                  </p>
                </div>
              </form>
            )}
          </div>

          <aside aria-labelledby="rsvp-contacts-title" className="lg:pt-6">
            <h3 id="rsvp-contacts-title" className="eyebrow text-gold">
              For RSVP &amp; enquiries
            </h3>
            <p className="mt-3 text-lg text-ivory/80">You are also welcome to reply directly to the family.</p>
            <div className="mt-6">
              <RsvpContacts tone="dark" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
