import { useMemo, useState } from "react";
import { categorias, generos } from "./data/generos.js";
import GenreCard from "./components/GenreCard.jsx";
import GenreModal from "./components/GenreModal.jsx";

const normalizar = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function App() {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [abierto, setAbierto] = useState(null);

  const resultados = useMemo(() => {
    const q = normalizar(busqueda.trim());
    return generos.filter((g) => {
      if (categoria !== "Todos" && g.categoria !== categoria) return false;
      if (!q) return true;
      const texto = normalizar([g.nombre, g.pais, ...g.iconicos].join(" "));
      return texto.includes(q);
    });
  }, [busqueda, categoria]);

  return (
    <div className="min-h-screen">
      <header className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(167,139,250,0.18),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 text-center sm:py-24">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">Ritmo Mundial</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Descubre los géneros <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">que mueven al mundo</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-zinc-400 sm:text-lg">
            Un recorrido por la historia, los instrumentos y los artistas que dieron forma a la música, de la bachata al hip-hop.
          </p>

          <div className="mx-auto mt-8 max-w-xl">
            <label htmlFor="buscar" className="sr-only">Buscar</label>
            <div className="flex items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3 focus-within:border-violet-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-500"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
              <input
                id="buscar"
                type="search"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Busca por género, artista o país…"
                className="w-full bg-transparent text-white placeholder-zinc-500 outline-none"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Categorías">
          {categorias.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={c === categoria}
              onClick={() => setCategoria(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                c === categoria
                  ? "border-white bg-white font-medium text-black"
                  : "border-line text-zinc-300 hover:border-zinc-500"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {resultados.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {resultados.map((g) => (
              <GenreCard key={g.id} genero={g} onOpen={setAbierto} />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-zinc-500">No se encontraron géneros para tu búsqueda.</p>
        )}
      </main>

      <footer className="border-t border-line py-8 text-center text-sm text-zinc-600">
        Ritmo Mundial · Explora la música del mundo
      </footer>

      {abierto && <GenreModal genero={abierto} onClose={() => setAbierto(null)} />}
    </div>
  );
}
