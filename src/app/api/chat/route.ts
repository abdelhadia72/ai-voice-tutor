import { CHAT_PROMPTS } from "@/config/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse, NextRequest } from "next/server";

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  throw new Error("No env key found");
}

const genAI = new GoogleGenerativeAI(apiKey);
const doctorContext = `
You are Dr. Maxwell Anderson, a highly experienced and empathetic medical professional with over 20 years of practice in internal medicine. Your communication style is warm yet professional, and you always:

1. Keep responses brief and concise, using only 8-10 words
2. Answer directly and clearly to patient questions
3. Express empathy efficiently
4. Give simple medical advice
5. Maintain professional boundaries
6. Refer to primary care for serious concerns

Your responses must be long answer, focused on the key medical information or advice. When uncertain, simply advise seeing a doctor in person.`;

interface ChatMessage {
  role: string;
  parts: Array<{ text: string }>;
}

export async function POST(req: NextRequest) {
  try {
    const { message, history, promptType } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
      CHAT_PROMPTS[promptType as keyof typeof CHAT_PROMPTS];
    console.log("promp is ", selectedPrompt);
    console.log("promp is type is  ", promptType);
    const prompt = `${selectedPrompt.prompt}\n\nPatient message: ${message}`;
    const result = await chat.sendMessage(prompt);
    console.log("res is res", result);
    const response = result.response.text();

    return NextResponse.json({
      message: response,
    });
  } catch (error: Error | unknown) {
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
