"use client";
import { Bot, User, Languages } from "lucide-react";
import { RecordedAudioPlayer } from "./RecordedAudioPlayer";
import { AudioPlayer } from "../audio/AudioPlayer";
import { BrowserTTSService } from "@/lib/services/tts/tts-service";
import { formatAIResponse } from "@/lib/services/formater/formatAIResponse";
import { useState } from "react";
import { useUserPreferences } from "@/store/userPreferences";

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
  const { nativeLanguage } = useUserPreferences();

  // Initialize TTS service only on client-side
  const ttsService =
    typeof window !== "undefined" ? new BrowserTTSService() : null;

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
          <User className="h-5 w-5 text-teal-600" />
        ) : (
          <Bot className="h-5 w-5 text-blue-600" />
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
                {ttsService && (
                  <AudioPlayer
                    text={message.parts[0]}
                    ttsService={ttsService}
                    autoPlay={true}
                  />
                )}
                {translationContext && nativeLanguage && (
                  <button
                    onClick={handleTranslate}
                    disabled={isTranslating}
                    className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors disabled:opacity-50"
                    title={`Translate to ${nativeLanguage.toUpperCase()}`}
                  >
                    <Languages className="h-4 w-4 text-white" />
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
