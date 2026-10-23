import { Garland } from './Botanical';

type Props = {
  eyebrow: string;
  title: string;
  id?: string;
  tone?: 'light' | 'dark';
};

export default function SectionHeading({ eyebrow, title, id, tone = 'light' }: Props) {
  const dark = tone === 'dark';
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Garland className="mx-auto w-48 sm:w-56" color={dark ? 'var(--color-sage)' : 'var(--color-olive)'} />
      <p className={`eyebrow mt-2 ${dark ? 'text-gold' : 'text-gold-deep'}`}>{eyebrow}</p>
      <h2
        id={id}
        className={`mt-3 font-display text-4xl font-medium leading-tight sm:text-5xl ${dark ? 'text-ivory' : 'text-olive'}`}
      >
        {title}
      </h2>
    </div>
  );
}
