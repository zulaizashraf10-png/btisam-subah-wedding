/**
 * Hand-built botanical ornaments drawn from a few primitives
 * (a curved stem, almond leaves, five-petal blossoms) so they stay
 * crisp at any size and can be recoloured from the theme.
 */
type SprigProps = {
  length?: number;
  bend?: number;
  leaves?: number;
  leafSize?: number;
  blossom?: boolean;
  stroke?: string;
  fill?: string;
  accent?: string;
};

const LEAF = 'M0 0 C 5 -5.5, 15 -6, 22 0 C 15 6, 5 5.5, 0 0 Z';

function quad(t: number, p0: number[], p1: number[], p2: number[]) {
  const x = (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t ** 2 * p2[0];
  const y = (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t ** 2 * p2[1];
  const dx = 2 * (1 - t) * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
  const dy = 2 * (1 - t) * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

/** A single sprig growing along +x from the origin. */
export function Sprig({
  length = 140,
  bend = -24,
  leaves = 7,
  leafSize = 1,
  blossom = true,
  stroke = 'currentColor',
  fill = 'currentColor',
  accent = 'var(--color-gold)',
}: SprigProps) {
  const p0 = [0, 0];
  const p1 = [length / 2, bend];
  const p2 = [length, 0];
  const items = Array.from({ length: leaves }, (_, i) => {
    const t = 0.16 + (i / Math.max(1, leaves - 1)) * 0.74;
    const side = i % 2 === 0 ? 1 : -1;
    const p = quad(t, p0, p1, p2);
    const scale = leafSize * (1.05 - t * 0.45);
    return { ...p, side, scale };
  });
  return (
    <g>
      <path
        d={`M${p0} Q${p1} ${p2}`}
        fill="none"
        stroke={stroke}
        strokeWidth={1.1}
        strokeLinecap="round"
      />
      {items.map((l, i) => (
        <path
          key={i}
          d={LEAF}
          fill={fill}
          opacity={0.88}
          transform={`translate(${l.x} ${l.y}) rotate(${l.angle + l.side * 38}) scale(${l.scale})`}
        />
      ))}
      {blossom && <Blossom x={p2[0]} y={p2[1]} r={7} fill={fill} accent={accent} />}
    </g>
  );
}

export function Blossom({
  x = 0,
  y = 0,
  r = 8,
  fill = 'currentColor',
  accent = 'var(--color-gold)',
}: {
  x?: number;
  y?: number;
  r?: number;
  fill?: string;
  accent?: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: 5 }, (_, i) => (
        <ellipse
          key={i}
          cx={0}
          cy={-r * 0.62}
          rx={r * 0.42}
          ry={r * 0.66}
          fill={fill}
          transform={`rotate(${i * 72})`}
        />
      ))}
      <circle r={r * 0.26} fill={accent} />
    </g>
  );
}

/** Corner spray for frames. Rotate with CSS for each corner. */
export function CornerSpray({ className = '', color = 'var(--color-ivory)' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" style={{ color }}>
      <g transform="translate(14 14)">
        <g transform="rotate(8)">
          <Sprig length={170} bend={-20} leaves={9} />
        </g>
        <g transform="rotate(82)">
          <Sprig length={150} bend={18} leaves={8} />
        </g>
        <g transform="rotate(45)">
          <Sprig length={92} bend={-10} leaves={5} leafSize={0.8} />
        </g>
        <Blossom x={6} y={6} r={11} />
        <Blossom x={58} y={46} r={6} />
      </g>
    </svg>
  );
}

/** Horizontal ornament used between headings and copy. */
export function Flourish({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 28" className={className} aria-hidden="true">
      <line x1="0" y1="14" x2="88" y2="14" stroke="var(--color-gold)" strokeWidth="0.8" />
      <line x1="152" y1="14" x2="240" y2="14" stroke="var(--color-gold)" strokeWidth="0.8" />
      <g transform="translate(120 14)" fill="var(--color-gold)">
        <path d="M0 -9 L3 0 L0 9 L-3 0 Z" />
        <circle cx="-14" r="1.6" />
        <circle cx="14" r="1.6" />
        <path d="M-26 0 C -20 -6, -10 -6, -6 0 C -10 6, -20 6, -26 0Z" opacity="0.7" />
        <path d="M26 0 C 20 -6, 10 -6, 6 0 C 10 6, 20 6, 26 0Z" opacity="0.7" />
      </g>
    </svg>
  );
}

/** Garland: two sprigs meeting at a blossom, used above section titles. */
export function Garland({ className = '', color = 'var(--color-sage)' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 300 60" className={className} aria-hidden="true" style={{ color }}>
      <g transform="translate(150 34)">
        <g transform="rotate(184)">
          <Sprig length={130} bend={14} leaves={7} blossom={false} />
        </g>
        <g transform="rotate(-4)">
          <Sprig length={130} bend={-14} leaves={7} blossom={false} />
        </g>
        <Blossom r={10} />
        <Blossom x={-34} y={-6} r={5} />
        <Blossom x={34} y={-6} r={5} />
      </g>
    </svg>
  );
}
