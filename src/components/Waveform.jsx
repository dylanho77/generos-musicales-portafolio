import { useMemo } from "react";

// Ondas animadas puramente visuales (sin audio ni APIs externas).
export default function Waveform({ color, playing, bars = 48 }) {
  const items = useMemo(
    () =>
      Array.from({ length: bars }, (_, i) => ({
        h: 25 + Math.abs(Math.sin(i * 0.7) * 55) + ((i * 37) % 20),
        delay: -((i * 0.13) % 1.2),
        dur: 0.7 + ((i * 17) % 60) / 100,
      })),
    [bars]
  );

  return (
    <div
      className={`flex h-20 items-center justify-between gap-[3px] ${playing ? "" : "wave-paused"}`}
      aria-hidden="true"
    >
      {items.map((b, i) => (
        <span
          key={i}
          className="wave-bar w-full max-w-[6px] rounded-full"
          style={{
            height: `${Math.min(b.h, 100)}%`,
            background: color,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
