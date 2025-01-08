"use client";

import { useUserPreferences } from "@/store/userPreferences";
import { Play, Pause } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const languages = {
  ar: "ARABIC",
  en: "ENGLISH",
  fr: "FRENCH",
  es: "SPANISH",
  de: "GERMAN",
};

interface Translation {
  original: string;
  translation: string;
}

interface TranslationPanelProps {
  translations: Translation[];
  toggle?: boolean;
  updateToggle?: (value: boolean) => void;
}

interface AudioCache {
  [key: string]: string;
}

export default function TranslationPanel({ translations, toggle, updateToggle }: TranslationPanelProps) {
  const { targetLanguage, nativeLanguage } = useUserPreferences();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioCache, setAudioCache] = useState<AudioCache>({});

  const getLanguageDisplay = (code: string) => {
    return languages[code as keyof typeof languages] || code.toUpperCase();
  };

  const handlePlay = async (text: string, id: string) => {
    if (playingId === id) {
      audioRef.current?.pause();
      setPlayingId(null);
      return;
    }

    try {
      let audioUrl = audioCache[id];

      if (!audioUrl) {
        const response = await fetch("/api/openai-tts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            voice: "alloy", // You can customize this based on language
          }),
        });

        const data = await response.json();
        if (data.audioUrl) {
          audioUrl = data.audioUrl;
          setAudioCache(prev => ({ ...prev, [id]: audioUrl }));
        }
      }

      if (audioUrl) {
        if (!audioRef.current) {
          audioRef.current = new Audio(audioUrl);
          audioRef.current.onended = () => setPlayingId(null);
        } else {
          audioRef.current.src = audioUrl;
        }
        
        audioRef.current.play();
        setPlayingId(id);
      }
    } catch (error) {
      console.error("Failed to play audio:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className={`fixed lg:relative right-0 top-0 h-full bg-white border-l border-gray-200 flex flex-col w-[320px] transition-transform duration-300 ease-in-out z-40 ${
      toggle ? "translate-x-0" : "translate-x-full lg:translate-x-0"
    }`}>
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center justify-between">
          <span>Translation</span>
          <span className="text-sm font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
            {getLanguageDisplay(targetLanguage || 'en')} → {getLanguageDisplay(nativeLanguage || 'ar')}
          </span>
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {translations.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Original Text */}
            <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <p className="text-xs font-medium text-gray-500 uppercase">
                    {getLanguageDisplay(targetLanguage || 'en')}
                  </p>
                </div>
                <button
                  onClick={() => handlePlay(item.original, `orig-${index}`)}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                >
                  {playingId === `orig-${index}` ? (
                    <Pause className="h-4 w-4 text-blue-500" />
                  ) : (
                    <Play className="h-4 w-4 text-blue-500" />
                  )}
                </button>
              </div>
              <p className="font-medium text-gray-800 text-sm">{item.original}</p>
            </div>

            {/* Translation */}
            <div className="p-3 bg-gradient-to-r from-teal-50 to-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  <p className="text-xs font-medium text-gray-500 uppercase">
                    {getLanguageDisplay(nativeLanguage || 'ar')}
                  </p>
                </div>
                <button
                  onClick={() => handlePlay(item.translation, `trans-${index}`)}
                  className="p-1.5 hover:bg-teal-100 rounded-full transition-colors"
                >
                  {playingId === `trans-${index}` ? (
                    <Pause className="h-4 w-4 text-teal-500" />
                  ) : (
                    <Play className="h-4 w-4 text-teal-500" />
                  )}
                </button>
              </div>
              <p className="font-medium text-gray-800 text-sm" dir={nativeLanguage === 'ar' ? 'rtl' : 'ltr'}>
                {item.translation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
