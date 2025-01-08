"use client";
import { Icons } from "@/lib/data/icons";
import { useEffect, useRef, useState } from "react";

export const RecordedAudioPlayer = ({ audioUrl }: { audioUrl: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(audioUrl);
    audioRef.current.onended = () => setIsPlaying(false);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={togglePlay}
      className={`p-2 rounded-full transition-all transform hover:scale-105 ${
        isPlaying ? "bg-teal-500 shadow-lg" : "bg-teal-100 hover:bg-teal-200"
      }`}
    >
      {isPlaying ? (
        <Icons.pauseCircle className="h-5 w-5" />
      ) : (
        <Icons.play className="h-5 w-5" />
      )}
    </button>
  );
};
