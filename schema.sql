-- Run this once in Supabase → SQL Editor.
-- Guests can submit RSVPs and wishes. Nobody using the public key can read RSVPs.
-- Wishes appear on the site only after you set approved = true in the Table Editor.

create table if not exists public.rsvps (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  guest_name  text not null check (char_length(guest_name) between 2 and 120),
  phone       text check (phone is null or char_length(phone) <= 30),
  attendees   int  not null check (attendees between 1 and 20),
  events      text[] not null check (events <@ array['barat','walima']::text[] and cardinality(events) >= 1),
  attending   boolean not null,
  message     text check (message is null or char_length(message) <= 600)
);

create table if not exists public.wishes (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 2 and 80),
  message     text not null check (char_length(message) between 2 and 300),
  approved    boolean not null default false
);

alter table public.rsvps  enable row level security;
alter table public.wishes enable row level security;

-- RSVPs: insert only. No select/update/delete policies → guests' data stays private.
drop policy if exists "public can submit rsvp" on public.rsvps;
create policy "public can submit rsvp" on public.rsvps
  for insert to anon, authenticated with check (true);

-- Wishes: anyone may submit, but a submission can never mark itself approved.
drop policy if exists "public can submit wish" on public.wishes;
create policy "public can submit wish" on public.wishes
  for insert to anon, authenticated with check (approved = false);

-- Wishes: only approved ones are readable.
drop policy if exists "public reads approved wishes" on public.wishes;
create policy "public reads approved wishes" on public.wishes
  for select to anon, authenticated using (approved = true);

-- Column-level hardening: the public role cannot even request these columns.
revoke all on public.rsvps from anon, authenticated;
grant insert (guest_name, phone, attendees, events, attending, message) on public.rsvps to anon, authenticated;
revoke all on public.wishes from anon, authenticated;
grant insert (name, message) on public.wishes to anon, authenticated;
grant select (id, name, message, created_at, approved) on public.wishes to anon, authenticated;
