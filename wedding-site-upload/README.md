# Ibtisam & Subah · Wedding Invitation

React + TypeScript + Tailwind CSS (v4) + Vite. Lucide icons. Supabase for RSVPs and wishes.

## Edit the details

Everything lives in **`src/config/wedding.ts`**: names, family line, events, times, venues, map links, countdown, gallery photos, RSVP contacts, music, theme colours and SEO text.

- **Names:** groom Ibtisam Arif Butt, bride Subah Afzaal Butt (D/O Afzaal Mehmood Butt). The groom's name is shown first. Optionally add `groom.parentLine` (e.g. S/O …).
- **Photos:** put files in `public/photos/` and set `welcome.couplePhoto` and each `gallery[].src` (e.g. `/photos/couple-1.jpg`). Empty `src` shows a labelled illustrated placeholder.
- **Mehndi / Nikkah:** fill in their details and set `published: true`. Unpublished events never appear.
- **Maps:** links are built from venue name + address. To pin an exact location, paste the venue's Google Maps share link into `mapsUrl`, and optionally its embed URL into `embedUrl` (embeds only render when set).
- **Music:** add an instrumental file to `public/` and set `music.src`. It never autoplays.
- **Countdown:** `countdown.date`, `time` (24h), `timeZone`, `utcOffset` — currently Barat departure, 27 Nov 2026 16:00 Asia/Karachi (+05:00).
- **Social preview:** update `og:url` / `og:image` in `index.html` after publishing.

## Run locally

```bash
npm install
npm run dev
```

## Connect Supabase (RSVP + wishes)

Until this is done, the forms say plainly that nothing is saved and point guests to the family contacts.

1. Create a project at supabase.com.
2. SQL Editor → paste and run `supabase/schema.sql`.
3. Project Settings → API → copy the **Project URL** and the **anon / publishable** key.
4. Add them as environment variables:
   - Locally: copy `.env.example` to `.env` and fill both values.
   - In Lovable: connect Supabase through Lovable's Supabase integration, or add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the project's environment settings.
5. Never use the `service_role` key in this site.

**Privacy:** the database rules let the public *insert* RSVPs but never read them. View RSVPs in Supabase → Table Editor → `rsvps` (or export to CSV).

**Approving wishes:** Table Editor → `wishes` → set `approved` to `true`. Only approved wishes appear on the site.

## Personalised Lovable URL

1. Slug = groom's name, lowercase, no spaces or symbols: **`ibtisamarifbutt`** (`groomSlug` in the config computes it).
2. In Lovable: **Publish** → project/publish settings → edit the subdomain → enter the slug. Lovable tells you if it is taken.
3. If taken, try `ibtisamwedding`, `ibtisamarifbuttwedding` or `ibtisamweds`.
4. Changing the subdomain does not change the site's design or code.
