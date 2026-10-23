/**
 * ─────────────────────────────────────────────────────────────
 *  WEDDING CONFIGURATION — edit everything about the site here.
 * ─────────────────────────────────────────────────────────────
 *  Only confirmed details are filled in. Anything still unknown is
 *  left empty ('') and the site shows a clearly marked placeholder.
 */

export type ScheduleItem = { label: string; time: string };

export type WeddingEvent = {
  id: string;
  name: string;
  /** Unpublished events are never rendered anywhere on the site. */
  published: boolean;
  dateLabel: string;
  venue: string;
  address: string;
  schedule: ScheduleItem[];
  invitation: string;
  /** Leave '' to auto-generate a Google Maps search link from venue + address. */
  mapsUrl: string;
  /**
   * Optional Google Maps *embed* URL (Share → Embed a map → copy the src).
   * Only add one after confirming the pin is the correct venue.
   */
  embedUrl: string;
};

export type GalleryItem = {
  /** Image path, e.g. '/photos/couple-1.jpg'. Leave '' to show an illustrated placeholder. */
  src: string;
  alt: string;
  caption: string;
};

export const wedding = {
  bride: {
    name: 'Subah Afzaal Butt',
    shortName: 'Subah',
    parentLine: 'D/O Afzaal Mehmood Butt',
  },

  groom: {
    /** ← Add the groom's full name here once confirmed. */
    name: 'Ibtisam Arif Butt',
    /** ← Optional short name used in the monogram, e.g. 'Hassan'. */
    shortName: 'Ibtisam',
    /** ← Optional, e.g. 'S/O …'. Leave '' to hide. */
    parentLine: '',
    placeholder: '[Groom Name]',
  },

  openingLine: 'Together with our families',
  headlineDate: '27 November 2026',

  events: [
    {
      id: 'barat',
      name: 'Barat',
      published: true,
      dateLabel: 'Friday, 27 November 2026',
      venue: 'The Decorium Marquee',
      address: 'Chowk Kangniwala, GT Road, Gujranwala, Pakistan',
      schedule: [
        { label: 'Departure', time: '4:00 PM' },
        { label: 'Sehra Bandi', time: '6:30 PM' },
      ],
      invitation:
        'We request the pleasure of your company as the barat arrives to celebrate the wedding.',
      mapsUrl: '',
      embedUrl: '',
    },
    {
      id: 'walima',
      name: 'Walima',
      published: true,
      dateLabel: 'Sunday, 29 November 2026',
      venue: 'Wedding Lawns by Eden Canal Villas',
      address: 'Lahore, Pakistan',
      schedule: [
        { label: 'Reception', time: '1:30 PM' },
        { label: 'Lunch', time: '2:30 PM' },
      ],
      invitation:
        'Please join us for the walima reception and an afternoon lunch with family and friends.',
      mapsUrl: 'https://maps.app.goo.gl/AGV7KJxgFx2bNTuW9',
      embedUrl: '',
    },
    // ── Optional events: set published: true only after the details are confirmed.
    {
      id: 'mehndi',
      name: 'Mehndi',
      published: false,
      dateLabel: '',
      venue: '',
      address: '',
      schedule: [],
      invitation: '',
      mapsUrl: '',
      embedUrl: '',
    },
    {
      id: 'nikkah',
      name: 'Nikkah',
      published: false,
      dateLabel: '',
      venue: '',
      address: '',
      schedule: [],
      invitation: '',
      mapsUrl: '',
      embedUrl: '',
    },
  ] as WeddingEvent[],

  countdown: {
    label: 'Barat',
    /** YYYY-MM-DD */
    date: '2026-11-27',
    /** 24-hour HH:mm — set to the Barat departure time. */
    time: '16:00',
    timeZone: 'Asia/Karachi',
    /** UTC offset of the time zone above (Pakistan does not use daylight saving). */
    utcOffset: '+05:00',
    finishedMessage: 'The celebration has begun!',
  },

  welcome: {
    message:
      'With hearts full of gratitude, our families invite you to share in the joy of this marriage. Your presence, your prayers and your blessings would mean the world to us as we begin this new chapter together.',
    /** Optional couple photograph, e.g. '/photos/couple.jpg'. Leave '' for the monogram panel. */
    couplePhoto: '',
    couplePhotoAlt: '',
  },

  /** Add the couple's own story as paragraphs. Leave empty to show a short generic welcome. */
  story: {
    title: 'Our Story',
    paragraphs: [] as string[],
    fallback: [
      'Every love story is beautiful, and this one is only beginning.',
      'As two families come together, we look forward to celebrating with the people who have shaped our lives, and to the many years of laughter and companionship ahead.',
    ],
  },

  /** Replace src values with real photographs. Placeholders are clearly labelled illustrations. */
  gallery: [
    { src: '', alt: 'Photograph placeholder', caption: 'A favourite photograph of the couple' },
    { src: '', alt: 'Photograph placeholder', caption: 'Mehndi details' },
    { src: '', alt: 'Photograph placeholder', caption: 'Family portrait' },
    { src: '', alt: 'Photograph placeholder', caption: 'The barat' },
    { src: '', alt: 'Photograph placeholder', caption: 'Walima afternoon' },
    { src: '', alt: 'Photograph placeholder', caption: 'Candid moments' },
  ] as GalleryItem[],

  rsvp: {
    deadlineNote: 'Kindly respond at your earliest convenience.',
    maxAttendees: 10,
    /** Phone numbers are optional; leave '' and only the name is shown. */
    contacts: [
      { name: 'Ibtihaj Arif Butt', phone: '' },
      { name: 'Imtizaj Arif Butt', phone: '' },
    ],
  },

  /** Instrumental music. Leave src '' to hide the player. Audio never autoplays. */
  music: {
    src: '',
    title: 'Instrumental',
  },

  footer: {
    thanks:
      'Thank you for your love, your prayers and your presence. We cannot wait to celebrate with you.',
  },

  theme: {
    olive: '#343C2D',
    oliveDeep: '#262C21',
    ivory: '#F8F4EA',
    gold: '#C5A46D',
    sage: '#A6AD91',
    charcoal: '#2B2B28',
  },

  seo: {
    title: 'Ibtisam & Subah · Wedding Invitation',
    description:
      'You are warmly invited to the Barat on 27 November 2026 in Gujranwala and the Walima on 29 November 2026 in Lahore.',
    /** Fill in after publishing, e.g. 'https://yourslug.lovable.app/' */
    siteUrl: '',
    /** Social share image, e.g. '/og-image.jpg' (1200×630). */
    ogImage: '',
  },
};

// ── Derived helpers (no need to edit) ────────────────────────────────
export const groomName = wedding.groom.name.trim() || wedding.groom.placeholder;
export const groomShort =
  wedding.groom.shortName.trim() || wedding.groom.name.trim().split(' ')[0] || wedding.groom.placeholder;
export const groomConfirmed = wedding.groom.name.trim().length > 0;
export const publishedEvents = wedding.events.filter((e) => e.published);

/** Lowercase slug for the personalised URL, e.g. "Abu Al Hassan" → "abualhassan". */
export const groomSlug = wedding.groom.name
  .normalize('NFKD')
  .toLowerCase()
  .replace(/[^a-z0-9]/g, '');

export function mapsLink(e: WeddingEvent): string {
  if (e.mapsUrl) return e.mapsUrl;
  const q = [e.venue, e.address].filter(Boolean).join(', ');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

export function countdownTarget(): Date {
  const { date, time, utcOffset } = wedding.countdown;
  return new Date(`${date}T${time}:00${utcOffset}`);
}
