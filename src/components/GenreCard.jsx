export default function GenreCard({ genero, onOpen }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-line bg-card p-5 transition hover:-translate-y-1 hover:border-zinc-600">
      <div className="mb-4 h-1 w-12 rounded-full" style={{ background: genero.color }} />
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-xl font-semibold text-white">{genero.nombre}</h3>
        <span
          className="shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium"
          style={{ color: genero.color, borderColor: `${genero.color}55` }}
        >
          {genero.bpm}
        </span>
      </div>
      <p className="mb-3 text-xs text-zinc-500">
        {genero.origen} · {genero.pais}
      </p>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-zinc-300">{genero.descripcion}</p>
      <button
        onClick={() => onOpen(genero)}
        className="w-full rounded-xl border border-line bg-white/5 py-2.5 text-sm font-medium text-white transition hover:bg-white hover:text-black"
      >
        Explorar género
      </button>
    </article>
  );
}
