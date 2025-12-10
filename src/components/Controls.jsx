import React from "react";
import { motion } from "framer-motion";

export default function Controls({ playing, onTogglePlay, onPrev, onNext }) {
  return (
    <div className="flex items-center gap-4 mt-3">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onPrev}
        className="w-9 h-9 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center text-sm text-zinc-200 hover:bg-zinc-800 transition"
      >
        ⏮
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onTogglePlay}
        className="w-14 h-14 rounded-full bg-accent text-black font-semibold text-xl shadow-lg shadow-accent/40 flex items-center justify-center"
      >
        {playing ? "⏸" : "▶"}
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
        className="w-9 h-9 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center text-sm text-zinc-200 hover:bg-zinc-800 transition"
      >
        ⏭
      </motion.button>
    </div>
  );
}
