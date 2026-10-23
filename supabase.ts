import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * The anon (publishable) key is safe in the browser ONLY because Row Level
 * Security in supabase/schema.sql lets the public insert rows but never read
 * RSVPs, and only read wishes that you have approved.
 * Never put the service-role key in this project.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const backendConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = backendConfigured
  ? createClient(url!, anonKey!, { auth: { persistSession: false } })
  : null;

export const NOT_CONFIGURED_MESSAGE =
  'Online responses are not switched on yet, so nothing was saved. Please send your reply to one of the family contacts listed on this page.';

export type RsvpInput = {
  guest_name: string;
  phone: string | null;
  attendees: number;
  events: string[];
  attending: boolean;
  message: string | null;
};

export async function submitRsvp(input: RsvpInput): Promise<void> {
  if (!supabase) throw new Error(NOT_CONFIGURED_MESSAGE);
  // No .select() — the public role cannot read RSVPs back, by design.
  const { error } = await supabase.from('rsvps').insert(input);
  if (error) throw new Error('We could not save your response. Please check your connection and try again.');
}

export type Wish = { id: string; name: string; message: string; created_at: string };

export async function submitWish(name: string, message: string): Promise<void> {
  if (!supabase) throw new Error(NOT_CONFIGURED_MESSAGE.replace('your reply', 'your wishes'));
  const { error } = await supabase.from('wishes').insert({ name, message });
  if (error) throw new Error('We could not send your wish. Please try again in a moment.');
}

export async function fetchApprovedWishes(): Promise<Wish[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('wishes')
    .select('id, name, message, created_at')
    .eq('approved', true)
    .order('created_at', { ascending: false })
    .limit(30);
  if (error) return [];
  return data ?? [];
}
