import { wedding, groomName, groomShort } from '../config/wedding';
import { CornerSpray, Flourish } from './Botanical';

/** Hero + welcome message. */
export default function Welcome() {
  const { couplePhoto, couplePhotoAlt, message } = wedding.welcome;
  return (
    <section id="home" aria-labelledby="home-title" className="cloth relative -mt-16 overflow-hidden pt-16">
      <CornerSpray className="pointer-events-none absolute -left-6 top-10 w-40 opacity-25 sm:w-64" />
      <CornerSpray className="pointer-events-none absolute -right-6 bottom-0 w-40 rotate-180 opacity-25 sm:w-64" />

      <div className="gutter relative mx-auto grid max-w-6xl items-center gap-12 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
        <div className="text-center md:text-left">
          <p className="eyebrow text-gold">The wedding of</p>
          <h1 id="home-title" className="mt-5 font-script leading-[1.05] text-ivory">
            <span className="block text-[3.4rem] sm:text-7xl">{groomShort}</span>
            <span className="my-1 block font-display text-3xl italic text-gold sm:text-4xl">&amp;</span>
            <span className="block text-[3.4rem] sm:text-7xl">{wedding.bride.shortName}</span>
          </h1>
          <Flourish className="mx-auto mt-6 w-48 md:mx-0" />
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ivory/85 md:text-xl">{message}</p>
          <p className="mt-4 text-base italic text-sage">
            {groomName} &amp; {wedding.bride.name}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4 md:justify-start">
            <a href="#rsvp" className="btn-gold rounded-full">
              Kindly RSVP
            </a>
            <a href="#events" className="btn-ghost rounded-full text-ivory hover:bg-ivory hover:text-olive">
              View Events
            </a>
          </div>
        </div>

        <figure className="relative mx-auto w-full max-w-[380px]">
          <div className="paper gilt-frame aspect-[4/5] overflow-hidden rounded-t-[999px] p-3">
            {couplePhoto ? (
              <img
                src={couplePhoto}
                alt={couplePhotoAlt || `${groomShort} and ${wedding.bride.shortName}`}
                className="h-full w-full rounded-t-[999px] object-cover"
                loading="eager"
                decoding="async"
              />
            ) : (
              <div className="cloth flex h-full w-full flex-col items-center justify-center rounded-t-[999px] text-center">
                <span className="font-script text-8xl leading-none text-gold">
                  {groomShort.startsWith('[') ? '·' : groomShort.charAt(0)}
                  <span className="font-display text-4xl text-sage"> &amp; </span>
                  {wedding.bride.shortName.charAt(0)}
                </span>
                <span className="eyebrow mt-6 text-sage">27 · 11 · 2026</span>
              </div>
            )}
          </div>
          {!couplePhoto && (
            <figcaption className="sr-only">Monogram panel. A couple photograph can be added in the configuration.</figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}
