import { ExternalLink, MapPin } from 'lucide-react';
import { publishedEvents, mapsLink } from '../config/wedding';
import SectionHeading from './SectionHeading';

/**
 * Embedded maps render only when an `embedUrl` has been added to the config
 * after confirming the exact venue pin. Otherwise guests get a Google Maps
 * search link built from the supplied venue name and address.
 */
export default function Venues() {
  return (
    <section id="location" aria-labelledby="location-title" className="paper">
      <div className="gutter mx-auto max-w-6xl py-20 sm:py-28">
        <SectionHeading id="location-title" eyebrow="Finding your way" title="Venues & Directions" />
        <div className="mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-2">
          {publishedEvents.map((e) => (
            <article key={e.id} aria-labelledby={`venue-${e.id}`} className="flex min-w-0 flex-col">
              <div className="gilt-frame cloth relative aspect-[16/10] w-full max-w-full overflow-hidden">
                {e.embedUrl ? (
                  <iframe
                    title={`Map of ${e.venue}`}
                    src={e.embedUrl}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <a
                    href={mapsLink(e)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center"
                  >
                    <svg viewBox="0 0 120 80" className="w-40 opacity-80" aria-hidden="true">
                      <path d="M4 60 C 30 40, 50 70, 70 46 S 104 30, 116 20" fill="none" stroke="var(--color-sage)" strokeDasharray="3 4" />
                      <circle cx="4" cy="60" r="3" fill="var(--color-sage)" />
                      <path d="M116 6 a10 10 0 0 1 10 10 c0 8 -10 18 -10 18 s-10 -10 -10 -18 a10 10 0 0 1 10 -10z" transform="translate(-10 0)" fill="var(--color-gold)" />
                      <circle cx="106" cy="16" r="3.5" fill="var(--color-olive-deep)" />
                    </svg>
                    <span className="eyebrow text-gold transition-colors group-hover:text-ivory">Open in Google Maps</span>
                  </a>
                )}
              </div>
              <p className="eyebrow mt-6 text-gold-deep">{e.name} · {e.dateLabel}</p>
              <h3 id={`venue-${e.id}`} className="mt-2 font-display text-3xl font-semibold text-olive">
                {e.venue}
              </h3>
              <p className="mt-2 flex items-start gap-2 font-label text-base text-charcoal/80">
                <MapPin size={17} className="mt-1 shrink-0 text-gold-deep" aria-hidden="true" />
                {e.address}
              </p>
              <div className="mt-5">
                <a
                  href={mapsLink(e)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost rounded-full text-olive hover:bg-olive hover:text-ivory"
                >
                  Get directions <ExternalLink size={14} aria-hidden="true" />
                  <span className="sr-only"> to {e.venue} (opens in a new tab)</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
