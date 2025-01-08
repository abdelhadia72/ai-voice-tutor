import { useState, useEffect } from "react";
import { Icons } from "@/lib/data/icons";
import { TTSService } from "@/lib/services/tts/tts-service";

interface AudioPlayerProps {
  text: string;
  ttsService: TTSService;
  autoPlay?: boolean;
  className?: string;
}

export function AudioPlayer({
  text,
  ttsService,
  autoPlay = false,
  className = "",
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (autoPlay) {
      handlePlay();
    }

    return () => {
      ttsService.stop();
    };
  }, [text, autoPlay]);

  const handlePlay = async () => {
    if (isPlaying) {
      ttsService.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      await ttsService.speak(text);
      setIsPlaying(false);
    }
  };

  return (
    <button
      onClick={handlePlay}
      className={`p-2 rounded-full transition-colors ${
        isPlaying ? "bg-blue-500" : "bg-blue-100"
      } ${className}`}>
      {isPlaying ? (
        <Icons.pauseCircle className="h-5 w-5" />
      ) : (
        <Icons.play className="h-5 w-5" />
      )}
    </button>
  );
}
