import { wedding } from '../config/wedding';
import SectionHeading from './SectionHeading';
import { Blossom } from './Botanical';

export default function Story() {
  const { title, paragraphs, fallback } = wedding.story;
  const body = paragraphs.length ? paragraphs : fallback;
  return (
    <section id="story" aria-labelledby="story-title" className="paper">
      <div className="gutter mx-auto max-w-3xl py-20 sm:py-28">
        <SectionHeading id="story-title" eyebrow="Two families, one celebration" title={title} />
        <div className="mx-auto mt-10 max-w-[38rem] space-y-5 text-center text-xl leading-relaxed text-charcoal/90">
          {body.map((p, i) => (
            <p key={i} className={i === 0 ? 'font-display text-2xl italic text-olive' : ''}>
              {p}
            </p>
          ))}
        </div>
        <svg viewBox="-20 -20 40 40" className="mx-auto mt-10 h-8 w-8" aria-hidden="true" style={{ color: 'var(--color-sage)' }}>
          <Blossom r={14} />
        </svg>
      </div>
    </section>
  );
}
