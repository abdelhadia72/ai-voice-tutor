"use client";
import { PauseCircle, Play } from "lucide-react";
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
        <PauseCircle className="h-4 w-4 text-white" />
      ) : (
        <Play className="h-4 w-4 text-teal-600" />
      )}
    </button>
  );
};
