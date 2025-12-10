import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentIndex, play } from "../store/playerSlice.js";

export default function Playlist() {
  const dispatch = useDispatch();
  const { tracks, status } = useSelector((state) => state.playlist);
  const { currentIndex } = useSelector((state) => state.player);

  const handleSelect = (index) => {
    dispatch(setCurrentIndex(index));
    dispatch(play());
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
          Playlist
        </p>
        <h2 className="mt-2 text-lg font-semibold">Your tracks (20 slots ready)</h2>
        <p className="text-xs text-zinc-400 mt-1">
          {status === "loading"
            ? "Attempting to load from FMA API (if key set)…"
            : "Click a track to play it instantly. Replace audio & cover files with real FMA assets for production."}
        </p>
      </div>

      <div className="space-y-2">
        {tracks.map((track, i) => {
          const active = i === currentIndex;
          return (
            <button
              key={track.id || i}
              onClick={() => handleSelect(i)}
              className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-2xl border text-left transition ${
                active
                  ? "bg-accentSoft border-accent text-white"
                  : "bg-zinc-950/60 border-zinc-800 text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{track.title}</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {track.artist}
                  </p>
                </div>
              </div>
              <span className="text-[11px] text-zinc-400">
                {track.length}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
