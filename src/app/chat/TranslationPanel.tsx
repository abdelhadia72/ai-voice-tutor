"use client";
import React, { useState } from "react";
import { Play, Pause, X } from "lucide-react";

interface Translation {
  languageFrom: string;
  languageTo: string;
  text: string;
  translation: string;
  audioIdFrom: string;
  audioIdTo: string;
}

const TranslationCard = ({
  languageFrom,
  languageTo,
  text,
  translation,
  audioIdFrom,
  audioIdTo,
  isPlaying,
  handlePlayAudio,
}: {
  languageFrom: string;
  languageTo: string;
  text: string;
  translation: string;
  audioIdFrom: string;
  audioIdTo: string;
  isPlaying: string | null;
  handlePlayAudio: (audioId: string) => void;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-3 lg:p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
        <div className="flex items-center justify-between mb-2 lg:mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {languageFrom}
            </p>
          </div>
          <button
            onClick={() => handlePlayAudio(audioIdFrom)}
            className="p-1.5 lg:p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            {isPlaying === audioIdFrom ? (
              <Pause className="h-4 w-4 text-blue-500" />
            ) : (
              <Play className="h-4 w-4 text-blue-500" />
            )}
          </button>
        </div>
        <p className="font-medium text-gray-800 text-sm lg:text-base">{text}</p>
      </div>

      <div className="p-3 lg:p-4 bg-gradient-to-r from-teal-50 to-white">
        <div className="flex items-center justify-between mb-2 lg:mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {languageTo}
            </p>
          </div>
          {languageTo === "Arabic" && (
            <button
              onClick={() => handlePlayAudio(audioIdTo)}
              className="p-1.5 lg:p-2 hover:bg-teal-100 rounded-full transition-colors"
            >
              {isPlaying === audioIdTo ? (
                <Pause className="h-4 w-4 text-teal-500" />
              ) : (
                <Play className="h-4 w-4 text-teal-500" />
              )}
            </button>
          )}
        </div>
        <p
          className="font-medium text-gray-800 text-sm lg:text-base"
          dir={languageTo === "Arabic" ? "rtl" : "ltr"}
        >
          {translation}
        </p>
      </div>
    </div>
  );
};

const TranslationPanel = ({
  toggle,
  updateToggle,
  translations = [],
}: {
  toggle: boolean;
  updateToggle: (value: boolean) => void;
  translations?: Translation[];
}) => {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const handlePlayAudio = (audioId: string) => {
    setIsPlaying(isPlaying === audioId ? null : audioId);
  };

  return (
    <div
      className={`fixed lg:relative right-0 top-0 h-full bg-white border-l border-gray-200 flex flex-col w-[320px] transition-transform duration-300 ease-in-out z-40 ${
        toggle ? "translate-x-0" : "translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="p-4 lg:p-6 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            Translation
          </h2>
          <div className="flex items-center gap-2">
            <span className="inline-block px-2 py-1 bg-teal-50 text-teal-600 rounded-full text-xs font-medium">
              EN → AR
            </span>
            <button
              onClick={() => updateToggle(false)}
              className="lg:hidden p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 lg:p-6 space-y-3 overflow-y-auto customScrollbar">
        {translations.map((translation) => (
          <TranslationCard
            key={translation.audioIdFrom}
            languageFrom={translation.languageFrom}
            languageTo={translation.languageTo}
            text={translation.text}
            translation={translation.translation}
            audioIdFrom={translation.audioIdFrom}
            audioIdTo={translation.audioIdTo}
            isPlaying={isPlaying}
            handlePlayAudio={handlePlayAudio}
          />
        ))}
      </div>
    </div>
  );
};

export default TranslationPanel;
