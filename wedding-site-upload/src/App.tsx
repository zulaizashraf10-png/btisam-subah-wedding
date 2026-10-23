import { useEffect, useRef, useState } from 'react';
import { wedding, groomShort, groomConfirmed } from './config/wedding';
import Invitation from './components/Invitation';
import Nav from './components/Nav';
import Welcome from './components/Welcome';
import Story from './components/Story';
import Events from './components/Events';
import Countdown from './components/Countdown';
import Gallery from './components/Gallery';
import Rsvp from './components/Rsvp';
import Venues from './components/Venues';
import Wishes from './components/Wishes';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';

const OPENED_KEY = 'invitation-opened';

function readOpened(): boolean {
  try {
    return sessionStorage.getItem(OPENED_KEY) === '1' || window.location.hash.length > 1;
  } catch {
    return false;
  }
}

export default function App() {
  const [opened, setOpened] = useState(readOpened);
  const siteRef = useRef<HTMLDivElement>(null);

  // Apply theme colours from the central config.
  useEffect(() => {
    const r = document.documentElement.style;
    const t = wedding.theme;
    r.setProperty('--color-olive', t.olive);
    r.setProperty('--color-olive-deep', t.oliveDeep);
    r.setProperty('--color-ivory', t.ivory);
    r.setProperty('--color-gold', t.gold);
    r.setProperty('--color-sage', t.sage);
    r.setProperty('--color-charcoal', t.charcoal);
    document.title = groomConfirmed
      ? `${groomShort} & ${wedding.bride.shortName} · Wedding Invitation`
      : `${wedding.bride.name} · Wedding Invitation`;
  }, []);

  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden';
    // Keep the site out of the tab order while the invitation card is showing.
    siteRef.current?.toggleAttribute('inert', !opened);
  }, [opened]);

  const handleOpen = () => {
    try {
      sessionStorage.setItem(OPENED_KEY, '1');
    } catch {
      /* storage unavailable — fine */
    }
    setOpened(true);
    window.scrollTo({ top: 0 });
    window.setTimeout(() => document.getElementById('main')?.focus({ preventScroll: true }), 50);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-ivory focus:px-4 focus:py-2 focus:text-olive"
      >
        Skip to content
      </a>
      {!opened && <Invitation onOpen={handleOpen} />}
      <div ref={siteRef} aria-hidden={!opened}>
        <Nav />
        <main id="main" tabIndex={-1} className="outline-none">
          <Welcome />
          <Countdown />
          <Story />
          <Events />
          <Gallery />
          <Rsvp />
          <Venues />
          <Wishes />
        </main>
        <Footer />
        <MusicPlayer />
      </div>
    </>
  );
}
