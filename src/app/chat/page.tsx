"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Mic, Play, Pause, Languages, X } from "lucide-react";

import { BrowserSTTService } from "@/lib/services/stt/stt-service";
import { VoiceRecorder } from "@/components/voice/VoiceRecorder";
import { MessageBubble } from "@/components/custom/MessageBubble";
import { useSearchParams } from "next/navigation";

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
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
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

  const handlePlayAudio = (language: string) => {
    setIsPlaying(isPlaying === language ? null : language);
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
            <MessageBubble key={index} message={msg} />
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

      <div 
        className={`fixed lg:relative right-0 top-0 h-full bg-white border-l border-gray-200 flex flex-col w-[320px] transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
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
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-4 lg:p-6 space-y-3 overflow-y-auto customScrollbar">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-3 lg:p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
              <div className="flex items-center justify-between mb-2 lg:mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">English</p>
                </div>
                <button 
                  onClick={() => handlePlayAudio('english1')}
                  className="p-1.5 lg:p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  {isPlaying === 'english1' ? (
                    <Pause className="h-4 w-4 text-blue-500" />
                  ) : (
                    <Play className="h-4 w-4 text-blue-500" />
                  )}
                </button>
              </div>
              <p className="font-medium text-gray-800 text-sm lg:text-base">
                How are you feeling today? Can you describe your symptoms?
              </p>
            </div>

            <div className="relative h-6 lg:h-8 bg-gradient-to-r from-gray-50 to-white flex items-center justify-center">
              <div className="absolute inset-0 flex items-center px-4">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative bg-white px-2 text-gray-400">
                <svg className="w-3 h-3 lg:w-4 lg:h-4 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
            
            <div className="p-3 lg:p-4 bg-gradient-to-r from-teal-50 to-white">
              <div className="flex items-center justify-between mb-2 lg:mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Arabic</p>
                </div>
                <button 
                  onClick={() => handlePlayAudio('arabic1')}
                  className="p-1.5 lg:p-2 hover:bg-teal-100 rounded-full transition-colors"
                >
                  {isPlaying === 'arabic1' ? (
                    <Pause className="h-4 w-4 text-teal-500" />
                  ) : (
                    <Play className="h-4 w-4 text-teal-500" />
                  )}
                </button>
              </div>
              <p className="font-medium text-gray-800 text-sm lg:text-base" dir="rtl">
                كيف تشعر اليوم؟ هل يمكنك وصف الأعراض التي تعاني منها؟
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-3 lg:p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
              <div className="flex items-center justify-between mb-2 lg:mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">English</p>
                </div>
                <button 
                  onClick={() => handlePlayAudio('english2')}
                  className="p-1.5 lg:p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  {isPlaying === 'english2' ? (
                    <Pause className="h-4 w-4 text-blue-500" />
                  ) : (
                    <Play className="h-4 w-4 text-blue-500" />
                  )}
                </button>
              </div>
              <p className="font-medium text-gray-800 text-sm lg:text-base">
                I have a headache and slight fever since yesterday evening.
              </p>
            </div>

            <div className="relative h-6 lg:h-8 bg-gradient-to-r from-gray-50 to-white flex items-center justify-center">
              <div className="absolute inset-0 flex items-center px-4">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative bg-white px-2 text-gray-400">
                <svg className="w-3 h-3 lg:w-4 lg:h-4 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
            
            <div className="p-3 lg:p-4 bg-gradient-to-r from-teal-50 to-white">
              <div className="flex items-center justify-between mb-2 lg:mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Arabic</p>
                </div>
                <button 
                  onClick={() => handlePlayAudio('arabic2')}
                  className="p-1.5 lg:p-2 hover:bg-teal-100 rounded-full transition-colors"
                >
                  {isPlaying === 'arabic2' ? (
                    <Pause className="h-4 w-4 text-teal-500" />
                  ) : (
                    <Play className="h-4 w-4 text-teal-500" />
                  )}
                </button>
              </div>
              <p className="font-medium text-gray-800 text-sm lg:text-base" dir="rtl">
                أعاني من صداع وحمى خفيفة منذ مساء أمس.
              </p>
            </div>
          </div>
        </div>
      </div>

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

