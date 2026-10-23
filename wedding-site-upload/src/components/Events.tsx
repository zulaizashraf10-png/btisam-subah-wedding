import { CalendarDays, MapPin, Navigation } from 'lucide-react';
import { publishedEvents, mapsLink, type WeddingEvent } from '../config/wedding';
import SectionHeading from './SectionHeading';
import { CornerSpray } from './Botanical';

function EventCard({ event }: { event: WeddingEvent }) {
  return (
    <article
      aria-labelledby={`event-${event.id}`}
      className="paper gilt-frame relative flex flex-col overflow-hidden px-7 pb-9 pt-12 text-center sm:px-10"
    >
      <CornerSpray className="pointer-events-none absolute -right-4 -top-4 w-28 rotate-90 opacity-70" color="var(--color-sage)" />
      <p className="eyebrow text-gold-deep">You are invited to the</p>
      <h3 id={`event-${event.id}`} className="mt-2 font-script text-6xl leading-tight text-olive">
        {event.name}
      </h3>
      <p className="mt-3 flex items-center justify-center gap-2 font-label text-sm tracking-wide text-charcoal">
        <CalendarDays size={16} className="text-gold-deep" aria-hidden="true" />
        {event.dateLabel}
      </p>

      <dl className="mx-auto mt-8 grid w-full max-w-sm grid-cols-2 border-y border-gold/50">
        {event.schedule.map((s, i) => (
          <div key={s.label} className={`py-5 ${i > 0 ? 'border-l border-gold/50' : ''}`}>
            <dt className="eyebrow text-[0.66rem] text-olive/75">{s.label}</dt>
            <dd className="mt-1 font-display text-3xl font-semibold tabular-nums text-olive">{s.time}</dd>
          </div>
        ))}
      </dl>

      <p className="mx-auto mt-7 max-w-xs text-lg italic leading-snug text-charcoal/85">{event.invitation}</p>

      <div className="mt-7 flex flex-col items-center gap-1">
        <p className="font-display text-2xl font-semibold text-olive">{event.venue}</p>
        <p className="flex items-start justify-center gap-1.5 font-label text-sm text-charcoal/80">
          <MapPin size={15} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
          {event.address}
        </p>
      </div>

      <div className="mt-auto pt-8">
        <a
          href={mapsLink(event)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost rounded-full text-olive hover:bg-olive hover:text-ivory"
        >
          <Navigation size={14} aria-hidden="true" />
          Directions
          <span className="sr-only"> to {event.venue} (opens Google Maps in a new tab)</span>
        </a>
      </div>
    </article>
  );
}

export default function Events() {
  return (
    <section id="events" aria-labelledby="events-title" className="cloth">
      <div className="gutter mx-auto max-w-6xl py-20 sm:py-28">
        <SectionHeading id="events-title" eyebrow="Save the dates" title="Wedding Events" tone="dark" />
        <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
          {publishedEvents.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </div>
    </section>
  );
}
