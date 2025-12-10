import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  togglePlay,
  setVolume,
  nextTrack,
  prevTrack,
} from "../store/playerSlice.js";
import ProgressBar from "./ProgressBar.jsx";
import Controls from "./Controls.jsx";

export default function Player() {
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  const { tracks } = useSelector((state) => state.playlist);
  const { currentIndex, playing, volume } = useSelector(
    (state) => state.player
  );

  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const current = tracks[currentIndex] || tracks[0];

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current
        .play()
        .catch(() => {
          // autoplay blocked
        });
    } else {
      audioRef.current.pause();
    }
  }, [playing, currentIndex, tracks]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration);
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const handleSeek = (pct) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = (pct / 100) * audio.duration;
    setProgress(pct);
    setCurrentTime(audio.currentTime);
  };

  const handleNext = () => {
    dispatch(nextTrack(tracks.length));
  };

  const handlePrev = () => {
    dispatch(prevTrack(tracks.length));
  };

  const handleVolumeChange = (value) => {
    dispatch(setVolume(value));
  };

  const handleEnded = () => {
    dispatch(nextTrack(tracks.length));
  };

  if (!current) {
    return <div>No tracks available.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-7 w-full">
      {/* Album section */}
      <motion.div
        className="relative w-full max-w-[260px] mx-auto md:mx-0 rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/60"
        animate={{ rotate: playing ? 360 : 0 }}
        transition={{ ease: "linear", duration: 18, repeat: Infinity }}
      >
        <img
          src={current.cover}
          alt={current.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-300">
            Now Playing
          </p>
          <p className="mt-1 text-lg font-semibold">{current.title}</p>
          <p className="text-xs text-zinc-400">{current.artist}</p>
        </div>
      </motion.div>

      {/* Controls + progress */}
      <div className="flex-1 flex flex-col justify-between gap-5">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold">
            {current.title}
          </h2>
          <p className="text-sm text-zinc-400 mt-1">{current.artist}</p>
        </div>

        <ProgressBar
          progress={progress}
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
        />

        <Controls
          playing={playing}
          onTogglePlay={() => dispatch(togglePlay())}
          onPrev={handlePrev}
          onNext={handleNext}
        />

        {/* Volume */}
        <div className="mt-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span>Volume</span>
            <span>{Math.round(volume * 100)}%</span>
          </div>
          <div className="relative h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-accent"
              style={{ width: `${volume * 100}%` }}
            />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <audio
          ref={audioRef}
          src={current.src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onEnded={handleEnded}
        />
      </div>
    </div>
  );
}
