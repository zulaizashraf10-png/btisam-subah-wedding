import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { wedding, groomShort } from '../config/wedding';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#story', label: 'Our Story' },
  { href: '#events', label: 'Events' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#rsvp', label: 'RSVP' },
  { href: '#location', label: 'Location' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-[env(safe-area-inset-top,0px)] z-40 transition-colors duration-300 ${
        scrolled || open ? 'bg-olive-deep/95 shadow-[0_1px_0_rgb(197_164_109/0.35)] backdrop-blur' : 'bg-transparent'
      }`}
    >
      <nav aria-label="Main" className="gutter mx-auto flex h-16 max-w-6xl items-center justify-between">
        <a href="#home" className="font-script text-3xl leading-none text-gold" aria-label="Back to top">
          {groomShort.startsWith('[') ? '…' : groomShort.charAt(0)}
          <span className="mx-1 align-middle font-display text-base text-sage">&amp;</span>
          {wedding.bride.shortName.charAt(0)}
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="eyebrow text-ivory/85 transition-colors hover:text-gold">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="p-2 text-ivory md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div id="mobile-menu" hidden={!open} className="gutter border-t border-gold/30 bg-olive-deep md:hidden">
        <ul className="mx-auto flex max-w-6xl flex-col py-3">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-display text-2xl text-ivory hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
