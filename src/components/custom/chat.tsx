"use client";
import { useState } from "react";

interface Message {
  role: "user" | "model";
  parts: string[];
}

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const updatedMessages = [...messages, { role: "user", parts: [input] }];
    setMessages(updatedMessages);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: updatedMessages,
        }),
      });
      setInput("");

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
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4 max-w-[700px] mx-auto relative h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`rounded w-fit max-w-[70%] p-2 px-6 ${
              msg.role === "user"
                ? "bg-[#ededed] ml-auto text-end"
                : "bg-[#8d70ea] text-white mr-auto"
            }`}
          >
            {msg.parts[0]}
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 bg-white p-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 p-2 border rounded"
            placeholder="Type a message..."
          />
          <button
            disabled={loading}
            onClick={handleSend}
            className={`px-4 py-2 ${loading ? "bg-gray-800" : "bg-blue-500"} text-white rounded`}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
