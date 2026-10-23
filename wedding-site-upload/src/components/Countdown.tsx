import { useEffect, useState } from 'react';
import { wedding, countdownTarget } from '../config/wedding';
import { Flourish } from './Botanical';

function remaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    done: diff === 0,
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const target = countdownTarget().getTime();
  const [t, setT] = useState(() => remaining(target));

  useEffect(() => {
    if (t.done) return;
    const id = window.setInterval(() => setT(remaining(target)), 1000);
    return () => window.clearInterval(id);
  }, [target, t.done]);

  const { label, finishedMessage, timeZone } = wedding.countdown;
  const when = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'long',
  }).format(target);

  const units = [
    { label: 'Days', value: t.days },
    { label: 'Hours', value: t.hours },
    { label: 'Minutes', value: t.minutes },
    { label: 'Seconds', value: t.seconds },
  ];

  return (
    <section aria-labelledby="countdown-title" className="paper border-y border-gold/40">
      <div className="gutter mx-auto max-w-4xl py-16 text-center sm:py-20">
        <p className="eyebrow text-gold-deep">Counting down to the {label}</p>
        <h2 id="countdown-title" className="sr-only">
          Countdown to the {label}
        </h2>
        {t.done ? (
          <p className="mt-6 font-script text-5xl text-olive sm:text-6xl" role="status">
            {finishedMessage}
          </p>
        ) : (
          <>
            <div className="mx-auto mt-8 grid max-w-2xl grid-cols-4 gap-2 sm:gap-6" aria-hidden="true">
              {units.map((u) => (
                <div key={u.label} className="flex flex-col items-center">
                  <span className="font-display text-5xl font-medium tabular-nums text-olive sm:text-7xl">
                    {String(u.value).padStart(2, '0')}
                  </span>
                  <span className="eyebrow mt-2 text-[0.62rem] text-charcoal/70 sm:text-[0.7rem]">{u.label}</span>
                </div>
              ))}
            </div>
            <p className="sr-only">
              {t.days} days, {t.hours} hours and {t.minutes} minutes to go.
            </p>
          </>
        )}
        <Flourish className="mx-auto mt-8 w-40" />
        <p className="mt-3 font-label text-sm text-charcoal/75">
          {when}
        </p>
      </div>
    </section>
  );
}
