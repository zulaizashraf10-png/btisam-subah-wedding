import { wedding, groomName } from '../config/wedding';
import { Garland, Flourish } from './Botanical';

export default function Footer() {
  return (
    <footer className="cloth border-t border-gold/40">
      <div className="gutter mx-auto max-w-3xl py-20 text-center">
        <Garland className="mx-auto w-56" />
        <p className="mt-6 font-script text-5xl leading-tight text-ivory sm:text-6xl">
          <span className="block">{groomName}</span>
          <span className="my-1 block font-display text-3xl text-gold">&amp;</span>
          <span className="block">{wedding.bride.name}</span>
        </p>
        <p className="eyebrow mt-5 text-gold">27 &amp; 29 November 2026 · Gujranwala &amp; Lahore</p>
        <Flourish className="mx-auto mt-8 w-44" />
        <p className="mx-auto mt-6 max-w-md text-lg italic text-ivory/80">{wedding.footer.thanks}</p>
        <p className="mt-10 font-label text-xs tracking-wide text-sage">With love and gratitude, from both families</p>
      </div>
    </footer>
  );
}
