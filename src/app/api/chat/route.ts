import { CHAT_PROMPTS } from "@/config/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse, NextRequest } from "next/server";

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  throw new Error("No env key found");
}

const genAI = new GoogleGenerativeAI(apiKey);

interface ChatMessage {
  role: string;
  parts: Array<{ text: string }>;
}

export async function POST(req: NextRequest) {
  try {
    const { message, history, promptType } = await req.json();
    const effectivePromptType = promptType || "normal";

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const formattedHistory =
      history?.map((msg: ChatMessage) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.parts[0] }],
      })) || [];

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
      },
    });

    const selectedPrompt =
      CHAT_PROMPTS[effectivePromptType as keyof typeof CHAT_PROMPTS];
    const prompt = `${selectedPrompt.prompt}\n\nPatient message: ${message}`;
    const result = await chat.sendMessage(prompt);
    console.log("res is res", result);
    const response = result.response.text();

    return NextResponse.json({
      message: response,
    });
  } catch (error: unknown) {
    console.log("Error in chat", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Gemini is alive..." });
}
