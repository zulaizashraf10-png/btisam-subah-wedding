import { useRef, useState } from 'react';
import { Music, Pause } from 'lucide-react';
import { wedding } from '../config/wedding';

/** Discreet floating player. Hidden unless a music file is configured. Never autoplays. */
export default function MusicPlayer() {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  if (!wedding.music.src || failed) return null;

  const toggle = async () => {
    const a = ref.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        setFailed(true);
      }
    }
  };

  return (
    <div className="fixed bottom-[max(16px,env(safe-area-inset-bottom,0px))] right-[max(16px,env(safe-area-inset-right,0px))] z-40">
      <audio ref={ref} src={wedding.music.src} loop preload="none" onEnded={() => setPlaying(false)} />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? `Pause ${wedding.music.title}` : `Play ${wedding.music.title}`}
        className="flex h-12 items-center gap-2 rounded-full border border-gold bg-olive-deep/90 px-4 text-gold shadow-lg backdrop-blur hover:bg-olive"
      >
        {playing ? <Pause size={18} aria-hidden="true" /> : <Music size={18} aria-hidden="true" />}
        <span className="eyebrow hidden text-[0.62rem] sm:inline">{playing ? 'Pause' : 'Play music'}</span>
      </button>
    </div>
  );
}
