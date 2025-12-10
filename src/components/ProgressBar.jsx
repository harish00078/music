import React from "react";

function formatTime(sec) {
  if (!sec || isNaN(sec)) return "0:00";
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function ProgressBar({
  progress,
  currentTime,
  duration,
  onSeek,
}) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
        <span>{formatTime(currentTime)}</span>
        <span>{duration ? formatTime(duration) : "0:00"}</span>
      </div>
      <div className="relative h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-accent"
          style={{ width: `${progress}%` }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => onSeek(parseFloat(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}
