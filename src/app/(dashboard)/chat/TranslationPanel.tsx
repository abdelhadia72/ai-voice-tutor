"use client";

import { useUserPreferences } from "@/store/userPreferences";
import { Icons } from "@/lib/data/icons";
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

export default function TranslationPanel({
  translations,
  toggle,
}: TranslationPanelProps) {
  const { targetLanguage, nativeLanguage } = useUserPreferences();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
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
      setLoadingId(id);
      let audioUrl = audioCache[id];

      if (!audioUrl) {
        const response = await fetch("/api/openai-tts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            voice: "alloy",
          }),
        });

        const data = await response.json();
        if (data.audioUrl) {
          audioUrl = data.audioUrl;
          setAudioCache((prev) => ({ ...prev, [id]: audioUrl }));
        }
      }

      if (audioUrl) {
        if (!audioRef.current) {
          audioRef.current = new Audio(audioUrl);
          audioRef.current.onended = () => setPlayingId(null);
        } else {
          audioRef.current.src = audioUrl;
        }

        await audioRef.current.play();
        setPlayingId(id);
      }
    } catch (error) {
      console.error("Failed to play audio:", error);
    } finally {
      setLoadingId(null);
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
    <div
      className={`fixed lg:relative right-0 top-0 h-full bg-white border-l border-gray-200 flex flex-col w-[320px] lg:w-[450px] transition-transform duration-300 ease-in-out z-[9999] ${
        toggle ? "translate-x-0" : "translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center justify-between">
          <span>Translation</span>
          <span className="text-sm font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
            {getLanguageDisplay(targetLanguage || "en")} →{" "}
            {getLanguageDisplay(nativeLanguage || "ar")}
          </span>
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {translations.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* original text */}
            <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <p className="text-xs font-medium text-gray-500 uppercase">
                    {getLanguageDisplay(targetLanguage || "en")}
                  </p>
                </div>
                <button
                  onClick={() => handlePlay(item.original, `orig-${index}`)}
                  disabled={loadingId === `orig-${index}`}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                >
                  {loadingId === `orig-${index}` ? (
                    <Icons.loading className="h-5 w-5 animate-spin" />
                  ) : playingId === `orig-${index}` ? (
                    <Icons.pause className="h-5 w-5" />
                  ) : (
                    <Icons.play className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="font-medium text-gray-800 text-sm">
                {item.original}
              </p>
            </div>

            {/* translation */}
            <div className="p-3 bg-gradient-to-r from-teal-50 to-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  <p className="text-xs font-medium text-gray-500 uppercase">
                    {getLanguageDisplay(nativeLanguage || "ar")}
                  </p>
                </div>
                <button
                  onClick={() => handlePlay(item.translation, `trans-${index}`)}
                  disabled={loadingId === `trans-${index}`}
                  className="p-1.5 hover:bg-teal-100 rounded-full transition-colors disabled:opacity-50"
                >
                  {loadingId === `trans-${index}` ? (
                    <Icons.loading className="h-5 w-5 animate-spin" />
                  ) : playingId === `trans-${index}` ? (
                    <Icons.pause className="h-5 w-5" />
                  ) : (
                    <Icons.play className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p
                className="font-medium text-gray-800 text-sm"
                dir={nativeLanguage === "ar" ? "rtl" : "ltr"}
              >
                {item.translation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
