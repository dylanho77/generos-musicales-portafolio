import { useEffect } from "react";
import Player from "./Player.jsx";

function Seccion({ titulo, children }) {
  return (
    <section>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">{titulo}</h4>
      {children}
    </section>
  );
}

export default function GenreModal({ genero, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={genero.nombre}
    >
      <div
        className="pop relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-line bg-card p-6 sm:rounded-3xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-line text-zinc-400 hover:text-white"
        >
          ✕
        </button>

        <div className="mb-1 h-1 w-14 rounded-full" style={{ background: genero.color }} />
        <h2 className="mt-3 text-3xl font-bold text-white">{genero.nombre}</h2>
        <p className="mt-1 text-sm text-zinc-400">
          {genero.origen} · {genero.pais} · {genero.categoria}
        </p>

        <div className="mt-6 space-y-6">
          <Player genero={genero} />

          <Seccion titulo="Historia y origen">
            <p className="leading-relaxed text-zinc-300">{genero.historia}</p>
          </Seccion>

          <Seccion titulo="Instrumentos principales">
            <ul className="flex flex-wrap gap-2">
              {genero.instrumentos.map((i) => (
                <li key={i} className="rounded-full border border-line bg-bg px-3 py-1 text-sm text-zinc-200">
                  {i}
                </li>
              ))}
            </ul>
          </Seccion>

          <Seccion titulo="Características rítmicas">
            <p className="leading-relaxed text-zinc-300">{genero.ritmo}</p>
          </Seccion>

          <Seccion titulo="Artistas y canciones icónicas">
            <ol className="space-y-2">
              {genero.iconicos.map((a, i) => (
                <li key={a} className="flex items-center gap-3 rounded-xl border border-line bg-bg px-4 py-3 text-sm text-zinc-200">
                  <span className="font-semibold" style={{ color: genero.color }}>{i + 1}</span>
                  {a}
                </li>
              ))}
            </ol>
          </Seccion>
        </div>
      </div>
    </div>
  );
}
