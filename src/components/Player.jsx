import { useEffect, useState } from "react";
import Waveform from "./Waveform.jsx";

const DURACION = 180; // segundos simulados

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export default function Player({ genero }) {
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [pista, setPista] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setT((prev) => {
        if (prev + 1 >= DURACION) {
          setPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing]);

  const cambiar = (i) => {
    setPista(i);
    setT(0);
    setPlaying(true);
  };

  return (
    <div className="rounded-2xl border border-line bg-bg/60 p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between text-sm">
        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-500">Reproduciendo (simulación)</p>
          <p className="font-medium text-zinc-100">{genero.iconicos[pista]}</p>
        </div>
        <span className="rounded-full border border-line px-2 py-0.5 text-xs text-zinc-400">{genero.bpm}</span>
      </div>

      <Waveform color={genero.color} playing={playing} />

      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pausar" : "Reproducir"}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-black transition hover:scale-105"
          style={{ background: genero.color }}
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="4" width="5" height="16" rx="1" /><rect x="14" y="4" width="5" height="16" rx="1" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8z" /></svg>
          )}
        </button>
        <span className="w-10 text-xs tabular-nums text-zinc-400">{fmt(t)}</span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full transition-all duration-1000 ease-linear" style={{ width: `${(t / DURACION) * 100}%`, background: genero.color }} />
        </div>
        <span className="w-10 text-right text-xs tabular-nums text-zinc-400">{fmt(DURACION)}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {genero.iconicos.map((p, i) => (
          <button
            key={p}
            onClick={() => cambiar(i)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              i === pista ? "border-transparent text-black" : "border-line text-zinc-300 hover:border-zinc-500"
            }`}
            style={i === pista ? { background: genero.color } : undefined}
          >
            {p.split(" – ")[1] ?? p}
          </button>
        ))}
      </div>
    </div>
  );
}
