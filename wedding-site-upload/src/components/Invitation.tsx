import { useEffect, useRef, useState } from 'react';
import { MailOpen } from 'lucide-react';
import { wedding, groomName, groomConfirmed } from '../config/wedding';
import { CornerSpray, Flourish } from './Botanical';

type Props = { onOpen: () => void };

/** Opening screen styled as a printed invitation card. */
export default function Invitation({ onOpen }: Props) {
  const [leaving, setLeaving] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const open = () => {
    if (leaving) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setLeaving(true);
    window.setTimeout(onOpen, reduce ? 0 : 1100);
  };

  useEffect(() => {
    buttonRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') open();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="invite-title"
      className={`cloth fixed inset-0 z-50 overflow-y-auto ${leaving ? 'leaving' : ''}`}
    >
      <div className="gutter flex min-h-full items-center justify-center py-10">
        <div className="invite-card anim-bloom relative w-full max-w-[460px]">
          <div className="paper gilt-frame relative overflow-hidden px-7 pb-10 pt-14 text-center shadow-[0_40px_80px_-30px_rgb(0_0_0/0.65)] sm:px-12">
            <CornerSpray className="pointer-events-none absolute -left-3 -top-3 w-32 text-olive opacity-90 sm:w-40" color="var(--color-sage)" />
            <CornerSpray className="pointer-events-none absolute -bottom-3 -right-3 w-32 rotate-180 opacity-90 sm:w-40" color="var(--color-sage)" />

            <p className="anim-rise eyebrow text-gold-deep" style={{ animationDelay: '.35s' }}>
              Bismillah ir-Rahman ir-Rahim
            </p>
            <p className="anim-rise mt-6 text-lg italic text-olive" style={{ animationDelay: '.5s' }}>
              {wedding.openingLine}
            </p>

            <h1 id="invite-title" className="mt-5">
              <span
                className={`anim-rise block font-script text-[2.9rem] leading-[1.15] sm:text-[3.4rem] ${
                  groomConfirmed ? 'text-olive' : 'text-sage'
                }`}
                style={{ animationDelay: '.7s' }}
              >
                {groomName}
              </span>
              <span
                className="anim-rise my-2 block eyebrow text-gold-deep"
                style={{ animationDelay: '.85s' }}
              >
                With
              </span>
              <span
                className="anim-rise block font-script text-[2.9rem] leading-[1.15] text-olive sm:text-[3.4rem]"
                style={{ animationDelay: '1s' }}
              >
                {wedding.bride.name}
              </span>
            </h1>

            <p className="anim-rise mt-5 text-base italic text-charcoal/80" style={{ animationDelay: '1.15s' }}>
              {wedding.bride.parentLine}
            </p>

            <Flourish className="anim-rise mx-auto mt-6 w-44" />

            <p
              className="anim-rise mt-4 font-display text-2xl tracking-[0.12em] text-olive"
              style={{ animationDelay: '1.3s' }}
            >
              {wedding.headlineDate}
            </p>

            <div className="anim-rise mt-9" style={{ animationDelay: '1.5s' }}>
              <button ref={buttonRef} type="button" onClick={open} className="btn-gold anim-breathe rounded-full">
                <MailOpen size={16} aria-hidden="true" />
                Open Invitation
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={open}
        className="eyebrow fixed right-[max(16px,env(safe-area-inset-right,0px))] top-[max(14px,env(safe-area-inset-top,0px))] px-2 py-2 text-ivory/70 hover:text-ivory"
      >
        Skip
      </button>
    </div>
  );
}
