import { useState, useEffect } from "react";
import { Play, PauseCircle } from "lucide-react";
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
        <PauseCircle className="h-4 w-4 text-white" />
      ) : (
        <Play className="h-4 w-4 text-blue-600" />
      )}
    </button>
  );
}
