"use client";
import { RecordedAudioPlayer } from "./RecordedAudioPlayer";
import { formatAIResponse } from "@/lib/services/formater/formatAIResponse";
import { useState, useRef, useEffect, useCallback } from "react";
import { useUserPreferences } from "@/store/userPreferences";
import { Icons } from "@/lib/data/icons";

interface Message {
  role: "user" | "model";
  parts: string[];
  audioUrl?: string;
}

interface TranslationContextType {
  addTranslation: (text: string, translation: string) => void;
}

export const MessageBubble = ({
  message,
  translationContext,
}: {
  message: Message;
  translationContext?: TranslationContextType;
}) => {
  const isUser = message.role === "user";
  const [isTranslating, setIsTranslating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { nativeLanguage } = useUserPreferences();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoPlayedRef = useRef(false);

  const handleTranslate = async () => {
    if (isTranslating || !translationContext || !nativeLanguage) return;
    setIsTranslating(true);

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: message.parts[0],
          targetLanguage: nativeLanguage,
        }),
      });

      const data = await response.json();
      if (data.translation) {
        translationContext.addTranslation(data.original, data.translation);
      }
    } catch (error) {
      console.error("Translation failed:", error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handlePlayAudio = useCallback(async () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    try {
      setIsLoadingAudio(true);

      if (!audioUrl || !audioRef.current) {
        const response = await fetch("/api/openai-tts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: message.parts[0],
            voice: "alloy",
          }),
        });

        const data = await response.json();
        if (data.audioUrl) {
          setAudioUrl(data.audioUrl);
          audioRef.current = new Audio(data.audioUrl);
          audioRef.current.onended = () => {
            setIsPlaying(false);
            setIsLoadingAudio(false);
          };
        }
      }

      // Play the audio
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Failed to play audio:", error);
    } finally {
      setIsLoadingAudio(false);
    }
  }, [isPlaying, audioUrl, message.parts]);

  useEffect(() => {
    let mounted = true;

    if (!isUser && message.parts[0] && !autoPlayedRef.current && mounted) {
      autoPlayedRef.current = true;
      setTimeout(() => {
        if (mounted) {
          handlePlayAudio();
        }
      }, 100);
    }

    return () => {
      mounted = false;
    };
  }, [isUser, message.parts, handlePlayAudio]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      autoPlayedRef.current = false;
      setAudioUrl(null);
      setIsPlaying(false);
      setIsLoadingAudio(false);
    };
  }, []);

  return (
    <div
      className={`flex items-start gap-3 ${
        isUser ? "flex-row-reverse" : "flex-row"
      } animate-in fade-in slide-in-from-bottom-4`}
    >
      <div
        className={`flex-shrink-0 p-2 rounded-full ${
          isUser ? "bg-teal-100" : "bg-blue-100"
        }`}
      >
        {isUser ? (
          <Icons.user className="h-5 w-5" />
        ) : (
          <Icons.chatbot className="h-5 w-5" />
        )}
      </div>
      <div
        className={`flex-1 p-4 rounded-2xl ${
          isUser
            ? "bg-teal-200 text-stone-800 max-w-[80%] ml-auto"
            : "bg-gradient-to-br from-blue-600 to-blue-700 text-white max-w-[80%]"
        }`}
      >
        {/* Render user message with optional audio player */}
        {isUser ? (
          <div className="flex items-start justify-between gap-4">
            <div className="text-stone-700 flex-1 font-normal text-[15px] leading-relaxed tracking-wide">
              {message.parts[0]}
            </div>
            {message.audioUrl && (
              <RecordedAudioPlayer audioUrl={message.audioUrl} />
            )}
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-100">Maxwell Anderson</h3>
                <span className="text-xs font-light text-blue-200">
                  AI Assistant
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayAudio}
                  disabled={isLoadingAudio}
                  className="p-2 bg-blue-500 hover:bg-blue-500/50 rounded-full transition-colors disabled:opacity-50"
                >
                  {isLoadingAudio ? (
                    <Icons.loading className="h-5 w-5 animate-spin" />
                  ) : isPlaying ? (
                    <Icons.pause className="h-5 w-5" />
                  ) : (
                    <Icons.play className="h-5 w-5" />
                  )}
                </button>
                {translationContext && nativeLanguage && (
                  <button
                    onClick={handleTranslate}
                    disabled={isTranslating}
                    className="p-2 bg-blue-500 hover:bg-blue-500/50 rounded-full transition-colors disabled:opacity-50"
                    title={`Translate to ${nativeLanguage.toUpperCase()}`}
                  >
                    {isTranslating ? (
                      <Icons.loading className="h-5 w-5 animate-spin" />
                    ) : (
                      <Icons.languages className="h-5 w-5" />
                    )}
                  </button>
                )}
              </div>
            </div>
            <div className="prose prose-lg prose-invert font-normal text-[15px] leading-relaxed tracking-wide">
              {formatAIResponse(message.parts[0])}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
