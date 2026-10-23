import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X, ImageIcon } from 'lucide-react';
import { wedding, type GalleryItem } from '../config/wedding';
import SectionHeading from './SectionHeading';
import { CornerSpray } from './Botanical';

/** Editorial rhythm (3 columns): tall, square, square / wide / square, wide — fills a clean 3×3 per six photos. */
const SPANS = ['sm:row-span-2', '', '', 'sm:col-span-2', '', 'sm:col-span-2'];

function Placeholder({ item, large = false }: { item: GalleryItem; large?: boolean }) {
  return (
    <div className="cloth relative flex h-full w-full flex-col items-center justify-center overflow-hidden text-center">
      <CornerSpray className="absolute -left-4 -top-4 w-24 opacity-30" color="var(--color-sage)" />
      <CornerSpray className="absolute -bottom-4 -right-4 w-24 rotate-180 opacity-30" color="var(--color-sage)" />
      <ImageIcon size={large ? 36 : 22} className="text-gold" aria-hidden="true" />
      <span className={`eyebrow mt-3 text-sage ${large ? '' : 'text-[0.6rem]'}`}>Photograph to come</span>
      {large && <span className="mt-2 px-6 font-display text-xl italic text-ivory/80">{item.caption}</span>}
    </div>
  );
}

export default function Gallery() {
  const items = wedding.gallery;
  const [index, setIndex] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'Tab') {
        // keep focus inside the lightbox
        const nodes = document.querySelectorAll<HTMLElement>('#lightbox button');
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [index, close, step]);

  const current = index === null ? null : items[index];

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="paper">
      <div className="gutter mx-auto max-w-6xl py-20 sm:py-28">
        <SectionHeading id="gallery-title" eyebrow="Moments" title="Gallery" />
        <ul className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-3 sm:gap-4 lg:auto-rows-[250px]">
          {items.map((item, i) => (
            <li key={i} className={`${SPANS[i % SPANS.length]} min-w-0`}>
              <button
                type="button"
                className="group relative block h-full w-full overflow-hidden border border-gold/40"
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget;
                  setIndex(i);
                }}
                aria-label={`Open image ${i + 1} of ${items.length}: ${item.caption}`}
              >
                {item.src ? (
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                ) : (
                  <Placeholder item={item} />
                )}
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-olive-deep/85 to-transparent px-3 pb-2 pt-8 text-left font-display text-base italic text-ivory opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  {item.caption}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center font-label text-xs tracking-wide text-charcoal/60">
          Illustrated tiles are placeholders. They will be replaced with the couple's photographs.
        </p>
      </div>

      {current && index !== null && (
        <div
          id="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${index + 1} of ${items.length}`}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-olive-deep/95 px-[max(16px,env(safe-area-inset-left,0px))] py-16"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <figure className="flex max-h-full w-full max-w-4xl flex-col items-center">
            <div className="aspect-[4/3] max-h-[72vh] w-full max-w-full overflow-hidden border border-gold/50">
              {current.src ? (
                <img src={current.src} alt={current.alt} className="h-full w-full object-contain" />
              ) : (
                <Placeholder item={current} large />
              )}
            </div>
            <figcaption className="mt-4 text-center font-display text-xl italic text-ivory">
              {current.caption}
              <span className="ml-3 font-label text-xs not-italic tracking-[0.2em] text-sage">
                {index + 1} / {items.length}
              </span>
            </figcaption>
          </figure>

          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close gallery"
            className="absolute right-[max(16px,env(safe-area-inset-right,0px))] top-[max(16px,env(safe-area-inset-top,0px))] rounded-full border border-gold/50 p-2 text-ivory hover:bg-ivory/10"
          >
            <X size={22} />
          </button>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous image"
            className="absolute left-[max(8px,env(safe-area-inset-left,0px))] top-1/2 -translate-y-1/2 rounded-full border border-gold/50 bg-olive-deep/60 p-2 text-ivory hover:bg-ivory/10 sm:left-6"
          >
            <ChevronLeft size={26} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next image"
            className="absolute right-[max(8px,env(safe-area-inset-right,0px))] top-1/2 -translate-y-1/2 rounded-full border border-gold/50 bg-olive-deep/60 p-2 text-ivory hover:bg-ivory/10 sm:right-6"
          >
            <ChevronRight size={26} />
          </button>
        </div>
      )}
    </section>
  );
}
