"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Languages } from "lucide-react";

import { BrowserSTTService } from "@/lib/services/stt/stt-service";
import { VoiceRecorder } from "@/components/voice/VoiceRecorder";
import { MessageBubble } from "@/components/custom/MessageBubble";
import { useSearchParams } from "next/navigation";
import TranslationPanel from "./TranslationPanel";

interface Message {
  role: "user" | "model";
  parts: string[];
  audioUrl?: string;
}

interface Translation {
  languageFrom: string;
  languageTo: string;
  text: string;
  translation: string;
  audioIdFrom: string;
  audioIdTo: string;
}

// Initialize sttService only in browser environment (client side)
const sttService =
  typeof window !== "undefined" ? new BrowserSTTService() : null;

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [translations, setTranslations] = useState<Translation[]>([]);

  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "medical";
  console.log(" type is from client ", type);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onresult = (event: any) => {
          const text = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result: any) => result.transcript)
            .join(" ");
          setTranscript(text);
        };
      }
    }
  }, []);

  const handleVoiceMessage = async (text: string, audioUrl: string) => {
    if (!text.trim()) return;
    setIsLoading(true);

    const updatedMessages = [
      ...messages,
      { role: "user" as const, parts: [text], audioUrl },
    ];
    setMessages(updatedMessages);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: updatedMessages.map(({ parts, role }) => ({ parts, role })),
          promptType: type,
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("Error:", data.error);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          parts: [data.message],
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
      setTranscript("");
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);

    const updatedMessages = [
      ...messages,
      { role: "user" as const, parts: [inputText] },
    ];
    setMessages(updatedMessages);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputText,
          history: updatedMessages,
          promptType: type,
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("Error:", data.error);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          parts: [data.message],
        },
      ]);
      setInputText("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTranslation = (text: string, translation: string) => {
    setTranslations((prev) => {
      const exists = prev.some((t) => t.text === text);
      if (exists) {
        return prev;
      }

      const newTranslation: Translation = {
        languageFrom: "English",
        languageTo: "Arabic",
        text,
        translation,
        audioIdFrom: `english_${Date.now()}`,
        audioIdTo: `arabic_${Date.now()}`,
      };

      return [newTranslation, ...prev];
    });

    setIsSidebarOpen(true);
  };

  return (
    <div className="flex h-screen max-h-screen w-full bg-white relative overflow-hidden">
      <div className={`flex-1 flex flex-col min-w-0 h-full`}>
        <div className="h-16 px-4 border-b border-gray-200 bg-white flex items-center justify-between sticky top-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center text-white text-sm font-medium">
                MA
              </div>
              <div>
                <h1 className="text-base font-medium text-gray-800 flex items-center gap-2">
                  Maxwell Anderson
                  <span className="px-1.5 py-0.5 bg-teal-50 text-teal-600 rounded-full text-xs font-medium">
                    Medical
                  </span>
                </h1>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative text-gray-600"
            title="Toggle Translation"
          >
            <Languages className="h-5 w-5" />
          </button>
        </div>

        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 py-6 space-y-6 customScrollbar"
        >
          {messages.map((msg, index) => (
            <MessageBubble
              key={index}
              message={msg}
              translationContext={
                msg.role === "model" ? { addTranslation } : undefined
              }
            />
          ))}
        </div>

        {isRecording && transcript && (
          <div className="px-6 py-3 bg-gradient-to-r from-teal-50 to-blue-50 border-t border-teal-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <p className="text-sm text-teal-700">You: {transcript}</p>
            </div>
          </div>
        )}

        <div className="relative p-4 lg:p-6 border-t border-gray-200 bg-white">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Type a message..."
            disabled={isLoading || isRecording}
            className="w-full p-3 lg:p-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all disabled:opacity-60"
          />

          <div className="absolute right-6 lg:right-8 bottom-6 lg:bottom-8">
            {!inputText && sttService && (
              <VoiceRecorder
                onTranscript={setTranscript}
                onRecordingComplete={(blob, finalTranscript) => {
                  const audioUrl = URL.createObjectURL(blob);
                  if (finalTranscript.trim()) {
                    handleVoiceMessage(finalTranscript, audioUrl);
                  }
                }}
                sttService={sttService}
                isRecording={isRecording}
                onStartRecording={() => {
                  setIsRecording(true);
                  setTranscript("");
                }}
                onStopRecording={() => {
                  setIsRecording(false);
                }}
              />
            )}
            {inputText && (
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="p-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                <Send className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <TranslationPanel
        toggle={isSidebarOpen}
        updateToggle={setIsSidebarOpen}
        translations={translations}
      />

      <style jsx global>{`
        .customScrollbar {
          scrollbar-width: thin;
          scrollbar-color: #888 #f1f1f1;
        }
        .customScrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .customScrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .customScrollbar::-webkit-scrollbar-thumb {
          background-color: #888;
          border-radius: 3px;
        }
        .customScrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #555;
        }

        /* Prevent text selection while dragging */
        .user-select-none {
          user-select: none;
        }

        /* Prevent body scroll when sidebar is open on mobile */
        @media (max-width: 1024px) {
          body.sidebar-open {
            overflow: hidden;
          }
        }
      `}</style>
    </div>
  );
}
