"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

import { BrowserSTTService } from "@/lib/services/stt/stt-service";
import { VoiceRecorder } from "@/components/voice/VoiceRecorder";
import { MessageBubble } from "./MessageBubble";

interface Message {
  role: "user" | "model";
  parts: string[];
  audioUrl?: string;
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
  const recognitionRef = useRef<any>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || (window as any).webkitSpeechRecognition;
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

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-4xl mx-auto bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <h1 className="text-xl font-medium text-gray-800 tracking-wide">
            Chat with Maxwell Anderson
          </h1>
          <p className="text-sm text-gray-500 font-normal">
            Your AI Medical Assistant
          </p>
        </div>

        {/* Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 py-6 space-y-6 customScrollbar"
        >
          {messages.map((msg, index) => (
            <MessageBubble key={index} message={msg} />
          ))}
        </div>

        {/* Transcription Bar */}
        {isRecording && transcript && (
          <div className="px-6 py-3 bg-gradient-to-r from-teal-50 to-blue-50 border-t border-teal-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <p className="text-sm text-teal-700">You: {transcript}</p>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="relative p-6 border-t border-gray-200 bg-white">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Type a message..."
            disabled={isLoading || isRecording}
            className="w-full p-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all disabled:opacity-60"
          />

          <div className="absolute right-8 bottom-8">
            {!inputText && sttService && (
              <VoiceRecorder
                onTranscript={setTranscript}
                onRecordingComplete={(blob, finalTranscript) => {
                  const audioUrl = URL.createObjectURL(blob);
                  console.log("audio url", audioUrl);
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
      {/* hide scroll bar  */}
      <style jsx global>{`
        .customScrollbar {
          scrollbar-width: none;
          scrollbar-color: #888 #f1f1f1;
        }
        .customScrollbar::-webkit-scrollbar {
          display: none;
        }
        .customScrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .customScrollbar::-webkit-scrollbar-thumb {
          background-color: #888;
          border-radius: 0px;
        }
        .customScrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #555;
        }
      `}</style>
    </div>
  );
}
