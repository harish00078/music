import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Player from "./components/Player.jsx";
import Playlist from "./components/Playlist.jsx";
import { fetchFmaTracks } from "./store/playlistSlice.js";

export default function App() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.playlist);

  useEffect(() => {
    dispatch(fetchFmaTracks());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-10 w-72 h-72 bg-accent/25 blur-3xl rounded-full" />
        <div className="absolute -bottom-40 -right-16 w-80 h-80 bg-emerald-500/20 blur-3xl rounded-full" />
      </div>

      <main className="relative z-10 w-full max-w-6xl flex flex-col gap-6">
        <header className="flex items-center justify-between mb-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-400">
              Harish • FMA Music Player
            </p>
            <h1 className="mt-2 text-2xl md:text-3xl font-semibold">
              Modern React Music Player (Redux Toolkit + FMA Hybrid, 20 tracks ready)
            </h1>
            <p className="mt-1 text-xs text-zinc-400 max-w-xl">
              Uses Redux Toolkit for global state and is ready for 20 Free Music Archive tracks.
              If an FMA API key is provided, it will load dynamic tracks; otherwise it uses the local 20-track playlist.
              Replace the files in /public/songs and /public/covers with real FMA audio & artwork to make it production-like.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-zinc-400">
            <span className="px-3 py-1 rounded-full border border-zinc-700 bg-black/40">
              React • Vite • Tailwind • Redux Toolkit • Framer Motion
            </span>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[3fr,2fr] items-stretch">
          <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-zinc-800 rounded-3xl shadow-card p-5 md:p-7 flex">
            <Player />
          </div>

          <aside className="bg-zinc-950/90 border border-zinc-800 rounded-3xl shadow-card p-4 md:p-5 max-h-[520px] overflow-y-auto">
            <Playlist />
          </aside>
        </section>

        <footer className="text-xs text-zinc-500 mt-2">
          {status === "loading" && <span>Trying to load FMA tracks with API key…</span>}
          {status === "failed" && (
            <span>
              FMA API error or missing key: {error}. Using bundled 20-track local playlist instead.
            </span>
          )}
          {status === "succeeded" && (
            <span>Loaded tracks from FMA API successfully (overriding local playlist).</span>
          )}
          {status === "idle" && (
            <span>Using local 20-track playlist.</span>
          )}
        </footer>
      </main>
    </div>
  );
}
